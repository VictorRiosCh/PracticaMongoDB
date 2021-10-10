const jwt = require('jsonwebtoken');

//Funcion que genera un JWt
const generarJWT = (uid) =>{
    return new Promise((resolve, reject)=>{
        const payload ={
            uid,
        };
        //JWT_SECRET es la firma que utilizara el servidor para genera JWT
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12H'
        }, (err, token)=>{ //Callback

            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            }else{
                resolve(token);
            }

        });
    });
}

module.exports={
    generarJWT,
}