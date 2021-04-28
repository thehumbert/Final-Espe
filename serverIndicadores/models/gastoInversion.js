const mongoose = require('mongoose');

const GastoInversionsSchema = mongoose.Schema({

    codigo: String,
    departamento: String,
    porcentajeCumplimiento: Number,
    categoriaEjecucion: String,
    avanceFisico: Number,
    categoriaMetas: String,
    indiceGestion: Number,
    resultado: Array 
   

})

module.exports = mongoose.model('GastoInversions',GastoInversionsSchema);