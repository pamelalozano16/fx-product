const excelToJson = require('convert-excel-to-json');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

let converted = function excel2json(){
    'use strict';
    console.log("funcion")
const result = excelToJson({
    sourceFile: path.join(__dirname, '../../public/file.xlsx'),
    sheets: [{
        name:'sheet1',
        columnToKey: {
            A:"proveedor",
            B: "proveedorRFC",
            C: "numero",
            D:'folioFiscal',
            E:'invoiceDate',
            F: 'dueDate',
            G: 'moneda',
            H: 'aforo'

            
        }}]
});
 
const final = result.sheet1
console.log(final[0].numero)
for(var i in final){
    final[i].dueDate=new Date(final[i].dueDate)
    final[i].dueDate.setHours(0,0,0,0);
    final[i].invoiceDate=new Date(final[i].invoiceDate)
    final[i].invoiceDate.setHours(0,0,0,0);
    console.log(final[i].dueDate)
    console.log(final[i].invoiceDate)
}

return final
}

var storageExcel = multer.diskStorage(
    {
        destination: 'public',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null,"file.xlsx");
        },
        limits:{
            fileSize:1000000
        },
        fileFilter(req, file, cb){
            if (!file.originalname.match(/\.(xls|xlsx)$/)){
                return cb(new Error('Please upload an Excel Document'))
            }
        cb(undefined, true)
        }
    }
);


var deleteFile = function deleteFile(){
    fs.unlink(path.join(__dirname, '../../public/file.xlsx'), (err)=>{
        if (err) return 0;
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    })
    fs.unlink(path.join(__dirname, '../../public/file.csv'), (err)=>{
        if (err) return 0;
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    })

}

exports.converted = converted;
exports.deleteFile = deleteFile;
exports.storageExcel = storageExcel;