require('./infraestructura/conectionDB')
const ProjectModel = require('./model/proyectoModel')
const express = require('express')

const api = express();

const projectAguas = new ProjectModel({
    nombre: 'Proyecto de aguas residuales',
    lider: 'Andres Delgado',
    facultad: 'Ingenieria X'
})

/*projectAguas.save((err, document) => {
    if (err) {
        console.log(err);
        return;
    }
})
*/

const consultaProyectos = async () => {
    return await ProjectModel.find({})
}



api.get('/proyectos', (request, response) => {
    consultaProyectos().then(function (resultado) {
        response.json({ projects: resultado })
    })

})

api.listen('9092')