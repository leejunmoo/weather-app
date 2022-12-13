const API_KEY = '98cae070075dc557b6539f16f378da0f';
let city_name = 'seoul'; // 도시이름적으면 불러와줌
let API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`

fetch(API_URL)
    .then(function(res){
        return res.json;
    })
    .then

