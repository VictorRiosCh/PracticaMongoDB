const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.models')
const{ generarJWT} = require('../helpers/jwt');
const login = async(req, res= response)=>{
    const{email, password} = req.body;
    try {
        //Verificar al usuario por su email
        const usuarioBD = await Usuario.findOne({email});
        if (!usuarioBD) {
            return res.status(404).json({
                ok:false,
                msg: 'Email no encontrado'
                //Considerar la utilizacion de este mensaje
            });
        }
        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioBD.password);
        if (!validPassword) {
            res.status(400).json({
                ok:false,
                msg: 'Contraseña no válida'
            });
        }
        //Generar el token - JWT
        const token = await generarJWT(usuarioBD.id);
    
        res.json({
            ok:true,
            token
        })
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
}
module.exports={login}