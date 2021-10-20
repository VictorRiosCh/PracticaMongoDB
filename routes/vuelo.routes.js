/*/*
    Path: /api/usuarios
*/
const { Router } = require('express');
const { check } =  require('express-validator');
const { getVuelo, crearVuelo, actualizarVuelo, eliminarVuelo } = require('../controllers/vuelo.controllers');

const router = Router();

router.get('/',  getVuelo);
router.post('/',
    [
        check('horaSalida', 'La horaSalida es obligatoria').not().isEmpty(),
        check('horaLlegada','La horaLlegada es obligatoria').not().isEmpty(),
        check('fechaLlegada','La fechaLlegada es obligatoria').not().isEmpty(),
        check('fechaSalida','La fechaSalida es obligatoria').not().isEmpty(),
    ] ,
    crearVuelo);
router.put('/:id',
    [
        check('avion','El id de avion es obligatorio').not().isEmpty(),
        check('horaSalida', 'La horaSalida es obligatoria').not().isEmpty(),
        check('horaLlegada','La horaLlegada es obligatoria').not().isEmpty(),
        check('fechaLlegada','La fechaLlegada es obligatoria').not().isEmpty(),
        check('fechaSalida','La fechaSalida es obligatoria').not().isEmpty(),
    ] ,
    actualizarVuelo);

router.delete('/:id', eliminarVuelo);

module.exports = router; 