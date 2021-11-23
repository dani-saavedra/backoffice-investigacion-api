const Usuario = require('../model/usuarioModel')
const jwt = require('jsonwebtoken')
let aes256 = require('aes256');
const key = 'CLAVEDIFICIL';

/*
    401 -> no autorizado
    404 -> not found - Recurso que pediste no exist
    400 -> Enviaste algo que no era o bad Request
    500 -> Se exploto el servidor
    200 -> Todo bien
    */
const singIn = async (request, response) => {
    try {
        const usuario = await Usuario.findOne({ email: request.body?.email })
        if (!usuario) {
            return response.status(401).json({ response: "Verique usuario y contrasena" })
        }

        const claveDesencriptada = aes256.decrypt(key, usuario.clave)
        if (request.body?.clave != claveDesencriptada) {
            return response.status(401).json({ response: "Verique usuario y contrasena" })
        }
        const token = jwt.sign({
            role: usuario.perfil
        }, key, { expiresIn: 60 * 60 * 2 })

        response.status(200).json({ jwt: token })
    } catch (error) {
        console.log(error)
        response.status(500).json({ response: "Contacte al administrador" })
    }
}

module.exports = singIn;