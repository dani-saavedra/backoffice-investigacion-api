const { Schema, model } = require('mongoose')

const project = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    lider: String,
    facultad: String,
    fechaInicio: {
        type: Date,
        default: new Date()
    },
    activo: {
        type: Boolean,
        default: true
    },
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