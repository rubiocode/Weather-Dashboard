$(document).ready(function (){
    // getting prev search history from local storage upon page loading

    function cityAllStorage (){
        let cities = [];
        keys = Object.keys(localStorage);
        i= keys.length;
        while (i--){
            cities.push(JSON.parse(localStorage[keys[i]]));
        }
        for (j=0; j<cities.length; j++) {
            $(".city-list").prepend("<button type='button' class='btn btn-light prev-city'>"+ cities[j]+ "</button>");
        }
        
    }
    cityAllStorage();

    // removing stored cities upon click event

    $(".remove").on("click", function (){
        localStorage.clear();
        $(".prev-city").remove();
    });

    //getting time on header set up using moments.js
    let today = function timeStamp (){
        $('#currentDay').text(`${moment().format('MMMM Do YYYY, h:mm a')}`);
        };
        today();
    //setInterval function to update every second so the today function keeps updating
        setInterval(today, 1000);


    // obtain current weather upon city search, setting up local storage
    $(".myClass").on('click', function (event){
        event.preventDefault();

        let city= $("#search").val().trim();
        cities = city.split(",")
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
            localStorage.setItem("cities", JSON.stringify(cities));
            $(".city-list").prepend("<button class='btn btn-light prev-city'>"+ cities + "</button>")
            fiveDayForecast (city);
        }else{
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
                        let widgetFiveDay = showForecastData(weatherData);

                        $("#showFiveDayForecast").append(widgetFiveDay);
                    }
                }
                
            }  
    })




    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate(today) + days);
        return date;
    }
    
    var date = new Date();
    
    console.log(date.addDays(i+));

    function showForecastData (data){
        
        return  "<div> <h3 class='dateFive'>" + date.addDays(i++) + "</h3>" +
                "<h3><img src=http://openweathermap.org/img/wn/"+ data.weather[0].icon+".png id='img2'> "+ data.weather[0].description  +"</h3>" + 
                "<h3><strong>Weather</strong>: "+ data.weather[0].main  +"</h3>" +
                "<h3><strong>Temperature</strong>: "+ Math.floor(data.main.temp)  +"&deg;F</h3>" +
                "<h3><strong>Wind Speed</strong>: "+ Math.floor(data.wind.speed)  +" MPH" +"</h3>" +
                "<h3><strong>Humidity</strong>: "+ data.main.humidity+"%" +"</h3>"+ "</div>";
        };

    }
    
$(document).on("click",".prev-city", function(){
    let city = $(this).text();
    $(".inpSearch").val(city);
    $("#searchButton").click();
    $(this).remove();


});



})