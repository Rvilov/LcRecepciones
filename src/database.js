const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/luitronicdb",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

    .then(db => console.log("Conectado a la base de datos!!"))
    .catch(err => console.log(err))