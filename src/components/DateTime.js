function setTime (){
    let t = new Date().toLocaleTimeString();
    //converting to military time
    let hour = t.split(":")[0];
    let aMpM = t.split(" ")[1];
    let t2 = parseInt(hour)
    let time = 0;
    if(aMpM === 'PM'){
        if(hour === '12'){
            time = t2;
        }else{
            time = t2 + 12;
        }
    }
    if(aMpM === 'AM'){
        if(hour === '12'){
            time = 24;
        }else{
            time = t2;
        }
    }
    return time; 
};

function setDay(){
    let dateDay = new Date().getDay();
    let day = '';
    switch(dateDay){
        case 0:
            day = 'Su'
            break;
        case 1:
            day = 'Mo'
            break;
        case 2:
            day = 'Tu'
            break;
        case 3:
            day = 'We'
            break;
        case 4:
            day = 'Th'
            break;
        case 5:
            day = 'Fr'
            break;
        case 6:
            day = 'Sa'
            break;
    }
    return day;
}
const timeArray = [
    "Open 24 Hrs",
    "12:00am",
    "12:30am",
    "1:00am",
    "1:30am",
    "2:00am",
    "2:30am",
    "3:00am",
    "3:30am",
    "4:00am",
    "4:30am",
    "5:00am",
    "5:30am",
    "6:00am",
    "6:30am",
    "7:00am",
    "7:30am",
    "8:00am",
    "8:30am",
    "9:00am",
    "9:30am",
    "10:00am",
    "10:30am",
    "11:00am",
    "11:30am",
    "12:00pm",
    "12:30pm",
    "1:00pm",
    "1:30pm",
    "2:00pm",
    "2:30pm",
    "3:00pm",
    "3:30pm",
    "4:00pm",
    "4:30pm",
    "5:00pm",
    "5:30pm",
    "6:00pm",
    "6:30pm",
    "7:00pm",
    "7:30pm",
    "8:00pm",
    "8:30pm",
    "9:00pm",
    "9:30pm",
    "10:00pm",
    "10:30pm",
    "11:00pm",
    "11:30pm"
];

module.exports = { 
    setDay,
    setTime,
    timeArray
}
