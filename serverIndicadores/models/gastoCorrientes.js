const mongoose = require('mongoose');

const GastoCorrientesSchema = mongoose.Schema({

    organismos: String,
    extension: String,
    departamento: String,
    partida: String,
    campos: Array,
    resultado: Array,
    correlativo: String,
    eod: String,
    codigoEstructuraPresupuestaria: String,
    codigoItem: String,
    
   
   

})

module.exports = mongoose.model('GastoCorrientes',GastoCorrientesSchema);