const mongoose = require('mongoose')

const proveedorSchema = new mongoose.Schema({
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
    fxproduct:{
        type:Boolean,
        default:false
    }
})
const proveedor = mongoose.model('proveedor', proveedorSchema)

module.exports=proveedor