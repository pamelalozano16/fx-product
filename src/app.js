const express = require('express');
const path = require('path');
const hbs = require('hbs');
const facturasPublicadas = require('./routes/facturaPublicada')
require('./db/mongoose')


const app = express()
const port = process.env.PORT || 3003

app.use(express.json())
app.use(facturasPublicadas)

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')
const partialsPath= path.join(__dirname, '../partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

//PROVEEDOR
app.get('/proveedor/inicio', (req, res)=>{
    res.render('proveedor/inicio')
})
app.get('/proveedor/consultar-facturas', (req, res)=>{
    res.render('proveedor/consultar-facturas')
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})