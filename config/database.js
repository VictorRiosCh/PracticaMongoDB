const mongoose = require('mongoose'); //IMPORTAMOS LA LIBRERÍA

const dbConection = async()=>{
    try {
        await mongoose.connect(process.env.DB_CNN);
        //await es para esperar la respuesta (primero asyn luego await)
        console.log('Conexion exitosa a la BD');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar a la BD');
    }
}

module.exports={
    dbConection
}