const {model,Schema} = required("mongoose");

const equipo = new Schema({
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
    codigo_c:{
        type: String,
        required:true
    },
    codigo_t:{
        type: String,
        requiered: true
    }

});

const cliente = new Schema({
    nombre:{
        type:String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    cedula_rif:{
        type: String,
        required: true,
        index: true
    },
    numero1:{
        type: String,
        required: true       
    },
    numero2:{
        type: String,
        required: true
    }

});

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
        index: true
    },
    numero:{
        type: String,
        required: true       
    }
})

equipo.index({serial: 1});
cliente.index({cedula_rif: 1}, {unique: true});
tecnico.index({cedula: 1}, {unique: true});

module.exports = model("servicios", (equipo,cliente,tecnico));