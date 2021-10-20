const { response } = require('express');
const Hotel = require('../models/hotel.models');

const getHotel = async (req, res)=>{
    const {ruc} = req.body;
    const hotel = await Hotel.findOne({ruc}, 'nombre direccion fechaCreacion precio ruc');

    res.json({
        ok: true,
        hotel  
    });
}

const crearHotel = async(req, res=response)=>{

    //console.log(req.body);
    const {nombre,direccion,fechaCreacion, precio, ruc} = req.body;

    try {

        const existeRuc = await Hotel.findOne({ruc});
        if(existeRuc){
            return res.status(400).json({
                ok:false,
                msg: 'El RUC ya ha sido registrado'
            });
        }
        const hotel = new Hotel(req.body);

        await hotel.save();
        
        res.json({
            ok:true,
            hotel
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error en el servidor, revisar logs'
        });
    }  
} 

const actualizarHotel = async(req, res=response)=>{
    const uid = req.params.id;
    try {
        const hotelBD = await Hotel.findById(uid);
        if (!hotelBD) {
            return res.status(404).json({
                ok:false,
                msg: 'No existe un hotel con ese ID'
            });
        }
        //Codigo previo a la actualizacion
        const{nombre, direccion, fechaCreacion, precio, ruc, ...campos} = req.body;
        if (hotelBD.ruc!==ruc) {
            const existeRuc= await Hotel.findOne({ruc});
            if (existeRuc) {
                return res.status(400).json({
                    ok:false,
                    msg: 'Ya existe un hotel con este ruc'
                });
            }
        }
        campos.ruc = ruc;
        
        //actualizacion de datos
        const hotelActualizado = await Hotel.findByIdAndUpdate(uid, campos, {new:true});
        res.json({
            ok:true,
            hotel: hotelActualizado
        });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al actualizar hotel'
        });
    }
}

const eliminarHotel = async(req, res=response)=>{
    const uid = req.params.id;
    try {
        const hotelBD = await Hotel.findById(uid);
        if (!hotelBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hotel con ese id'
            });
        }
        await Hotel.findByIdAndDelete(uid);
        res.json({
            ok:true,
            msg: 'Hotel eliminado de la BD'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'No es posible eliminar hotel'
        });
    }
}

module.exports={
    getHotel,
    crearHotel,
    actualizarHotel,
    eliminarHotel,
}