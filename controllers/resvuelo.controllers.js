const { response } = require('express');
const Resvuelo = require('../models/resvuelo.models');

const getResvuelo = async (req, res)=>{

    const resvuelo = await Resvuelo.find()
    .populate('usuario','nombre dni fechaReserva numdias')
    .populate('vuelo','nombre dni fechaReserva numdias')
    res.json({
        ok: true,
        resvuelo
    });
}

const crearResvuelo = async(req, res=response)=>{
    //console.log(req.body);
    const uid = req.uid;
    const resvuelo = new Resvuelo({
        usuario: uid,
        ...req.body
    });

    try {
        const resvueloDB = await resvuelo.save();
        res.json({
            ok: true,
            resvuelo: resvueloDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear la reservación, consulte con el administrador'
        })
    }
} 

const actualizarResvuelo = async(req, res=response)=>{
    const id  = req.params.id;
    const uid = req.uid;
    try {
        const resvuelo = await Resvuelo.findById(id);
        if ( !resvuelo ) {
            return res.status(404).json({
                ok: true,
                msg: 'Reservación de vuelo no encontrada por id',
            });
        }
        const cambiosResvuelo = {
            ...req.body,
            usuario: uid
        }

        const actualizacionResvuelo = await Resvuelo.findByIdAndUpdate( id, cambiosResvuelo, { new: true } );
        res.json({
            ok: true,
            resvuelo: actualizacionResvuelo,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar la reservacion de vuelo, consulte con el administrador'
        })
    }
}
const eliminarResvuelo = async(req, res=response)=>{
    const uid = req.params.id;
    try {
        const resvueloDB = await Resvuelo.findById(uid);
        if (!resvueloDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una reservación con ese id'
            });
        }
        await Resvuelo.findByIdAndDelete(uid);
        res.json({
            ok:true,
            msg: 'Reservacion eliminada de la BD'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'No es posible eliminar la reservación'
        });
    }
}
module.exports={
    getResvuelo,
    crearResvuelo,
    actualizarResvuelo,
    eliminarResvuelo,
}