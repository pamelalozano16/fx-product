const express = require('express');
const path = require('path');
const hbs = require('hbs');
const port = process.env.PORT || 3000
const facturasPublicadas = require('./routes/facturaPublicada')
const proveedor = require('./routes/proveedor')
require('./db/mongoose')


const app = express()


app.use(express.json())
app.use(facturasPublicadas)
app.use(proveedor)

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


//COMPRADOR
app.get('/comprador/inicio', (req, res)=>{
    res.render('comprador/inicio')
})
app.get('/comprador/registro-facturas', (req, res)=>{
    res.render('comprador/registro-facturas')
})


app.listen(port, () => {
    console.log('Server is up on port '+port)
})