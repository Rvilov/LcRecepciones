const {BrowserWindow,ipcMain} = require("electron");
const cliente = require("./models/task.js");

function createWindow(){
    const window = new BrowserWindow({
        width: 800,
        height: 700,
        webPreferences:{
            nodeIntegration: true
        }
    });

    window.loadFile("src/registro_equipo.html");
}

ipcMain.on("nuevo-cliente", async (e,args) =>{
    const nuevoCliente = new cliente(args);
    const clienteRegistrado = await nuevoCliente.save();
    console.log(clienteRegistrado);
    e.reply("nuevo-cliente-registrado", JSON.stringify(clienteRegistrado));
})
module.exports={createWindow};