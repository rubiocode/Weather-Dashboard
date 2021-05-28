$(document).ready(function (){

    //getting time on header set up using moments.js
    let today = function timeStamp (){
        $('#currentDay').text(`${moment().format('MMMM Do YYYY, h:mm a')}`);
        };
        today();
        //setInterval function to update every second so the today function keeps updating
        setInterval(today, 1000);


        renderCityList();
        console.log(renderCityList)

    // obtain current weather upon city search, setting up local storage
     $(".myClass").on('click', function (event){
        event.preventDefault();

        let city= $("#search").val().trim();
        if (city != ''){
            $.ajax({
                url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=50f9be4cd5ddca3502184f3307bce83e`,
                type: "GET",
                datatype: "jsonp",
                success: function(data){
                    let widget = show (data);

                    $("#showResults").html(widget);
                    $("#search").val('')
                }  
            })
            localStorage.setItem("city", JSON.stringify(city));
            renderCityList();
            fiveDayForecast (city);
        }else {
            $('#error').html (alert('Field cannot be empty'))
        }

        
    });
    function show(data) {
        return  "<div id='summary'>" +"<h3 style= 'font-size: 20px; font-weight: bold;'>"+ data.name +"," + data.sys.country +"</h3>" +
                "<h3><img src=http://openweathermap.org/img/wn/"+ data.weather[0].icon+".png> "+ data.weather[0].description  +"</h3>" + 
                "<h3><strong>Weather</strong>: "+ data.weather[0].main  +"</h3>" +
                "<h3><strong>Temperature</strong>: "+ Math.floor(data.main.temp)  +"&deg;F</h3>" +
                "<h3><strong>Min. Temp</strong>: "+ Math.floor(data.main.temp_min)  +"&deg;F</h3>" +
                "<h3><strong>Max. Temp</strong>: "+ Math.floor(data.main.temp_max)  +"&deg;F</h3>" +
                "<h3><strong>Wind Speed</strong>: "+ Math.floor(data.wind.speed)  +" MPH" +"</h3>" +
                "<h3><strong>Humidity</strong>: "+ data.main.humidity+"%" +"</h3>" + "</div>";
                
    }

    //setting up 5-day Forecast

    function fiveDayForecast (city) {
        $.ajax ({
            url: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=50f9be4cd5ddca3502184f3307bce83e`,
            type: "GET",
            datatype: "jsonp",
            success: function getForecast(data){
                $("#showFiveDayForecast").html("");
                console.log(data)
                for (i=0; i<data.list.length; i++) {
                    
                    if(data.list[i].dt_txt.indexOf("15:00:00")>0){
                        let weatherData= data.list[i]
                        console.log(weatherData)
                        let widgetFiveDay = showForecastData(weatherData);

                        $("#showFiveDayForecast").append(widgetFiveDay);
                    }
                }
                
            }  
    })
    function showForecastData (data){
        return  "<div>" + "<h3><img src=http://openweathermap.org/img/wn/"+ data.weather[0].icon+".png id='img2'> "+ data.weather[0].description  +"</h3>" + 
                "<h3><strong>Weather</strong>: "+ data.weather[0].main  +"</h3>" +
                "<h3><strong>Temperature</strong>: "+ Math.floor(data.main.temp)  +"&deg;F</h3>" +
                "<h3><strong>Wind Speed</strong>: "+ Math.floor(data.wind.speed)  +" MPH" +"</h3>" +
                "<h3><strong>Humidity</strong>: "+ data.main.humidity+"%" +"</h3>"+ "</div>";
        };

    }

// render city list
    
    function renderCityList () {
        $("#cityList").html("");
        let cityList= JSON.parse(localStorage.getItem("city"));
        
        return "<div>" + cityList + "</div>";
    }
    $("#cityList").append(cityList)






})

