/*/*
    Path: /api/usuarios
*/
const { Router } = require('express');
const { check } =  require('express-validator');
const { getResvuelo, crearResvuelo, actualizarResvuelo, eliminarResvuelo } = require('../controllers/resvuelo.controllers');

const router = Router();

router.get('/',  getResvuelo);
router.post('/',
    [
        check('usuario', 'El id de usuario es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('fechaReserva','La fecha de reserva es obligatoria').not().isEmpty(),
        check('precio','El precio obligatorio').not().isEmpty(),
        check('vuelo','El id del vuelo es obligatorio').isMongoId(),
        check('dni','El DNI obligatorio').not().isEmpty(),
    ] ,
    crearResvuelo);
router.put('/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('dni','El DNI es obligatorio').not().isEmpty(),
        check('fechaReserva','La fecha de reservación es obligatoria').not().isEmpty(),
        check('vuelo','El id del vuelo es obligatorio').isMongoId(),
    ] ,
    actualizarResvuelo);

router.delete('/:id', eliminarResvuelo);

module.exports = router; 