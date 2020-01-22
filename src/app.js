const express = require('express');
const path = require('path');
const hbs = require('hbs');
const port = process.env.PORT || 3000
const facturasPublicadas = require('./routes/facturaPublicada')
const proveedor = require('./routes/proveedor')
const comprador = require('./routes/comprador')
require('./db/mongoose')


const app = express()


app.use(express.json())
app.use(facturasPublicadas)
app.use(proveedor)
app.use(comprador)

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