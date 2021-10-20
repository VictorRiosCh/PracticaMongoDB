/*/*
    Path: /api/usuarios
*/
const { Router } = require('express');
const { check } =  require('express-validator');
const { getAvion, crearAvion, actualizarAvion, eliminarAvion } = require('../controllers/avion.controllers');
const router = Router();

router.get('/',  getAvion);
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('modelo','El modelo es obligatorio').not().isEmpty(),
        check('capacidad','La capacidad es obligatoria').not().isEmpty(),
        check('peso','El peso es obligatorio').not().isEmpty(),  
    ] ,
    crearAvion);
router.put('/:id',
    [
        check('modelo','El modelo de avion es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('modelo','El modelo es obligatorio').not().isEmpty(),
        check('capacidad','La capacidad es obligatoria').not().isEmpty(),
        check('peso','El peso es obligatorio').not().isEmpty(),
 
    ] ,
    actualizarAvion);

router.delete('/:id', eliminarAvion);


module.exports = router; 