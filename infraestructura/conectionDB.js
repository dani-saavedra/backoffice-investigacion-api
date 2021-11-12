const mongoose = require('mongoose')

const urlDB ='mongodb+srv://daniel:udea28@cluster0.hcpun.mongodb.net/proyectosInvestigacion?retryWrites=true&w=majority'
mongoose.connect(urlDB);
const mongoDB = mongoose.connection;
mongoDB.on('open', _ =>{
    console.log("conectado a la bd")
})