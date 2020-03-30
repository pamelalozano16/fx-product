const Proveedor = require('../models/proveedor')
const express=require('express')

const router= new express.Router()

router.post('/proveedor/nuevo', async (req, res)=>{
    try{
        const proveedor = new Proveedor(req.body)
        await proveedor.save()
        res.status(201).send(proveedor)
    } catch(e){
        res.status(500).send(e.message)
    }
})


router.get('/proveedores', async(req, res)=>{
    try{
        const proveedores = await Proveedor.find({})
        res.status(201).send(proveedores)
    } catch(e){
        res.status(500).send(e.message)
    }
})

router.get('/proveedores/searchOne/:name?/:rfc?', async(req, res)=>{
    const params=req.params
    for(var i in params){
        if(params[i]=='&'){
            delete params[i]
        }
    }
    try{
        const proveedores = await Proveedor.findOne(params)
        res.status(201).send(proveedores)
    } catch(e){
        res.status(500).send(e.message)
    }
})

router.patch('/proveedores/:id', async(req, res)=>{
    const _id = req.params.id
    console.log(_id)
    try{
       const user = await Proveedor.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
       if(!user){return res.status(404).send('Not found')}
       user.save()
       console.log(user)
       res.send(user)
    }
    catch(e){
        
        res.send(e)
    }
})

module.exports=router