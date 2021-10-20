const {Schema, model} = require('mongoose');
const ReshotelSchema = Schema({
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
    numdias:{
        type: Number,
        required: true
    },  
    hotel:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Hotel'
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    }
}, {collection: 'ReservacionHotel'});

module.exports = model ('Reshotel', ReshotelSchema);

