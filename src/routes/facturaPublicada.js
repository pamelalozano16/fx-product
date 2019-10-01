
const express = require('express')
const Factura = require('../models/facturaPublicada')
const router = new express.Router()

router.post('/facturas', async (req, res)=>{
    const nueva = new Factura(req.body)
    try{
        await nueva.save();
        res.status(201).send(nueva)
    } catch(e){
        res.status(500).send(e.message)
    }
})

router.get('/facturas', async (req, res)=>{
    try{
        const facturas = await Factura.find({})
        res.status(201).send(facturas)

    } catch(e){
        res.status(500).send(e.message)
    }
})

module.exports = router