const express = require('express'); //Sintaxis de importacion en node
require('dotenv').config();
const {dbConection} = require('./config/database');
const cors = require('cors');

//Crear el servidor express
const app = express();

//Configurar cors
app.use(cors());

//Estableciendo conexion a la base de datos
dbConection();
//console.log(process.env);
//Rutas de la API proyectos
app.get('/', (req, res)=>{
    res.json({
        ok: true,
        msg: 'Bienvenidos a node JS'
    });
});


//Código para arrancar el servidor
app.listen(process.env.PORT, ()=>{
    console.log('Servidor desplegado en el puerto '+process.env.PORT);
})