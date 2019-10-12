const request = require("request");
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
var port = process.env.port || 8080;
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index", {weather: null, condition: null});
});


app.post("/", (req, res) => {
    let apiKey = 'f0b7db40a67868e429634e3baa95f385';
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    request(url, function(err, response, body) {
        if (err) {
            res.render("index", {weather: null, condition: null});
        }
        else {
            var weatherinfo = JSON.parse(body);
            if (weatherinfo.main == undefined) {
                res.render("index", {weather: null, condition: null});
            }
            else {
                var message = `It's ${weatherinfo.main.temp} degrees in ${weatherinfo.name}.`;
                var messageWeather = weatherinfo.weather[0].main;
                console.log(weatherinfo.weather[0].main);
                res.render("index", {weather: message, condition: messageWeather});
            }
        }
    });

}); 

app.listen(port, () => {
    console.log("http://localhost:" + port);
});