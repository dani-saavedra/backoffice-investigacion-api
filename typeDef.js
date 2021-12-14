const { gql } = require('apollo-server-express')

//Nodemon
const typeDefs = gql`
    scalar Date

    type Usuario{
        nombre: String
        identificacion: Int
        estado: String
        email: String
        perfil: String
    }
    type Proyecto{
        identificador: String
        objetivosGenerales: String
        presupuesto: Int
        fechaTerminacion: Date
        lider: String
        nombre:String
        _id:ID
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
        objetivosGenerales: String
        presupuesto: Int
        fechaTerminacion: Date
        lider: String
        nombre:String
    }
    type Auth{
        jwt: String
        status: Int
    }
    type Mutation{
        createUser(user:UserInput):String
        createProject(project:ProjectInput):String
        activeUser(identificacion:Int):String
        deleteUser(ident:Int):String
        deleteProject(nombreProyecto:String):String
        insertUserToProject(identificacion:Int,nombreProyecto:String):String
        autenticar(usuario:String, clave:String):Auth
    }
`
module.exports = typeDefs