const {Schema, model} = require('mongoose');

const HotelSchema = Schema({
    nombre:{
        type: String,
        required: true,
    },
    direccion:{
        type: String,
        required: true,
    },
    fechaCreacion:{
        type: Date,
        required: true,   
    },
    precio:{
        type: Number,
        required: true
    },  
    ruc:{
        type: Number,
        required: true,
        unique: true
    },
}, {collection: 'Hotel'});

HotelSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})
module.exports = model ('Hotel', HotelSchema);

