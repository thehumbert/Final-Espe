const mongoose = require('mongoose');

const GastoInversionsSchema = mongoose.Schema({

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

module.exports = mongoose.model('GastoInversions',GastoInversionsSchema);