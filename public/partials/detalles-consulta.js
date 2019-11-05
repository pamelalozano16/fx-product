
async function verDetalles(){
var num=window.location.search.substring(1)

var table = $('#resumen-table');
var row, cell;
var titles = $('<th>Nombre del Comprador</th><th>RFC</th><th>Numero de Factura</th><th>Folio Fiscal</th><th>Fecha de Factura</th><th>Fecha de Vencimiento</th><th>Moneda</th><th> Valor de la Factura</th><th>Fecha de operación</th><th>Aforo</th>'
+'<th>Monto neto aforado</th><th>Plazo</th><th>Fecha final de vencimiento</th><th>Descuento</th><th>Monto a recibir</th><th>Porcentaje total</th>');
table.append(titles)
const facturaJson = await fetch('/searchNumber/'+num)
var data = await facturaJson.json()

for(var i in data){
    row = $('<tr />' );
    table.append( row );
    cell = $('<td>'+data[i].name+'</td><td>'+data[i].rfc+'</td><td class="number">'+data[i].numero+'</td><td>'+data[i].folioFiscal+'</td><td>'+formatDate(data[i].invoiceDate)+'</td><td>'+formatDate(data[i].dueDate)+'</td><td>'+data[i].moneda+'</td><td>'+formatNumber(data[i].aforo)+'</td><td>'
    +formatDate(data[i].purchaseDate)+'</td><td>'+roundNum(data[i].aforoP)+'%</td><td>$'+formatNumber(data[i].advanceRate)+'</td><td>'+roundNum(data[i].discountPeriod)+'</td><td>'+formatDate(data[i].matuDate)+'</td><td>$'+formatNumber(data[i].discountMargin)+'</td><td>$'+formatNumber(data[i].purchasePrice)
    +'</td><td>'+roundNum(data[i].porcentajeTotal)+'%</td>')
    row.append( cell );
}

}
verDetalles()



