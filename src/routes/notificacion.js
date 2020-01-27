const express = require('express')
const Notificacion  = require('../models/notificacion')
const router = new express.Router()

router.get('/notificaciones', async(req, res)=>{
    try{
        const notifs = await Notificacion.find({})
        res.send(notifs)
    } catch(e){
        res.status(500).send(e.message)
    }
})
router.post('/notificaciones', async(req, res)=>{
    const newNotif = new Notificacion(req.body)
    try{
        await newNotif.save()
        res.send(newNotif)
    }catch(e){
        res.status(500).send(e.message)
    }
})
router.patch('/notificaciones/:id', async(req, res)=>{
    const _id=req.params.id
    try{
        const notif= await Notificacion.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        if(!notif){res.status(404).send(e.message)}
        await notif.save()
        res.send(notif)
    }catch(e){
        res.status(500).send(e.message)
    }
})

router.get('/notificaciones/:rfc?/:read?', async (req, res, next)=>{
    const rfc=req.params.rfc
    const read=req.params.read
     try{
         const notif = await Notificacion.find({to: { $all: [rfc] }, read})
         if(!notif){throw new Error ('not found')}
         res.send(notif)
     }
     catch(e){
         res.status(500).send(e.message)
     }
 })
 router.get('/notificacionOne/:id', async (req, res, next)=>{
    const _id=req.params.id
     try{
         const notif = await Notificacion.find({_id})
         if(!notif){throw new Error ('not found')}
         res.send(notif)
     }
     catch(e){
         res.status(500).send(e.message)
     }
 })


 module.exports=router