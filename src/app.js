const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express()
const port = 3003

app.use(express.json())

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')
const partialsPath= path.join(__dirname, '../partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('/p-inicio', (req, res)=>{
    res.render('proveedor/inicio')
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})