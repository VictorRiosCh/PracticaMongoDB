/*/*
    Path: /api/usuarios
*/

const { Router } = require('express');
const { check } =  require('express-validator');
const { getHotel, crearHotel, actualizarHotel, eliminarHotel } = require('../controllers/hotel.controllers');

const router = Router();

router.get('/',  getHotel);
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('direccion','La direccion es obligatoria').not().isEmpty(),
        check('precio','El precio del hotel es obligatorio').not().isEmpty(),
        check('ruc','El Ruc obligatorio').not().isEmpty(),
        
    ] ,
    crearHotel);
router.put('/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('direccion','La direccion es obligatoria').not().isEmpty(),
        check('precio','El precio del hotel es obligatorio').not().isEmpty(),
        check('ruc','El Ruc obligatorio').not().isEmpty(),
    ] ,
    actualizarHotel);
router.delete('/:id', eliminarHotel);

module.exports = router; 