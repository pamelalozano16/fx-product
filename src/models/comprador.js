const mongoose = require('mongoose')

const compradorSchema = new mongoose.Schema({
    name:{
        type:String
    },
    numId:{
        type:String,
        unique:true
    },
    rfc:{
        type:String,
        unique:true
    },
    aforo:{
        type:Number
    },
    bufferDays:{
        type:Number
    },
    lineaDeCredito:{
        type:Number
    }
})
const comprador = mongoose.model('comprador', compradorSchema)

module.exports=comprador