async function getProveedores(){
    proveedoresJSON = await fetch('/proveedores')
    proveedores = await proveedoresJSON.json()
    for(var p in proveedores){
        $("#names").append('<option>'+proveedores[p].name+'</option>')
    }
  }
  getProveedores()

  async function search(){
    var proveedor=$("#names")[0].value||"&"
    var proveedorRFC=$("#rfcs")[0].value||"&"

      var proveedorJSON = await fetch('/proveedores/searchOne/'+proveedor+"/"+proveedorRFC)
      var proveedor= await proveedorJSON.json()
        console.log(proveedor)
        $("#name")[0].innerText=proveedor.name
        $("#rfc")[0].value=proveedor.rfc
        $("#numId")[0].value=proveedor.numId
        if(proveedor.fxproduct){
            $("#fxproduct")[0].checked=true;
        }
  }

  async function save(){
    var proveedor=$("#names")[0].value||"&"
    var proveedorRFC=$("#rfcs")[0].value||"&"
    var proveedorJSON = await fetch('/proveedores/searchOne/'+proveedor+"/"+proveedorRFC)
    var proveedor= await proveedorJSON.json()
    var rfc=$("#rfc")[0].value
    var numId=$("#numId")[0].value
    var fxproduct
    if($("#fxproduct")[0].checked){
        fxproduct=true
    } else {fxproduct=false;}
    console.log(proveedor._id)
    fetch('/proveedores/'+proveedor._id, {
        method:'PATCH',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'accept-encoding': 'gzip, deflate'
        },
        body: JSON.stringify({
            rfc,
            numId,
            fxproduct
        })
      })
      window.location.reload(true);
  }