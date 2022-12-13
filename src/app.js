/* // app.js
const API_KEY = '179ceeb11c23a912fefd41421f453ea0';
let city_name = 'seoul';
let API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`


function getWeatherData(cityname = 'seoul') {
  // 도시명 업데이트
  city_name = cityname;
  API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`

  fetch(API_URL)
  .then(function(응답데이터){
    return 응답데이터.json()
  })
  .then(function(data){
    console.log(data);
    showWeather(data)
  })

} // getWeatherData

function showWeather(data) {
  const desc = data.weather[0].main; // 날씨상태 설명
  const weather_icon = data.weather[0].icon; // 아이콘
  const temp = parseInt(data.main.temp - 273.15); // 현재온도
  const name = data.name; // 도시명
  console.log(name, desc, weather_icon, temp);

  // UI 출력(DOM)
  const citynameEl = document.querySelector('.cityname');
  const iconEl = document.querySelector('.icon');
  const tempEl = document.querySelector('.temp');
  const descEl = document.querySelector('.desc');

  citynameEl.textContent = name;
  iconEl.innerHTML = `<img src='src/images/${weather_icon}.svg' alt=weather_icon/>`
  tempEl.innerHTML = `${temp}&deg;`
  descEl.textContent = desc;
}


// 날씨 함수 호출
getWeatherData()


// 선택목록(도시명) 변경 이벤트
const select = document.getElementById('select');
select.addEventListener('change', function(e){

  const cityname = e.target.value
  getWeatherData(cityname)
}) */

// 응용
// 1. 날씨나 시간대(주간/야간)에 따라 배경 연출 바꾸기
// 2. 아이콘을 다른 것으로 변경
// 3. 기타 등등


// 위치를 기반하여 날씨 조회

// api
const API_KEY = '179ceeb11c23a912fefd41421f453ea0';

const citynameEl = document.querySelector('.cityname');
const iconEl = document.querySelector('.icon');
const tempEl = document.querySelector('.temp');
const descEl = document.querySelector('.desc');
const bgEl = document.querySelector('#app');

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
  console.log(name, desc, weather_icon, temp);
  // 출력한 정보를 텍스트로 넣기
  citynameEl.textContent = name;
  iconEl.innerHTML = `<img src='src/images/${weather_icon}.svg' alt=weather_icon/>`
  tempEl.innerHTML = `${temp}&deg;`
  descEl.textContent = desc;
  // 백그라운드 이미지 바꾸기
  /* bgEl.style.backgroundImage = "url('images/bg/day-sun.jfif')";
  console.log('배경이미지');  */
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

// 날씨에 따른 배경 변화
/* function weatherBg(){
  if( weather_icon == '50d' ) {
    bgEl.style.background = "url(images/bg/cloudy.jfif)";
    console.log('배경이미지');  
  }
  
} */

$(function(){
  $('#app').css({
    "background":"url(images/bg/rain.jfif)",
  })
})
