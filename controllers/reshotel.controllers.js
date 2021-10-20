const { response } = require('express');
const Reshotel = require('../models/reshotel.models');

const getReshotel = async (req, res)=>{

    const reshotel = await Reshotel.find()
    .populate('usuario','nombre dni fechaReserva numdias')
    .populate('hotel','nombre dni fechaReserva numdias')
    res.json({
        ok: true,
        reshotel
    });
}

const crearReshotel = async(req, res=response)=>{
    //console.log(req.body);
    const uid = req.uid;
    const reshotel = new Reshotel({
        usuario: uid,
        ...req.body
    });

    try {
        const reshotelDB = await reshotel.save();
        res.json({
            ok: true,
            reshotel: reshotelDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear la reservación, consulte con el administrador'
        })
    }
} 

const actualizarReshotel = async(req, res=response)=>{
    const id  = req.params.id;
    const uid = req.uid;
    try {
        const reshotel = await Reshotel.findById(id);
        if ( !reshotel ) {
            return res.status(404).json({
                ok: true,
                msg: 'Reservación de hotel no encontrada por id',
            });
        }
        const cambiosReshotel = {
            ...req.body,
            usuario: uid
        }
        const actualizacionReshotel = await Reshotel.findByIdAndUpdate( id, cambiosReshotel, { new: true } );
        res.json({
            ok: true,
            reshotel: actualizacionReshotel,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar la reservacion de hotel, consulte con el administrador'
        })
    }
}
const eliminarReshotel = async(req, res=response)=>{
    const uid = req.params.id;
    try {
        const reshotelBD = await Reshotel.findById(uid);
        if (!reshotelBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una reservación con ese id'
            });
        }
        await Reshotel.findByIdAndDelete(uid);
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
    getReshotel,
    crearReshotel,
    actualizarReshotel,
    eliminarReshotel,
}