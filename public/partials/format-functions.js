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

 function roundLibor(num){
  let newNum = Math.round(num * 100000) / 100000
   return newNum
 }
//END