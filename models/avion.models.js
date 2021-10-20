const {Schema, model} = require('mongoose');

const AvionSchema = Schema({
    nombre:{
        type: String,
        required: true,
    },
    modelo:{
        type: String,
        required: true,
    },
    capacidad:{
        type: Number,
        required: true,
    },
    peso:{
        type: Number,
        required: true,   
    },
    
}, {collection: 'Avion'});

AvionSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})
module.exports = model ('Avion', AvionSchema);

