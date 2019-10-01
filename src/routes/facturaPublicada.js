
const express = require('express')
const Factura = require('../models/facturaPublicada')
const router = new express.Router()

router.post('/facturas', async (req, res)=>{
    let nueva = new Factura(req.body)
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

router.get('/facturas/:name?/:rfc?/:dueDate?/:moneda?/:status?', async (req, res, next)=>{

    params=req.params
     try{
         for(var i in params){
             if(params[i]=="&"||params[i]==undefined){
                 delete params[i]
             }
         }
         if(params.dueDate){
             params.dueDate=new Date(params.dueDate)
         }
         console.log(params)
         const user = await Factura.find(params)
         if(!user){throw new Error ('not found')}

         res.send(user)
     }
     catch(e){
         res.status(500).send(e.message)
     }
 })

module.exports = router