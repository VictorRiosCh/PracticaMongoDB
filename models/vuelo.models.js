const {Schema, model} = require('mongoose');
const VueloSchema = Schema({
    avion:{
        type: Schema.Types.ObjectId,
        ref: 'Avion',
        required: true,
    },
    horaSalida:{
        type: Number, min: 0, max: 23,
        required: true,
    },
    horaLlegada:{
        type: Number, min: 0, max: 23,
        required: true,   
    },
    diaSalida:{
        type: Date,
        required: true
    },  
    diaLlegada:{
        type: Date,
        required: true,
    },
}, {collection: 'Vuelo'});

VueloSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model ('Vuelo', VueloSchema);

