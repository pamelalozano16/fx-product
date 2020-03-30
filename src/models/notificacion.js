const mongoose = require("mongoose")

const notifSchema = new mongoose.Schema({
    from:{
        type:String
    },
    to:{
        type:[String]
    },
    numero:{
        type:String
    },
    message:{
        type:String
    },
    title:{
        type:String
    },
    read:{
        type:Boolean,
        default:false
    }
})
const notificacion= mongoose.model('Notificacion', notifSchema)
module.exports=notificacion

