const {Schema, model} = require('mongoose');
const ResvueloSchema = Schema({
    nombre:{
        type: String,
        required: true,
    },
    dni:{
        type: Number,
        required: true,
        ref: 'Usuario',
    },
    fechaReserva:{
        type: Date,
        required: true,   
    },
    precio:{
        type: Number,
        required: true
    },  
    vuelo:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Vuelo'
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    }
}, {collection: 'Reservacion Vuelo'});

module.exports = model ('Resvuelo', ResvueloSchema);

