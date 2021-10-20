/*/*
    Path: /api/usuarios
*/
const { Router } = require('express');
const { check } =  require('express-validator');
const { getReshotel, crearReshotel, actualizarReshotel, eliminarReshotel } = require('../controllers/reshotel.controllers');

const router = Router();
router.get('/',  getReshotel);
router.post('/',
    [
        check('usuario', 'El id de usuario es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('fechaReserva','La fecha de reserva es obligatoria').not().isEmpty(),
        check('numdias','El número de días es obligatorio').not().isEmpty(),
        check('hotel','El id del hotel es obligatorio').isMongoId(),
        check('dni','El DNI obligatorio').not().isEmpty(), 
    ] ,
    crearReshotel);
router.put('/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('dni','El DNI es obligatorio').not().isEmpty(),
        check('fechaReserva','La fecha de reservación es obligatoria').not().isEmpty(),
        check('hotel','El id del hotel es obligatorio').isMongoId(),

    ] ,
    actualizarReshotel);

router.delete('/:id', eliminarReshotel);
module.exports = router; 