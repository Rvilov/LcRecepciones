// elementos de registrar cliente 
const formC = document.querySelector("#registroCliente");
const nombreC = document.querySelector("#nombre");
const apellidoC = document.querySelector("#apellido");
const cedulaRifC = document.querySelector("#cedula_rif");
const numero_1 = document.querySelector("#numero1");
const numero_2 = document.querySelector("#numero2");


//elementos para registrar equipo


const formE = document.querySelector("#registroEquipo");
const tipoE = document.querySelector("#tipo");
const modeloE = document.querySelector("#modelo");
const serialE = document.querySelector("#serial");
const caracteristicasE = document.querySelector("#caracteristicas")
const fallaE = document.querySelector("#falla");
const tecnicoId = document.querySelector("#tecnico")


const {ipcRenderer, ipcMain} = require("electron");


let clientes = [];
let tecnicos =[];
let equipos = [];

function aggTecnicos(tecnicos){ // funcion de tecnico 
    tecnicoId.innerHTML = "";
    tecnicos.map(t =>{
        tecnicoId.innerHTML += `
        <option value="${t._id}">${t.nombre} ${t.apellido}</option>
        `
    });
};

formE.addEventListener("submit", e =>{ //form para el submit de clientes
    e.preventDefault();

    const equipo = {
        codigo_c: cedulaRifC.value,
        tipo: tipoE.value,
        modelo: modeloE.value,
        serial: serialE.value,
        caracteristicas: caracteristicasE.value,
        falla: fallaE.value,
        codigo_t: tecnicoId.value
    }
    ipcRenderer.send("nuevo-equipo",equipo);
    formE.reset();
    
});

formC.addEventListener("submit", e =>{ //form para el submit de clientes
    e.preventDefault();

    const cliente = {
        cedula_rif: cedulaRifC.value,
        nombre: nombreC.value,
        apellido: apellidoC.value,
        numero1: numero_1.value,
        numero2: numero_2.value
    }
    ipcRenderer.send("nuevo-cliente",cliente);
  
    
});

ipcRenderer.on("nuevo-cliente-registrado", (e,args)=>{
    const nuevoCliente = JSON.parse(args);
    clientes.push(nuevoCliente);
    alert("Cliente Registrado");

})

ipcRenderer.send("obtener-tecnicos"); // funcion de tecnico
ipcRenderer.on("enviar-tecnicos",(e,args)=>{ // funcion de tecnico
    const tecnicorecibido = JSON.parse(args);
    tecnicos = tecnicorecibido;
    aggTecnicos(tecnicos);
});

ipcRenderer.on("nuevo-equipo-registrado", (e,args)=>{
    const nuevoEquipo = JSON.parse(args);
    equipos.push(nuevoEquipo);
    alert("Equipo Registrado");

})