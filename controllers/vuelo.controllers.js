const { response } = require('express');
const Vuelo = require('../models/vuelo.models');

const getVuelo = async (req, res)=>{
    const vuelo = await Vuelo.find().populate('avion', 'horaSalida horaLlegada diaSalida diaLlegada');

    res.json({
        ok: true,
        vuelo  
    });
}

const crearVuelo = async(req, res=response)=>{
    const uid = req.uid;
    const vuelo = new Vuelo({ 
        avion: uid,
        ...req.body 
    });

    try {
        
        const vueloDB = await vuelo.save();
        
        res.json({
            ok: true,
            vuelo: vueloDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al guardar vuelo, consulte con el administrador'
        })
    }
} 

const actualizarVuelo = async(req, res=response)=>{
    const id  = req.params.id;
    const uid = req.uid;
    try {
        const vuelo = await Vuelo.findById(id);
        if ( !vuelo ) {
            return res.status(404).json({
                ok: true,
                msg: 'Vuelo no encontrada por id',
            });
        }
        const cambiosVuelo = {
            ...req.body,
            vuelo: uid
        }

        const actualizacionVuelo = await Vuelo.findByIdAndUpdate( id, cambiosVuelo, { new: true } );
        res.json({
            ok: true,
            vuelo: actualizacionVuelo,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el vuelo, consulte con el administrador'
        })
    }
}
const eliminarVuelo = async(req, res=response)=>{
    const uid = req.params.id;
    try {
        const vueloBD = await Vuelo.findById(uid);
        if (!vueloBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un vuelo con ese id'
            });
        }
        await Vuelo.findByIdAndDelete(uid);
        res.json({
            ok:true,
            msg: 'Vuelo eliminado de la BD'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'No es posible eliminar vuelo'
        });
    }
}
module.exports={
    getVuelo,
    crearVuelo,
    actualizarVuelo,
    eliminarVuelo,
}