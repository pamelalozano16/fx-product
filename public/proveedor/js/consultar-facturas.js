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
let status = $("#status")[0].value||"&"
let rfc = $("#rfc")[0].value||"&"
let dueDate = $("#dueDate")[0].value||"&"
let moneda= $("#moneda")[0].value||"&"

const dataJSON = await fetch('/facturas/'+name+'/'+rfc+'/&/&/'+dueDate+'/'+moneda+'/'+status)
const data = await dataJSON.json()
console.log(data)

var table = $('#result-table');
var row, cell;
var titles = $('<th>Nombre del Comprador</th><th>RFC</th><th>Numero de Factura</th><th>Folio Fiscal</th><th>Fecha de Factura</th><th>Fecha de Vencimiento</th><th>Moneda</th><th> Valor de la Factura</th><th>Status</th>');
table.append(titles)

for(var i in data){
     row = $('<tr />' );
     table.append( row );
     cell = $('<td>'+data[i].name+'</td><td>'+data[i].rfc+'</td><td>'+data[i].numero+'</td><td>'+data[i].folioFiscal+'</td><td>'+formatDate(data[i].invoiceDate)+'</td><td>'+formatDate(data[i].dueDate)+'</td><td>'+data[i].moneda+'</td><td>'+formatNumber(data[i].aforo)+'</td><td>'+data[i].status+'</td>'+
     '<td><button type="button" class="detalles" id="'+data[i].numero+'"><p>Ver Detalles<p></button></td>')
     row.append( cell );
     
}
$("button.detalles").click(async function(){
    console.log(this.id)
    window.open('/proveedor/detalles-consulta?'+this.id)
})
}