//FORMAT FUNCTIONS
function formatNumber(num) {
  if(num!=undefined)
  {  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
  else{
    return ""
  }  
  }
  function roundNum(num){
    if(num==undefined){return 0}
    let newNum = Math.round(num * 100) / 100
     return newNum
   }

   function formatDate(date) {
     if(date==undefined){
       return ""
     }
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

 function roundLibor(num){
  let newNum = Math.round(num * 100000) / 100000
   return newNum
 }
//END