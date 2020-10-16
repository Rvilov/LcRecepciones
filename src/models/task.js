const {model,Schema, Mongoose} = require("mongoose");

const equipo = new Schema({
    codigo_c:{
        type: String,
        required:true
    },
    tipo:{
        type: String,
        required: true,
        
    },
    modelo:{
        type: String,
        required: true
    },
    serial:{
        type: String,
        required:true,
        index: true
    },
    caracteristicas:{
        type: String,
        required: true,
    },
    falla:{
        type: String,
        required:true
    },
   
    codigo_t:{
        type: String,
        required: true
    },
    fecha_registro:{
        type: Date
    }

});

const collectionEquipo = model ("collectionEquipo" , equipo);

const cliente = new Schema({
    cedula_rif:{
        type: String,
        required: true,
        index: true,
        unique: true
    },
    nombre:{
        type:String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
       numero1:{
        type: String,
        required: true       
    },
    numero2:{
        type: String,
        required: true
    },
    direccion:{
        type: String,
    }

});
const collectionCliente = model("collectionCliente", cliente)

const tecnico = new Schema({
    nombre:{
        type:String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    cedula:{
        type: String,
        required: true,
        index: true,
        unique: true
    },
    numero:{
        type: String,
        required: true       
    }
})
const collectionTecnico = model("collectionTecnico", tecnico);

equipo.index({serial: 1});
cliente.index({cedula_rif: 1, unique: true});
tecnico.index({cedula: 1, unique: true});

module.exports = {
    collectionCliente : collectionCliente,
    collectionEquipo : collectionEquipo,
    collectionTecnico: collectionTecnico
}

