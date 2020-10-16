const {BrowserWindow,ipcMain,Menu,app} = require("electron");

//
const {collectionCliente} = require("./models/task.js");
const {collectionEquipo} = require("./models/task.js");
const {collectionTecnico} = require("./models/task.js");

// const cliente = require("./models/task.js");
// const tecnico = require("./models/task.js");
// const equipo = require("./models/task.js");

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
        width: 600,
        height: 400,
        webPreferences:{
            nodeIntegration: true
        }
    });
    // window.setMenu(null);

    window.loadFile("src/registro_tecnico.html");
}

function registrarClienteWindow(){
    
    const window = new BrowserWindow({
        width: 900,
        height: 500,
        webPreferences:{
            nodeIntegration: true
        }
    });
   

    window.loadFile("src/registro_cliente.html");
}

ipcMain.on("comprueba-existencia", async (e,args) =>{
    
 collectionCliente.findOne({ cedula_rif: args}, function (err, clt) {
    console.log('mostramos los valores: ' + clt);
    if(clt==null){
      console.log("no existe")
      registrarClienteWindow();
      e.reply("cliente-no-encontrado")
    }else {
     console.log('Los datos ya existen');
      e.reply("cliente-existe",JSON.stringify(clt));
    }
    });
    

});

ipcMain.on("nuevo-cliente",async(e,args)=>{
    const nuevoCliente = new collectionCliente(args);
        const clienteRegistrado = await nuevoCliente.save();
        console.log(clienteRegistrado);
        e.reply("nuevo-cliente-registrado", JSON.stringify(clienteRegistrado));
})



// FUNCIONES DE REGISTRO_TECNICO

ipcMain.on("nuevo-tecnico", async (e,args)=>{
    const nuevoTecnico = new collectionTecnico(args);
    const tecnicoRegistrado = await nuevoTecnico.save();
    console.log(tecnicoRegistrado);
    e.reply("nuevo-tecnico-registrado", JSON.stringify(tecnicoRegistrado));
})


module.exports={createWindow};

//FUNCIONES REGISTRO EQUIPO

ipcMain.on("obtener-tecnicos", async (e,args)=>{

    const tecnicos = await collectionTecnico.find();
    e.reply("enviar-tecnicos", JSON.stringify(tecnicos));
});

ipcMain.on("nuevo-equipo" ,async (e,args)=>{
    const nuevoEquipo = new collectionEquipo(args);
    const equipoRegistrado = await nuevoEquipo.save();
    console.log(equipoRegistrado);
    e.reply("nuevo-equipo-registrado",JSON.stringify(equipoRegistrado));
});

ipcMain.on("update-form-cliente", async(e,args)=>{

 })



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
