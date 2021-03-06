$('#individual-btn')[0].onclick=function showIndiv(){
    $('#individual-form')[0].style.display='block'
    $('#multiple-form')[0].style.display='none';
}


$('#multiple-btn')[0].onclick=function showMultip(){
    $('#individual-form')[0].style.display='none'
    $('#multiple-form')[0].style.display='block';
}

async function getProveedores(){
    proveedoresJSON = await fetch('/proveedores')
    proveedores = await proveedoresJSON.json()
    for(var p in proveedores){
        $("#names").append('<option>'+proveedores[p].name+'</option>')
    }
}
getProveedores()

async function getCompradores(){
    proveedoresJSON = await fetch('/compradores')
    proveedores = await proveedoresJSON.json()
    for(var p in proveedores){
        $("#namesCompradores").append('<option>'+proveedores[p].name+'</option>')
    }
}
getCompradores()

$("#search-btn")[0].onclick=async function searchProveedor(){
    const name=$("#names")[0].value||'&'
    const rfc=$("#rfc")[0].value||'&'
    const proveedorJSON = await fetch('/proveedores/searchOne/'+name+'/'+rfc)
    const proveedor = await proveedorJSON.json()
    $("#rfc")[0].value=proveedor.rfc
    $("#names")[0].value=proveedor.name
}

$("#searchCompradores")[0].onclick=async function searchComprador(){
    const name=$("#namesCompradores")[0].value||'&'
    const rfc=$("#rfcCompradores")[0].value||'&'
    const proveedorJSON = await fetch('/compradores/searchOne/'+name+'/'+rfc)
    const proveedor = await proveedorJSON.json()
    $("#rfcCompradores")[0].value=proveedor.rfc
    $("#namesCompradores")[0].value=proveedor.name
}

$("#indv-registrar")[0].onclick=async function indvRegistrar(){
    const name = $("#namesCompradores")[0].value
    const numero = $("#numero")[0].value
    const proveedor = $("#names")[0].value
    const proveedorRFC = $("#rfc")[0].value
    const rfc = $("#rfcCompradores")[0].value
    const folioFiscal = $("#folioFiscal")[0].value
    const moneda = ($("#moneda")[0].value).toLowerCase();
    const aforo = $("#aforo")[0].value
    const invoiceDate = new Date($("#invoiceDate")[0].value)
    invoiceDate.setHours(0,0,0,0)
    const dueDate = new Date (document.getElementById("dueDate").value)
    dueDate.setHours(0,0,0,0)
    await fetch('/facturas', {
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'accept-encoding': 'gzip, deflate'
        },
        body: JSON.stringify({
        name,
        numero,
        rfc,
        dueDate,
        invoiceDate,
        moneda,
        aforo,
        proveedor,
        proveedorRFC,
        folioFiscal
        })
    })
    $('#individual-form')[0].style.display='none';
    $("#result")[0].style.display='block';
}

var uploaded = window.location.pathname;
if(uploaded=="/comprador/registro-facturas/excel"){
    $('#individual-form')[0].style.display='none';
    $("#result")[0].style.display='block';
}
