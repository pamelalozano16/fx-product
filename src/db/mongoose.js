const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/fx-product', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).catch((e)=>{
    console.log(e)
})