const mongoose = require('mongoose')


const Factura = mongoose.model('facturasPublicadas', {
    name:{
        type:String
    },
    rfc: {
        type: String,
        validate(value){
            if(value<0){
                throw new Error('RFC must be a positive number.')
            }
        },
    },
    proveedor:{
        type:String
    },
    proveedorRFC:{
        type:String
    },
    numero:{
        type: String
    },
    folioFiscal:{
        type: String
    },
    invoiceDate:{
        type: Date
    },
    dueDate:{
        type:Date
    },
    moneda:{
        type: String
    },
    aforo:
   { type:Number},
   status:{
       type: String,
       default: "Publicada"
   },
   iva:{
    type:Number
},
extras:{
    type:Number
},
purchaseDate:{
    type: Date
},
aforoP:{
    type:Number
},
advanceRate:{
    type:Number
},
bufferDays:{
    type:Number
},
discountPeriod:{
    type:Number
},
libor:{
    type:Number
},
creditSpread:{
    type:Number
},
discountMargin:{
    type:Number
},
purchasePrice:{
    type:Number
},
efnFee:{
    type:Number,
    default:0
},
matuDate:{
    type:Date
},
porcentajeTotal:{
    type: Number
}
})


module.exports = Factura