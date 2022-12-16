// app.js


// 위치를 기반하여 날씨 조회

// api
const API_KEY = '179ceeb11c23a912fefd41421f453ea0';

const citynameEl = document.querySelector('.cityname');
const iconEl = document.querySelector('.icon');
const tempEl = document.querySelector('.temp');
const descEl = document.querySelector('.desc');
const bgEl = document.querySelector('#app');
const humidityEl = document.querySelector('.humidity');
const speedEl = document.querySelector('.speed');
const tempMaxEl = document.querySelector('.temp-max');
const tempMinEl = document.querySelector('.temp-min');

navigator.geolocation.getCurrentPosition(function (위치) {
  console.log(위치);
}, function (위치){
  console.log('위치 정보를 불러오는데 실패했습니다.')});

// 위치정보 기반 데이터 호출 함수
function getDataByLocating(la, lon) {
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${la}&lon=${lon}&units=metric&appid=47ae1f9397984156de1427b9ab3c9c06`

  fetch(URL)
  .then(function(resp){
    return resp.json();
  })
  .then(function(data){
    printWeatherData(data);
  })
}

function printWeatherData(data) {
  const desc = data.weather[0].main; // 날씨상태 설명
  const weather_icon = data.weather[0].icon; // 아이콘
  const temp = parseInt(data.main.temp); // 현재온도
  const name = data.name; // 도시명
  const humidity = data.main.humidity; // 습도
  const speed = data.wind.speed; // 풍속
  const tempMax = Math.floor(data.main.temp_max); // 최고온도 (소수점버림)
  const tempMin = Math.floor(data.main.temp_min); // 최저온도 (소수점버림)
  console.log(name, desc, weather_icon, temp);
  // 출력한 정보를 텍스트로 넣기
  citynameEl.textContent = name;
  iconEl.innerHTML = `<img src='src/images/${weather_icon}.svg' alt=weather_icon/>`
  tempEl.innerHTML = `${temp}&deg;`
  descEl.textContent = desc;
  humidityEl.innerHTML = humidity + '%';
  speedEl.innerHTML = speed + 'm/s';
  tempMaxEl.innerHTML = tempMax + '&deg';
  tempMinEl.innerHTML = tempMin + '&deg';

  // 백그라운드 이미지 바꾸기
  if(weather_icon == '01d' ) {
    bgEl.style.backgroundImage = "url(src/images/bg/day-sun.jfif)";
    // console.log('배경이미지'); 
  } else if (weather_icon == '02d') {
    bgEl.style.backgroundImage = "url(src/images/bg/cloudy.jfif)";
  } else if (weather_icon == '03d') {
    bgEl.style.backgroundImage = "url(src/images/bg/cloudy.jfif)";
  } else if (weather_icon == '04d') {
    bgEl.style.backgroundImage = "url(src/images/bg/cloudy.jfif)";
  } else if (weather_icon == '09d') {
    bgEl.style.backgroundImage = "url(src/images/bg/rain.jfif)";
  } else if (weather_icon == '10d') {
    bgEl.style.backgroundImage = "url(src/images/bg/rain.jfif)";
  } else if (weather_icon == '11d') {
    bgEl.style.backgroundImage = "url(src/images/bg/storm.jfif)";
  } else if (weather_icon == '13d') {
    bgEl.style.backgroundImage = "url(src/images/bg/day-snow.jfif)","fillter";
  } else if (weather_icon == '50d') {
    bgEl.style.backgroundImage = "url(src/images/bg/cloudy.jfif)";
  } else if (weather_icon == '01n') {
    bgEl.style.backgroundImage = "url(src/images/bg/night-sun.jfif)";
  } else if (weather_icon == '02n') {
    bgEl.style.backgroundImage = "url(src/images/bg/day-cloudy.jfif)";
  } else if (weather_icon == '03n') {
    bgEl.style.backgroundImage = "url(src/images/bg/day-cloudy.jfif)";
  } else if (weather_icon == '04n') {
    bgEl.style.backgroundImage = "url(src/images/bg/day-cloudy.jfif)";
  } else if (weather_icon == '09n') {
    bgEl.style.backgroundImage = "url(src/images/bg/night-rain.jfif)";
  } else if (weather_icon == '010n') {
    bgEl.style.backgroundImage = "url(src/images/bg/night-rain.jfif)";
  } else if (weather_icon == '11n') {
    bgEl.style.backgroundImage = "url(src/images/bg/storm.jfif)";
  } else if (weather_icon == '13n') {
    bgEl.style.backgroundImage = "url(src/images/bg/night-snow.jfif)";
  } else if (weather_icon == '50n') {
    bgEl.style.backgroundImage = "url(src/images/bg/day-cloudy.jfif)";
  } 
} 

// 위치정보 기반 데이터 호출 실패
function failLocating(){
  citynameEl.textContent = '위치 정보를 불러오는데 실패했습니다.'
  iconEl.src = 'fail.png'
  // elStatus.textContent = 'Fail to load'
  // elTemp.textContent = '정보공유가 싫으시면 검색을 이용해주세요 :)'
}

navigator.geolocation.getCurrentPosition(function (position){
  const latitude = String(position.coords.latitude)
  const longitude = String(position.coords.longitude)
  getDataByLocating(latitude, longitude);
}, failLocating);


// 더보기 클릭 이벤트 등록
$(function(){
  $('#app .app-text').on('click', function(){
    $('#app .app-text-more-list .app-text-more ul').toggleClass('show');
    $('#app .app-text-tomorrow').toggleClass('show');
  })
  $('#app .app-text-tomorrow').on('click', function(){
    $('#app .app-tomorrow-more-list .app-tomorrow-more ul').toggleClass('to-show');
    $('#app .app-text-tomorrow').toggleClass('to-show');
    $('#app .app-text').toggleClass('to-show');
  })
})

// app-text, app-text-tomorrow 에 hover 시 이벤트 등록
$(function(){
  $('#app .app-text').hover(function(){
    $('#app .app-text .day').html("<p class='day-hover'>Today Weather info More</p>")
    $('#app .app-text .app-icon').addClass('hover-show')
  }, function(){
    $('#app .app-text .day').html("<p class='day'>Today</p>")
    $('#app .app-text .app-icon').removeClass('hover-show')
  })
})


$(function(){
  $('#app .app-text-tomorrow').hover(function(){
    $('#app .app-text-tomorrow .tomorrow').html("<p class='tomorrow-hover'>Tomorrow Weather info More")
    $('#app .app-text-tomorrow .app-tomorrow-icon').addClass('hover-show')
    clearInterval(start);
  }, function(){
    $('#app .app-text-tomorrow .tomorrow').text("Tomorrow")
    $('#app .app-text-tomorrow .app-tomorrow-icon').removeClass('hover-show')
    start = setInterval(function(){
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
  })
})