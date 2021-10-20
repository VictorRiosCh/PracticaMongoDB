const express = require('express'); //Sintaxis de importacion en node
require('dotenv').config();
const {dbConection} = require('./config/database');
const cors = require('cors');

//Crear el servidor express
const app = express();

//Configurar cors
app.use(cors());

//lectura y parseo del codigp
app.use(express.json());

//console.log(process.env);

app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/reshotel', require('./routes/reshotel.routes'));
app.use('/api/hotel', require('./routes/hotel.routes'));
app.use('/api/vuelo', require('./routes/vuelo.routes'));
app.use('/api/resvuelo', require('./routes/resvuelo.routes'));
app.use('/api/avion', require('./routes/avion.routes'));


//Código para arrancar el servidor
app.listen(process.env.PORT, ()=>{
    console.log('Servidor desplegado en el puerto '+process.env.PORT);
});
//Estableciendo conexion a la base de datos
dbConection(); 