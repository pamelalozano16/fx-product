async function setTable(){
    var rfc=$("#rfcCompradores")[0].value
    console.log(rfc)
    var datajson = await fetch('/notificaciones/'+rfc+'/false')
    var data = await datajson.json()
    var table = $('#tabla-notifs');
    var row, cell;
    
    console.log(data)
    for(var i in data){
         row = $('<tr class="unread"/>' );
         table.append( row );
         cell = $('<td class="cb"><input type="checkbox"></td><td>'+data[i].title+
         '</td><td class="detalles"><a href="/notificacion/'+data[i]._id+'">Detalles</a></td>')
         row.append( cell );
    }
     datajson = await fetch('/notificaciones/'+rfc+'/true')
     data = await datajson.json()
    
    for(var i in data){
         row = $('<tr class="read"/>' );
         table.append( row );
         cell = $('<td class="cb"><input type="checkbox"></td><td>'+data[i].title+
         '</td><td class="detalles"><a target="_blank" href="/notificacion?id='+
         data[i]._id+'">Detalles</a></td>')
         row.append( cell );
    }

}

$("#searchCompradores")[0].onclick=async function searchComprador(){
    const name=$("#namesCompradores")[0].value||'&'
    const rfc=$("#rfcCompradores")[0].value||'&'
    const proveedorJSON = await fetch('/compradores/searchOne/'+name+'/'+rfc)
    const proveedor = await proveedorJSON.json()
    $("#rfcCompradores")[0].value=proveedor.rfc
    $("#namesCompradores")[0].value=proveedor.name
    setTable()
}
async function getCompradores(){
    proveedoresJSON = await fetch('/compradores')
    proveedores = await proveedoresJSON.json()
    for(var p in proveedores){
        $("#namesCompradores").append('<option>'+proveedores[p].name+'</option>')
    }
}
getCompradores()

$("#selAll")[0].onchange = function selAll(){
    if($("#selAll")[0].checked){
     $("input:checkbox").attr('checked', true)
    } else{
        $("input:checkbox").attr('checked', false)
    }
}

$("#marcarLeido")[0].onclick = async function marcarLeido(){
    var rfc=$("#rfcCompradores")[0].value
    var dataJson= await fetch('/notificaciones/'+rfc+'/false')
    var data = await dataJson.json()
    for(var i in data){
        fetch('/notificaciones/'+data[i]._id, {
            method:'PATCH',
            headers:{      
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'accept-encoding': 'gzip, deflate'},
            body:JSON.stringify({
                "read":true
            })
        })
    }
    window.location.reload(true)
}