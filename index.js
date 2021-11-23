
require('./infraestructura/conectionDB')
const { validarToken, admin, estudiante } = require('./middleware/authjwt')

const typeDefs = require('./typeDef')
const resolvers = require('./resolver')
const authRoute = require('./routes/auth.routes')

const express = require('express')
const { ApolloServer } = require('apollo-server-express')

const iniciarServidor = async () => {
    const api = express();
    const apollo = new ApolloServer(
        {
            typeDefs,
            resolvers
        });
    await apollo.start()
    apollo.applyMiddleware({ app: api })
    /*api.use((request, response) => {
        response.send('Hola')
    })*/
    api.use(express.json())  //PARA TRABAJAR CON JSON
    api.use('/api', authRoute)
    api.get('/api/dashboard/admin', [validarToken, admin], (request, response) => {
        response.json("Soy el dashboard")
    })

    api.get('/api/dashboard/estudiante', [validarToken, estudiante], (request, response) => {
        response.json("Soy el dashboard")
    })
    api.listen('9092', () => console.log('Inicio server'))
}
iniciarServidor()