
const buscarUsuarioPorIdentificacion = (identi) => listUsuarios.find(user => user.identificacion === identi)

module.exports = {
    buscarUsuarioPorIdentificacion
}