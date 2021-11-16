const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Usuario{
        nombre: String
        identificacion: Int
        estado: String
        email: String
        perfil: String
    }
    type Proyecto{
        lider: String
        facultad: String
    }
    type Query{
        usuarios: [Usuario]
        usuario(identificacion: Int): Usuario
        proyectos:[Proyecto]
    }
`
module.exports = typeDefs