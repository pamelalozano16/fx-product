var curday = function(sp, dDG){
    today = new Date();
    var dd = today.getDate()+dDG;
    var mm = today.getMonth()+1; //As January is 0.
    var yyyy = today.getFullYear();
    
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return (mm+sp+dd+sp+yyyy);
    };

let monthsDays=[]
monthsDays[1]=31
monthsDays[2]=28
monthsDays[3]=31
monthsDays[4]=30
monthsDays[5]=31
monthsDays[6]=30
monthsDays[7]=31
monthsDays[8]=31
monthsDays[9]=30
monthsDays[10]=31
monthsDays[11]=30
monthsDays[12]=31

function matDate(day, month, year, gracia){
    if(day+gracia>monthsDays[month]){
      day=(day+gracia)-monthsDays[month]
      month++;
      var arr=[day, month, year]
      return arr
    } else{
      day=day+gracia
       var arr=[day, month, year]
      return arr
    }
  }

  // console.log(date[0], date[1])
  
  function discPeriod(dueday, duemonth, day, month){
    var num=0;
    if(duemonth==month){
      while(day<dueday){
      num++;
      day++;
    }

    return num
    }else{
      day=monthsDays[month]-day
      month++;
      while(month<duemonth){
        day+=monthsDays[month]
            month++;
      }
      day+=dueday
      return day
    }
}
//END DATE FUNCTIONS   

async function porConfirmar(data){
    const compradorJson = await fetch('/compradores/searchOne/&/'+data[0].rfc)
    const comprador = (await compradorJson.json())
    data[0].aforoP=comprador.aforo
    data[0].bufferDays=comprador.bufferDays
    data[0].purchaseDate=curday('/',0)
    data[0].libor=.0235
    data[0].spreadpoints=0.05
    data[0].advanceRate=roundNum(data[0].aforo*(comprador.aforo/100))

    //Maturity date
    const dueDay=(new Date(data[0].dueDate).getDate())
    const dueYear=(new Date(data[0].dueDate).getFullYear())
    const dueMonth=(new Date(data[0].dueDate).getMonth()+1)
    const matuDate= matDate(dueDay, dueMonth, dueYear, comprador.bufferDays)
    var maxDate = new Date()
    maxDate.setHours(0,0,0,0);
    maxDate.setDate(matuDate[0])
    maxDate.setMonth(matuDate[1]-1)
    maxDate.setFullYear(matuDate[2])
    data[0].matuDate=JSON.parse(JSON.stringify(maxDate))

    //Discount Period
    const pDay=(new Date (data[0].purchaseDate)).getDate()
    const pMonth=(new Date (data[0].purchaseDate)).getMonth()+1
    data[0].discountPeriod= discPeriod(matuDate[0], matuDate[1], pDay, pMonth)

    //Discount margin
    const discountPorc =roundLibor(data[0].libor+data[0].spreadpoints)
    data[0].discountMargin=roundNum(data[0].advanceRate*(discountPorc)*(data[0].discountPeriod/365))
    
    data[0].efnFee=roundNum(data[0].advanceRate*(0.06)*(data[0].discountPeriod/365))
    data[0].purchasePrice=roundNum(data[0].advanceRate-data[0].discountMargin)
    data[0].status="En proceso"

    return data
}