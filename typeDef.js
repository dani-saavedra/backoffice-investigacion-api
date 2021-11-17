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
        getProject(nombre:String):Proyecto
    }
    input UserInput{
        nombre: String
        identificacion:Int
        clave: String
        perfil: String
    }
    type Mutation{
        createUser(user:UserInput):String
        activeUser(identificacion:Int):String
        deleteUser(ident:Int):String
        deleteProject(nombreProyecto:String):String
        insertUserToProject(identificacion:Int):String
    }
`
module.exports = typeDefs