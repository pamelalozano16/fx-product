
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

router.get('/facturas/:proveedor?/:proveedorRFC?/:dueDate?/:moneda?/:status?', async (req, res, next)=>{

    params=req.params
     try{
         for(var i in params){
             if(params[i]=="&"||params[i]==undefined){
                 delete params[i]
             }
         }
         if(params.dueDate){
             params.dueDate=new Date(params.dueDate)
             params.dueDate.setHours(0,0,0,0)
            params.dueDate.setDate(params.dueDate.getDate()+1)
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

 router.get('/searchNumber/:num?', async (req, res, next)=>{
    var numero=req.params.num
     try{
        const user = await Factura.find({numero})
        if(!user){res.status(404).send("Not Found")}
         res.send(user)
     }
     catch(e){
         res.status(500).send(e.message)
     }
 })

router.patch('/facturas/:id', async(req, res)=>{
    const _id = req.params.id
    try{
       const user = await Factura.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
       if(!user){return res.status(404).send('Not found')}
       user.save()
       console.log(user)
       res.send(user)
    }
    catch(e){
        res.send(e)
    }
})

module.exports = router