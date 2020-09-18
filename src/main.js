const {BrowserWindow,ipcMain,Menu,app} = require("electron");
const cliente = require("./models/task.js");
const tecnico = require("./models/task.js");
const equipo = require("./models/task.js");

function createWindow(){
    const window = new BrowserWindow({
        width: 800,
        height: 700,
        webPreferences:{
            nodeIntegration: true
        }
    });

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);

    window.on('closed', ()=>{
        app.quit();
    })

    window.loadFile("src/registro_equipo.html");
}

function registrarTecnicoWindow(){
    const window = new BrowserWindow({
        width: 500,
        height: 300,
        webPreferences:{
            nodeIntegration: true
        }
    });

  

    // window.setMenu(null);

    window.loadFile("src/registro_tecnico.html");
}

ipcMain.on("nuevo-cliente", async (e,args) =>{
    const nuevoCliente = new cliente(args);
    const clienteRegistrado = await nuevoCliente.save();
    console.log(clienteRegistrado);
    e.reply("nuevo-cliente-registrado", JSON.stringify(clienteRegistrado));
});

// FUNCIONES DE REGISTRO_TECNICO

ipcMain.on("nuevo-tecnico", async (e,args)=>{
    const nuevoTecnico = new tecnico(args);
    const tecnicoRegistrado = await nuevoTecnico.save();
    console.log(tecnicoRegistrado);
    e.reply("nuevo-tecnico-registrado", JSON.stringify(tecnicoRegistrado));
})


module.exports={createWindow};

//FUNCIONES REGISTRO EQUIPO

ipcMain.on("obtener-tecnicos", async (e,args)=>{

    const tecnicos = await tecnico.find();
    e.reply("enviar-tecnicos", JSON.stringify(tecnicos));
});

ipcMain.on("nuevo-equipo" ,async (e,args)=>{
    const nuevoEquipo = new equipo(args);
    const equipoRegistrado = await nuevoEquipo.save();
    console.log(equipoRegistrado);
    e.reply("nuevo-equipo-registrado",JSON.stringify(equipoRegistrado));
});
// ----------------------------------------TEMPLATE MENU-----------------------------------

const templateMenu = [ //menu personalizado para registro_equipo.html
    {
        label: "File",
        submenu:[
                    {
                        label: "Registrar Tecnico",
                        accelerator: "Ctrl+N",
                        click(){
                        registrarTecnicoWindow();
                            }
                    },
                    {
                        label: "Exirararat",
                        accelerator: process.platform == "darwin" ? "Command+E" : "Ctrl+E",
                        click(){
                            app.quit();
                        }
                    }
                ]
    }
   

];

if(process.env.NODE_ENV !== "production"){ //hace que se muestren las devtools solo en modo desarrollo si y solo si
    templateMenu.push({
        label: "DevTools",
        submenu: [
            {
                label: "Show/Hide Dev Tools",
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role:"reload"
            }
        ]
    })
}
