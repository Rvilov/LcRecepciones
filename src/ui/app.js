// elementos de registrar cliente 
const formC = document.querySelector("#registroCliente");
const nombreC = document.querySelector("#nombre");
const apellidoC = document.querySelector("#apellido");
const cedulaRifC = document.querySelector("#cedula_rif");
const numero_1 = document.querySelector("#numero1");
const numero_2 = document.querySelector("#numero2");


const {ipcRenderer, ipcMain} = require("electron");


let clientes = [];


formC.addEventListener("submit", e =>{
    e.preventDefault();

    const cliente = {
        cedula_rif: cedulaRifC.value,
        nombre: nombreC.value,
        apellido: apellidoC.value,
        numero1: numero_1.value,
        numero2: numero_2.value
    }
    ipcRenderer.send("nuevo-cliente",cliente);
    formC.reset();

});

ipcRenderer.on("nuevo-cliente-registrado", (e,args)=>{
    const nuevoCliente = JSON.parse(args);
    clientes.push(nuevoCliente);
    alert("Cliente Registrado");
})


