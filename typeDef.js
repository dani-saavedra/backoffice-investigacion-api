const { gql } = require('apollo-server-express')

//Nodemon
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
        nombre:String
        integrantes:[Usuario]
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
    input ProjectInput{
        nombre: String
        lider:String
        facultad: String
    }
    type Mutation{
        createUser(user:UserInput):String
        createProject(project:ProjectInput):String
        activeUser(identificacion:Int):String
        deleteUser(ident:Int):String
        deleteProject(nombreProyecto:String):String
        insertUserToProject(identificacion:Int,nombreProyecto:String):String
    }
`
module.exports = typeDefs