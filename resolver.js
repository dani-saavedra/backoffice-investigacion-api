const { addUserProject,
    getProject,
    proyectos,
    deleteProject,
    createProject } = require('./service/proyecto.service');
const { buscarUsuarioPorIdentificacion } = require('./service/usuario.service')
const Project = require('./model/proyectoModel')
const User = require('./model/usuarioModel')
let aes256 = require('aes256');
const { isLider } = require('./middleware/authjwt');
const jwt = require('jsonwebtoken')

//Clave publica y clave privada, criptografia asimetrica
//.pub y en el privado el .pem
const key = 'CLAVEDIFICIL';

const resolvers = {
    Query: {
        usuarios: async () => await User.find({}),
        usuario: (parent, args, context, info) => buscarUsuarioPorIdentificacion(args.identificacion),
        proyectos: async (parent, args, context, info) => proyectos(),
        getProject: async (parent, args, context, info) => getProject(args.nombre),
    },
    Mutation: {
        createUser: (parent, args, context, info) => {
            const { clave } = args.user;
            const nuevoUsuario = new User(args.user);
            const encryptedPlainText = aes256.encrypt(key, clave);
            nuevoUsuario.clave = encryptedPlainText
            return nuevoUsuario.save()
                .then(u => "usuario creado")
                .catch(err => console.log(err));
        },
        activeUser: (parent, args, context, info) => {
            if (isLider(context.rol)) {
                return User.updateOne({ identificacion: args.identificacion }, { estado: "Activo" })
                    .then(u => "Usuario activo")
                    .catch(err => "Fallo la activacion");
            }
        },
        deleteUser: (parent, args, context, info) => {
            if (isLider(context.rol)) {
                return User.deleteOne({ identificacion: args.ident })
                    .then(u => "Usuario eliminado")
                    .catch(err => "Fallo la eliminacion");
            }
        },
        deleteProject: (parent, args, context, info) => {
            if (isLider(context.rol)) {
                deleteProject(args.nombreProyecto)
            }
        },
        insertUserToProject: async (parent, args, context, info) => addUserProject(args.identificacion, args.nombreProyecto),
        createUser: (parent, args, context, info) => {
            const { clave } = args.user;
            const nuevoUsuario = new User(args.user);
            const encryptedPlainText = aes256.encrypt(key, clave);
            nuevoUsuario.clave = encryptedPlainText
            return nuevoUsuario.save()
                .then(u => "usuario creado")
                .catch(err => console.log(err));
        },
        createProject: (parent, args, context, info) => {
            if (isLider(context.rol)) {
                return createProject(args.project)
            } else {
                return "Permisos insuficientes"
            }
        },
        autenticar: async (parent, args, context, info) => {
            try {
                const usuario = await User.findOne({ email: args.usuario })
                if (!usuario) {
                    return {
                        status: 401
                    }
                }
                //AES256 es una libreria de criptografia para encriptar y desencriptar.
                const claveDesencriptada = aes256.decrypt(key, usuario.clave)
                if (args.clave != claveDesencriptada) {
                    return {
                        status: 401
                    }
                }
                const token = jwt.sign({
                    rolesito: usuario.perfil
                }, key, { expiresIn: 60 * 60 * 2 })

                return {
                    status: 200,
                    jwt: token
                }

            } catch (error) {
                console.log(error)
            }
        }
    }
}
module.exports = resolvers