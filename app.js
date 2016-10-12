(function() {
  
  
  
  
  $('#searchCityBtn').on('click', function(e){
    console.log('success')
    e.preventDefault();
    var cityName= $('#searchCity').val()
    console.log($('#searchCity').val())
    var state = $('#searchState').val()
    console.log($('#searchState').val())
    
    
    cityZip(cityName, state)
    .then(function(data){
      console.log(data)
      $('#cityName').html( data.places[0]['post code'])
      return data;
    },
      function(error){
      });
      
    
    
    
  })
  
  
  
  
  
  
$('#addCityBtn').on('click', function(e){
  // console.log('yeah')
  e.preventDefault();
  var zip = $('#newZipCode').val()
  console.log($('#newZipCode').val())
  
  var city;
  
  getCity(zip)
    .then(function(data){
      city = data;
      return getWeather(zip);
    })
    .then(function(weather){
      
        var template = $('#cityTemplate').html();
        
        template= template
          .replace('{{ city }}', city.places[0]['place name'])
          .replace('{{ state }}', city.places[0]['state abbreviation'])
          .replace('{{ temp }}', parseInt(weather.main.temp))
          .replace('{{ conditions }}', weather.weather[0].description)
        $('#cityList').append($(template))
      },
      function(error){
      });
      
})
  
// 	getWeather('83701')
// 	  .then(
// 	    function(city) {
// 	      console.log(city)
	      
// 	      var template = $('#cityTemplate').html();
	      
// 	      template = template.replace('{{ temp }}', city.main.temp);
// 	      template = template.replace('{{conditions}}', city.weather)
// 	      $('#cityList').append($(template))
// 	      console.log();
// 	    },
// 	    function(error){
// 	    }
 
	    
// 	    );
  
  
  var cityZip = function(city, state){
    
  var baseURL= 'http://api.zippopotam.us/us/'
  var zipUrl = baseURL + 'ID/ketchum'
    
    return new Promise (function(resolve, reject){
      
      $.get(zipUrl).then(
        function(data){
          resolve (data);
        },
        function(data){
          reject (data);
        });
        })
   
  }
  
  
  
	function getCity(zip) {

		var urlBase = 'http://api.zippopotam.us/us/';
		var url = urlBase + zip;
		
		return new Promise(function(resolve, reject) {

      $.get(url).then(
        function(data) {
          resolve(data);
        },
        function(error) {
          reject(error);
        }
      );
    });
		
		
	}
	

	function getWeather(zip) {

		var urlBase = 'http://api.openweathermap.org/data/2.5/';
		var appId = 'bd82255fd0a21fa1238699b9eda2ee35';
		var url = urlBase + 'weather?appid=' + appId + '&units=imperial&zip=' + zip;

    return new Promise(function(resolve, reject){
      
      $.get(url).then(
        function(data){
          resolve (data);
        },
        function(data){
          reject (data);
        });
        })
    
	}
})();