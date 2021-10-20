const { response } = require('express');
const Avion = require('../models/avion.models');

const getAvion = async (req, res)=>{
    const {modelo} = req.body;
    const avion = await Avion.findOne({modelo}, 'nombre capacidad peso modelo');

    res.json({
        ok: true,
        avion  
    });
}

const crearAvion = async(req, res=response)=>{

    //console.log(req.body);
    const {nombre, capacidad, peso, modelo} = req.body;

    try {

        const existeModelo = await Avion.findOne({modelo});
        if(existeModelo){
            return res.status(400).json({
                ok:false,
                msg: 'El modelo de avion ya ha sido registrado'
            });
        }

        //creamos un objeto de la clase model Usuario
        const avion = new Avion(req.body);

        //indicamos a mongoose que registre al usuario en la bd
        await avion.save();

        
        res.json({
            ok:true,
            avion
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error en el servidor, revisar logs'
        });
    }  
} 

const actualizarAvion = async(req, res=response)=>{
    const id  = req.params.id;
    const uid = req.uid;
    try {
        const avion = await Avion.findById(id);
        if ( !avion ) {
            return res.status(404).json({
                ok: true,
                msg: 'Avion no encontrada por id',
            });
        }
        const cambiosAvion = {
            ...req.body,
            avion: uid
        }

        const actualizacionAvion = await Avion.findByIdAndUpdate( id, cambiosAvion, { new: true } );
        res.json({
            ok: true,
            avion: actualizacionAvion,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar los datos del avion, consulte con el administrador'
        })
    }
}

const eliminarAvion = async(req, res=response)=>{
    const uid = req.params.id;
    try {
        const avionBD = await Avion.findById(uid);
        if (!avionBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un avion con ese id'
            });
        }
        await Avion.findByIdAndDelete(uid);
        res.json({
            ok:true,
            msg: 'Avion eliminado de la BD'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'No es posible eliminar Avion'
        });
    }
}

module.exports={
    getAvion,
    crearAvion,
    actualizarAvion,
    eliminarAvion,
}