const { Schema, model } = require('mongoose')


const project = new Schema({
    identificador: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    objetivosGenerales: String,
    objetivosEspecificos: [String],
    presupuesto: Number,
    fecha_inicio: {
        type: Date,
        default: new Date()
    },
    fecha_terminacion: Date,
    estado: {
        type: String,
        default: "inactivo"
    },
    fase: String,
    lider: String,
    integrantes: [{
        type: Schema.Types.ObjectId,
        ref: "usuarios"
    }]
},
    {
        timestamps: true
    }
)
module.exports = model('proyectos', project)