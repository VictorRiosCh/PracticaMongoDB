const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next)=>{
    //Leer el token de header
    //x-token es un header personalizado donde se registrará un token válido
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok:false,
            msg: 'No hay un token en la peticion'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        req.uid=uid;

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token inválido'
        });
    }
}

module.exports={
    validarJWT
}