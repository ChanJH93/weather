const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
  res.sendFile(__dirname+"/index.html");

})

app.post('/', function(req, res){

  const apiKey = "9ae8d0eb477da1230496c0f978059809";
  const location = req.body.City;
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid="+apiKey+"&units="+units;
  const forecast = "https://api.openweathermap.org/data/2.5/forecast?q="+location+"&appid="+apiKey+"&units="+units;

  https.get(url, function(response){
    response.on("data", function(data){
      const weather = JSON.parse(data);
      const temp = weather.main.temp;
      const weatherdesc =weather.weather[0].description;
      const icon = weather.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      console.log(weatherdesc);
      res.write("<h1>The weather is currently "+ weatherdesc+"</h1>");
      res.write("<h1>The temperature in "+location+" is "+temp+" degree Celcius.</h1>");
      res.write("<img src=" +imageUrl+ ">");

    })
  })

  // https.get(forecast, function(resp){
  //   resp.on("forecastData", function(forecastData){
  //     const forecastWeather = JSON.parse(forecastData);
  //     console.log(forecastWeather)
  //     res.send();
  //   })
  // })

})


// const apiKey = "9ae8d0eb477da1230496c0f978059809";

app.listen(3000, function(){
  console.log("Server Started")
})
