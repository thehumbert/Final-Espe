var express = require('express');
const gastoInversions = require('../models/gastoInversions');



// POST CREAR CLIENTE 
const creaGastoInversion = (req, res) => {
    // Crear un cliente
    const gastoInversion = new gastoInversions(req.body);

    // GUARDAR UNA OPCION EN MongoDB
    gastoInversion.save()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
};


// todos las opciones
const getGastoInversion = (req, res) => {
    gastoInversions.find({}).populate('usuario img')
        .then(gastoInversion => {
            res.json(gastoInversion);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};



// todos las opciones
const getGastoInversionId = (req, res) => {
    gastoInversions.find({usuario:req.query.usuario_id})

    .populate('usuario ')
        .then(gastoInversion => {
            res.json(gastoInversion);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};


//ENCUENTRE UNA OPCIÓN
const getIdGastoInversion=  (req, res) => {
    GastoInversions.findById(req.params._id)
        .then(gastoInversion => {
            if (!gastoInversion) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(gastoInversion);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            return res.status(500).json({
                msg: "Error retrieving Opciones with id " + req.params._id
            });
        });
};

// ACTUALIZAR OPCIÓN
const actualizarGastoInversion =  (req, res) => {
    //Encuentra un cliente y actualízalo
    GastoInversions.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(gastoInversion => {
            if (!gastoInversion) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(gastoInversion);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            return res.status(500).json({
                msg: "Error updating opciones with id " + req.params._id
            });
        });
};






//ELIMINAR OPCION
const eliminarGastoInversion = (req, res) => {
    GastoInversions.findByIdAndDelete(req.params._id)
        .then(gastoInversion => {
            if (!gastoInversion) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json({ msg: "Opciones deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            return res.status(500).json({
                msg: "Could not delete opciones with id " + req.params._id
            });
        });
};


module.exports = {

    creaGastoInversion,
    getGastoInversion,
    getGastoInversionId,
    getIdGastoInversion,
    actualizarGastoInversion,
    eliminarGastoInversion

}