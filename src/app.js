const express = require('express');
const path = require('path');
const multer = require('multer');
const request = require("request");
const hbs = require('hbs');
const port = process.env.PORT || 3000
const facturasPublicadas = require('./routes/facturaPublicada')
const proveedor = require('./routes/proveedor')
const comprador = require('./routes/comprador')
const notificacion = require('./routes/notificacion')
require('./db/mongoose')
const e2f = require('./utils/excel2factura')
const storageExcel = e2f.storageExcel;


const app = express()


app.use(express.json())
app.use(facturasPublicadas)
app.use(proveedor)
app.use(comprador)
app.use(notificacion)

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')
const partialsPath= path.join(__dirname, '../partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res)=>{
    res.render('inicio')
})

app.get('/notificacion', (req, res)=>{
    res.render('notificacion')
})

//ADMINISTRADOR
app.get('/administrador/inicio', (req, res)=>{
    res.render('administrador/inicio')
})
app.get('/administrador/clientes', (req, res)=>{
    res.render('administrador/clientes')
})

//PROVEEDOR
app.get('/proveedor/inicio', (req, res)=>{
    res.render('proveedor/inicio')
})
app.get('/proveedor/consultar-facturas', (req, res)=>{
    res.render('proveedor/consultar-facturas')
})
app.get('/proveedor/descontar-facturas', (req, res)=>{
    res.render('proveedor/descontar-facturas')
})
app.get('/proveedor/detalles-consulta', (req, res)=>{
    res.render('proveedor/detalles-consulta')
})
app.get('/proveedor/notificaciones', (req, res)=>{
    res.render('proveedor/notificaciones')
})

//COMPRADOR
app.get('/comprador/inicio', (req, res)=>{
    res.render('comprador/inicio')
})
app.get('/comprador/registro-facturas', (req, res)=>{
    res.render('comprador/registro-facturas')
})
// REGISTRO MASIVO EXCEL
var upload = multer({ storage: storageExcel});
app.post('/comprador/registro-facturas/excel', upload.single('upload'), (req, res, next)=>{
    console.log(req.file.originalname)
    let archivo = e2f.converted();
    //console.log(archivo[0]);

    for(var i in archivo){
        var options = { method: 'POST',
        //url: 'http://localhost:3000/facturas',
        url: 'https://fx-product.herokuapp.com/facturas', //IMPORTANTE!!! CAMBIAR A LOCALHOST
        headers: 
         { 'cache-control': 'no-cache',
           Connection: 'keep-alive',
           'accept-encoding': 'gzip, deflate',
           Accept: '*/*',
           'Content-Type': 'application/json' },
        body: archivo[i],
        json: true };
      
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
      });
    }
    e2f.deleteFile();

   res.render('comprador/registro-facturas')
})

app.get('/comprador/consultar-facturas', (req, res)=>{
    res.render('comprador/consultar-facturas')
})
app.get('/comprador/notificaciones', (req, res)=>{
    res.render('comprador/notificaciones')
})

//BANCO
app.get('/banco/inicio', async(req, res)=>{
    res.render('banco/inicio')
})
app.get('/banco/solicitudes', async(req, res)=>{
    res.render('banco/solicitudes')
})
app.get('/banco/consultar-facturas', async(req, res)=>{
    res.render('banco/consultar-facturas')
})
app.get('/banco/notificaciones', async(req, res)=>{
    res.render('banco/notificaciones')
})


app.listen(port, () => {
    console.log('Server is up on port '+port)
})