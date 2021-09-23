const express = require('express'); //sintaxis de exportación node.js
require('dotenv').config();
//Importamos la BD
const {dbConection} = require('./config/database');
const cors = require('cors');

//const { request } = require('express');

//Crear el servidor express
const app = express();

//Cors en un middleware, configuramos cors
app.use(cors());

//Estableciendo conexion a la BD
dbConection();
console.log(process.env);
//Rutas de la API Proyectos
app.get('/', (req, res)=>{
    res.json({
        ok:true,
        msg: 'Bienvenidos a NodeJS'
    });
});
//Código para arrancar el servidor
app.listen(process.env.PORT, ()=>{
    console.log('Servidor desplegado en el puerto '+process.env.PORT);
})

