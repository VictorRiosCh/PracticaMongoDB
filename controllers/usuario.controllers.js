const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.models');

const getUsuarios = async (req, res)=>{
    const {email} = req.body;
    const usuarios = await Usuario.findOne({email}, 'nombre dni email role google');

    res.json({
        ok: true,
        usuarios  
    });
}

const crearUsuario = async(req, res=response)=>{

    //console.log(req.body);
    const {email,password,nombre, dni} = req.body;

    try {

        const existeDni = await Usuario.findOne({dni});
        if(existeDni){
            return res.status(400).json({
                ok:false,
                msg: 'El DNI ya ha sido registrado'
            });
        }

        const existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg: 'El email ya ha sido registrado'
            });
        }

        //creamos un objeto de la clase model Usuario
        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //indicamos a mongoose que registre al usuario en la bd
        await usuario.save();

        
        res.json({
            ok:true,
            usuario
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error en el servidor, revisar logs'
        });
    }  
} 

const actualizarUsuario = async(req, res=response)=>{
    const uid = req.params.id;
    try {
        const usuarioBD = await Usuario.findById(uid);
        if (!usuarioBD) {
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario con ese ID'
            });
        }
        //Codigo previo a la actualizacion
        const{password, google, email, ...campos} = req.body;
        if (usuarioBD.email!==email) {
            const existeEmail= await Usuario.findOne({email});
            if (existeEmail) {
                return res.status(400).json({
                    ok:false,
                    msg: 'Ya existe un usuario con este email'
                });
            }
        }
        campos.email = email;
        
        //actualizacion de datos
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new:true});
        res.json({
            ok:true,
            usuario: usuarioActualizado
        });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al actualizar usuario'
        });
    }
}

const eliminarUsuario = async(req, res=response)=>{
    const uid = req.params.id;
    try {
        const usuarioBD = await Usuario.findById(uid);
        if (!usuarioBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }
        await Usuario.findByIdAndDelete(uid);
        res.json({
            ok:true,
            msg: 'Usuario eliminado de la BD'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'No es posible eliminar usuario'
        });
    }
}

module.exports={
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
}