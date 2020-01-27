
const id = getUrlVars()["id"]
console.log(id)

async function setNotificacion(){
 var dataJSON = await fetch('/notificacionOne/'+id)
 var data = await dataJSON.json()
 data=data[0]
 console.log(data)
 $("#from")[0].innerText = data.from
 $("#message")[0].innerText = data.message
}
setNotificacion()