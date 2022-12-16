// time.js

let start = setInterval(function(){
    // const dayEl = document.querySelector('.day')
    const tomorrowEl = document.querySelector('.tomorrow')

    let now = new Date();
    let day = now.getDay();
    let tomorrow = day+1;

    //요일 영어 반환
    if(day==0) {
        day = `Sun`;
        tomorrow = `Mon`;
    } if(day==1) {
        day = `Mon`;
        tomorrow = `Tue`;
    } if(day==2) {
        day = `Tue`;
        tomorrow = `Wed`;
    } if(day==3) {
        day = `Wed`;
        tomorrow = `Thur`;
    } if(day==4) {
        day = `Thur`;
        tomorrow = `Fri`;
    } if(day==5) {
        day = `Fri`;
        tomorrow = `Sat`;
    } if(day==6) {
        day = `Sat`;
        tomorrow = `Sun`;
    }
    

    // dayEl.innerText = day;
    tomorrowEl.innerText = tomorrow;
    
    
},0)

function stop() {
    clearInterval(start);
}
