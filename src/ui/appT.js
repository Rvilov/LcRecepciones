const  formT = document.querySelector("#registrarTecnico");
const cedulaT = document.querySelector("#cedulaT");
const nombreT = document.querySelector("#nombreT");
const apellidoT = document.querySelector("#apellidoT");
const numeroT = document.querySelector("#numeroT");

const {ipcRenderer, ipcMain} = require("electron");

let tecnicos =[];
formT.addEventListener("submit", e =>{
    e.preventDefault();

    const tecnico = {
        cedula: cedulaT.value,
        nombre: nombreT.value,
        apellido: apellidoT.value,
        numero: numeroT.value,
    };

    ipcRenderer.send("nuevo-tecnico",tecnico);
    formT.reset();
});

ipcRenderer.on("nuevo-tecnico-registrado", (e,args)=>{
    const nuevoTecnico = JSON.parse(args);
    tecnicos.push(nuevoTecnico);
    alert("Tecnico Registrado");
})