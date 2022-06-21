function isLeap(year){
    if((year%4==0 && year%100!=0) || (year%400==0)){
        return true;
    }
    return false;
}

function timestampRange(inputDate){
    let dayOfMonth = [31,31,28,31,30,31,30,31,31,30,31,30,31];
    let startMonths = [1,1,2,3,4,5,6,7,8,9,10,11,12];
    let endMonths = [12,1,2,3,4,5,6,7,8,9,10,11,12];
    let start = new Date(
            inputDate.year,
            startMonths[inputDate.month] - 1,
            1,
            0,0,0,0
        );
    let end = new Date(
        inputDate.year,
        endMonths[inputDate.month] - 1,
        dayOfMonth[inputDate.month],
        23,59,59,999
    )
    if(isLeap(inputDate.year) && inputDate.month == 2){
        end.setDate(29);
    }
    start = start.valueOf();
    end = end.valueOf();
    return [start,end];
}

function timestampToDate (time) {
    let timezone =  - (new Date().getTimezoneOffset()*60*1000);
    let rawTime =  new Date(time+timezone);
    let formated = rawTime.toISOString().slice(0,-5);
    formated = formated.replace('T',' ');
    return formated;
}

module.exports = {
    isLeap,
    timestampRange,
    timestampToDate
}