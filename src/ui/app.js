// elementos de registrar cliente 

const formC = document.querySelector("#registroCliente");
const nombreC = document.querySelector("#nombre");
const apellidoC = document.querySelector("#apellido");
const cedulaRifC = document.querySelector("#cedula_rif");
const numero_1 = document.querySelector("#numero1");
const numero_2 = document.querySelector("#numero2");
const direccionC = document.querySelector('#direccion')
const tarjetaC = document.querySelector('#tarjeta-cliente')


//elementos para registrar equipo


const formE = document.querySelector("#registroEquipo");
const tipoE = document.querySelector("#tipo");
const modeloE = document.querySelector("#modelo");
const serialE = document.querySelector("#serial");
const caracteristicasE = document.querySelector("#caracteristicas")
const fallaE = document.querySelector("#falla");
const tecnicoId = document.querySelector("#tecnico")
const clienteCedula = document.querySelector("#codigo_c")

const {ipcRenderer, ipcMain} = require("electron");



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

function aggIdEnEquipo(cliente){
    clienteCedula.value = cliente.cedula_rif
};

function mostrarCliente(cliente){

    tarjetaC.innerHTML += `
    <br>
    <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title" id="nombre">${cliente.nombre} ${cliente.apellido}</h5>
                  <h6 class="card-subtitle mb-2 text-muted" id="numero1">${cliente.numero1}</h6>
                  <h6 class="card-subtitle mb-2 text-muted" id="numero2">${cliente.numero2}</h6>
                  <p class="direccion">${cliente.direccion}</p>
                  <a href="#" class="card-link">Card link</a>
                  <a href="#" class="card-link">Another link</a>
                </div>
            </div>
    `
    // nombreC.value = cliente.nombre;
    // apellidoC.value = cliente.apellido;
    // numero_1.value = cliente.numero1;
    // numero_2.value = cliente.numero2;
    // direccionC.value = cliente.direccion;

    

}

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
        // nombre: nombreC.value,
        // apellido: apellidoC.value,
        // numero1: numero_1.value,
        // numero2: numero_2.value,
        // direccion: direccionC.value
    }

   
        // ipcRenderer.send("nuevo-cliente",cliente.cedula_rif);
   //envia la tarea al main.js
   
    ipcRenderer.send("comprueba-existencia",cliente.cedula_rif);
      
  
    
});

// ipcRenderer.on("cliente-no-encontrado",(e,args)=>{
    
// });



ipcRenderer.on("cliente-existe",(e,args)=>{
    const clienteRecibido = JSON.parse(args);
    mostrarCliente(clienteRecibido);
    aggIdEnEquipo(clienteRecibido);
})


ipcRenderer.send("obtener-tecnicos"); // envia el evento Obtener tecnicos para que el select se actuve 

ipcRenderer.on("enviar-tecnicos",(e,args)=>{ // recibe los tecnicos y los envia a la funcion aggTecnicos para agregarlos al select
    const tecnicorecibido = JSON.parse(args);
    tecnicos = tecnicorecibido;
    aggTecnicos(tecnicos);
});

ipcRenderer.on("nuevo-equipo-registrado", (e,args)=>{ //registra equipo

    const nuevoEquipo = JSON.parse(args);
    equipos.push(nuevoEquipo);
    alert("Equipo Registrado");

})

ipcRenderer.on("cliente-encontrado", (e,args)=>{
    console.log("HOLAAAA ");
});

