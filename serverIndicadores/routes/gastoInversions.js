const { Router } = require('express');

const GastoInversions = require('../controllers/gastoInversion')

const router = Router();

//informe largo
router.post('/',GastoInversions.creaGastoInversion);

router.get('/',GastoInversions.getGastoInversionId);
router.get('/todos',GastoInversions.getGastoInversion );
router.get('/:_id',GastoInversions.getIdGastoInversion);
router.put('/',GastoInversions.actualizarGastoInversion);
router.delete('/:_id',GastoInversions.eliminarGastoInversion);
//archivos



module.exports = router;