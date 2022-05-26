// JavaScript Document
$(document).ready(function() {
    $.ajax({
      async: true,  
      url: "/",
      type:"GET",
      data: {},
      success: function(res){
          
        var req =$.ajax({
          url:`https://api.openweathermap.org/data/2.5/weather?q=Gandia,es&appid=e47f98213f85048ef6578293546ae0d9&units=metric&lang=es`,
              dataType:'json'
           });
            
        req.done(function(weather){
            let location= weather.name;
              
            let desc= weather.weather[0]['description'];
              
            let temp =weather.main.temp + ' °C';
            let humidity = weather.main.humidity + '%';
            let wind= weather.wind.speed + ' Km/h';
              console.log(location, desc, temp, humidity, wind );
            let date= new Date().toLocaleDateString('es-ES');	
            let $show_detail_weather = $('#show_detail_weather');	
              $show_detail_weather.html('');
              $show_detail_weather.append(`
                <div class="card">
                <div class="card-header">
                <h1 class="h4"><i class="fas fa-location-arrow fa-2x"></i>&nbsp;&nbsp; 
                El clima de ${location} en este momento   </h1>
               
               </div>
               <div class="card-body"> 
               
               <h4><i class="fa fa-cloud fa-2x "></i>&nbsp;&nbsp;  <b>El cielo está con  ${desc}.</b></h4> 
               <h4><i class="fas fa-thermometer-half fa-2x"></i>&nbsp;&nbsp;  <b>La temperatura es de ${temp}.</b></h4>  
                   <h4><i class="fas fa-water fa-2x"></i>&nbsp;&nbsp;  <b>La humedad es de ${humidity}.</b></h4> 
                 <h4><i class="fas fa-wind fa-2x"></i> &nbsp;&nbsp;  <b>Velocidad del viento  ${wind} .</b></h4> 
                 </div>
                 </div>
                 
                 `)
        });
            
        req.fail(function(){
              $h1.text('Error!');
        });		
      }		
    });	
    
  });
  