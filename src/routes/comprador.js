const Comprador = require('../models/comprador')
const express=require('express')

const router= new express.Router()

router.post('/compradores/nuevo', async (req, res)=>{
    try{
        const comprador = new Comprador(req.body[0])
        await comprador.save()
        res.status(201).send(comprador)
    } catch(e){
        res.status(500).send(e.message)
    }
})


router.get('/compradores', async(req, res)=>{
    try{
        const compradores = await Comprador.find({})
        res.status(201).send(compradores)
    } catch(e){
        res.status(500).send(e.message)
    }
})

router.get('/compradores/searchOne/:name?/:rfc?', async(req, res)=>{
    const params=req.params
    for(var i in params){
        if(params[i]=='&'){
            delete params[i]
        }
    }
    try{
        const compradores = await Comprador.findOne(params)
        res.status(201).send(compradores)
    } catch(e){
        res.status(500).send(e.message)
    }
})

module.exports=router