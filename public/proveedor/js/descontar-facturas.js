//FORMAT FUNCTIONS
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  function roundNum(num){
    let newNum = Math.round(num * 100) / 100
     return newNum
   }

   function formatDate(date) {
    date=new Date(date)
   var monthNames = [
     "Jan", "Feb", "Mar",
     "Apr", "May", "Jun", "Jul",
     "Aug", "Sep", "Oct",
     "Nov", "Dec"
   ];
 
   var day = date.getDate();
   var monthIndex = date.getMonth();
   var year = date.getFullYear();
 
   return monthNames[monthIndex] + '/' + day + '/' + year;
 }
//END

//BORRAR TABLA
function borrarTabla(){
    var Parent = document.getElementById("result-table");
    while(Parent.hasChildNodes())
    {
       Parent.removeChild(Parent.firstChild);
    }
}
//BORRAR RESUMEN
function borrarResumen(){
  var Parent = document.getElementById("resumen-table");
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
let status = $("#status")[0].value||"&"
let rfc = $("#rfc")[0].value||"&"
let dueDate = $("#dueDate")[0].value||"&"
let moneda= $("#moneda")[0].value||"&"

const dataJSON = await fetch('/facturas/'+name+'/'+rfc+'/'+dueDate+'/'+moneda+'/'+status)
const data = await dataJSON.json()
console.log(data)

var table = $('#result-table');
var row, cell;
var titles = $('<th></th><th>Nombre del Comprador</th><th>RFC</th><th>Numero de Factura</th><th>Folio Fiscal</th><th>Fecha de Factura</th><th>Fecha de Vencimiento</th><th>Moneda</th><th> Valor de la Factura</th><th>Status</th>');
table.append(titles)

for(var i in data){
     row = $('<tr />' );
     table.append( row );
     cell = $('<td class="cb"><input type="checkbox" id='+data[i].numero
     +'></td><td>'+data[i].name+'</td><td>'+data[i].rfc+'</td><td>'+data[i].numero+'</td><td>'+data[i].folioFiscal+'</td><td>'+formatDate(data[i].invoiceDate)+'</td><td>'+formatDate(data[i].dueDate)+'</td><td>'+data[i].moneda+'</td><td>'+formatNumber(data[i].aforo)+'</td><td>'+data[i].status+'</td>')
     row.append( cell );
}
    }

$("#descontar")[0].onclick= async function descontar(){
    borrarResumen()
//  console.log($("input[type=checkbox]"))
$(".busqueda-div")[0].style.display="none";
$(".search-table")[0].style.display="none";
var arr=$("input[type=checkbox]:checked")
var table = $('#resumen-table');
var row, cell;
var titles = $('<th>Nombre del Comprador</th><th>RFC</th><th>Numero de Factura</th><th>Folio Fiscal</th><th>Fecha de Factura</th><th>Fecha de Vencimiento</th><th>Moneda</th><th> Valor de la Factura</th><th>Fecha de operación</th><th>Aforo</th>'
+'<th>Monto neto aforado</th><th>Plazo</th><th>Fecha final de vencimiento</th><th>Descuento</th><th>Monto a recibir</th><th>Porcentaje total</th>');
table.append(titles)
i=0;
for(var j=0;j<arr.length;j++){
console.log(arr[j].id)
const facturaJson = await fetch('/searchNumber/'+arr[j].id)
var data = await facturaJson.json()
data=await porConfirmar(data)
console.log(data)
     row = $('<tr />' );
     table.append( row );
     cell = $('<td>'+data[i].name+'</td><td>'+data[i].rfc+'</td><td class="number">'+data[i].numero+'</td><td>'+data[i].folioFiscal+'</td><td>'+formatDate(data[i].invoiceDate)+'</td><td>'+formatDate(data[i].dueDate)+'</td><td>'+data[i].moneda+'</td><td>'+formatNumber(data[i].aforo)+'</td><td>'
     +formatDate(data[i].purchaseDate)+'</td><td>'+data[i].aforoP+'%</td><td>$'+formatNumber(data[i].advanceRate)+'</td><td>'+data[i].discountPeriod+'</td><td>'+formatDate(data[i].matuDate)+'</td><td>$'+formatNumber(data[i].discountMargin)+'</td><td>$'+formatNumber(data[i].purchasePrice)
     +'</td><td>'+roundNum(data[i].porcentajeTotal)+'%</td>')
     row.append( cell );
}
$("#resumen-div")[0].style.display="block";
}

$("#confirmar")[0].onclick= async function confirmarDescuento(){
const arr = ($(".number"))

for(var j=0;j<arr.length;j++){
  tempId=arr[j].innerText
  const facturaJson = await fetch('/searchNumber/'+tempId)
  var data = await facturaJson.json()
  data=await porConfirmar(data)
  console.log(data)
  i=data[0]
  fetch('/facturas/'+data[0]._id, {
    method:'PATCH',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'accept-encoding': 'gzip, deflate'
    },
    body: JSON.stringify({
      "status":i.status,
      "advanceRate":i.advanceRate,
      "iva":i.iva,
      "purchaseDate":i.purchaseDate,
      "aforoP":i.aforoP,
      "bufferDays":i.bufferDays,
      "discountPeriod":i.discountPeriod,
      "matuDate":i.matuDate,
      "discountMargin":i.discountMargin,
      "purchasePrice":i.purchasePrice,
      "porcentajeTotal": roundNum(i.porcentajeTotal)

    })
  })
}
}