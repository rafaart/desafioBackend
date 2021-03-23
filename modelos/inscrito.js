const mongoose = require('mongoose')

const inscritoSchema = mongoose.Schema({
    nome:{
        type: String,
        require: true
    },
    inscritoNoCanal:{
        type: String,
        require: true
    },
    
    dataDeInscricao:{
        type: Date,
        require: true,
        default: Date.now()
    }
})
module.exports = mongoose.model('inscrito', inscritoSchema)