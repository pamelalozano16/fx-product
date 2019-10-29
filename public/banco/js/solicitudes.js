//BORRAR TABLA
function borrarTabla(){
    var Parent = document.getElementById("result-table");
    while(Parent.hasChildNodes())
    {
       Parent.removeChild(Parent.firstChild);
    }
}

async function getProveedores(){
  proveedoresJSON = await fetch('/compradores')
  proveedores = await proveedoresJSON.json()
  for(var p in proveedores){
      $("#names").append('<option>'+proveedores[p].name+'</option>')
  }
}
getProveedores()

async function search(){
    borrarTabla()
    
let name = $("#names")[0].value||"&"
// let status = $("#status")[0].value||"&"
let rfc = $("#rfc")[0].value||"&"
let dueDate = $("#dueDate")[0].value||"&"
let moneda= $("#moneda")[0].value||"&"

const dataJSON = await fetch('/facturas/'+name+'/'+rfc+'/'+dueDate+'/'+moneda+'/'+'En proceso')
const data = await dataJSON.json()
console.log(data)

var table = $('#result-table');
var row, cell;
var titles = $('<th></th><th>Nombre del Comprador</th><th>RFC</th><th>Numero de Factura</th><th>Folio Fiscal</th><th>Fecha de Factura</th><th>Fecha de Vencimiento</th><th>Moneda</th><th> Valor de la Factura</th><th>Fecha de operación</th><th>Aforo</th>'
+'<th>Monto neto aforado</th><th>Plazo</th><th>Fecha final de vencimiento</th><th>Descuento</th><th>Monto a recibir</th><th>Porcentaje total</th>');
table.append(titles)

for(var i in data){
     row = $('<tr />' );
     table.append( row );
     cell = $('<td class="cb"><input type="checkbox" id='+data[i].numero
     +'></td><td>'+data[i].name+'</td><td>'+data[i].rfc+'</td><td class="number">'+data[i].numero+'</td><td>'+data[i].folioFiscal+'</td><td>'+formatDate(data[i].invoiceDate)+'</td><td>'+formatDate(data[i].dueDate)+'</td><td>'+data[i].moneda+'</td><td>'+formatNumber(data[i].aforo)+'</td><td>'
     +formatDate(data[i].purchaseDate)+'</td><td>'+data[i].aforoP+'%</td><td>$'+formatNumber(data[i].advanceRate)+'</td><td>'+data[i].discountPeriod+'</td><td>'+formatDate(data[i].matuDate)+'</td><td>$'+formatNumber(data[i].discountMargin)+'</td><td>$'+formatNumber(data[i].purchasePrice)
     +'</td><td>'+roundNum(data[i].porcentajeTotal)+'%</td>')
     row.append( cell );
}
    }

async function confirmar(){
    var arr = $("input[type=checkbox]:checked")
    for(var i=0;i<arr.length;i++){
    const facJSON= await fetch('/searchNumber/'+arr[i].id)
    const fac= await facJSON.json()
    fetch('/facturas/'+fac[0]._id, {
        method:'PATCH',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'accept-encoding': 'gzip, deflate'
        },
        body:JSON.stringify({
            "status":"Vendida"
        })
    })
     window.location.reload(true)
    }
}