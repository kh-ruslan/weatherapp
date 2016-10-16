var CityInfo = require('city-info');
var WeatherInfo = require('weather-info');

let autocomplete;
const options = { weekday: 'short', month: 'short', day: 'numeric' };

function convertWindDirection(dir) {
  let rose = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];
  let eightPoint = Math.floor(dir / 45);
  return rose[eightPoint];
}

var MainApp = React.createClass({
  getInitialState: function() {
    return {
      city: '',
      flag: '',
      gif: {
        display: "none"
      },
      list: []
    };
  },

  componentDidMount: function() {
    const options = {
      types: ['(cities)']
    };

    let input = document.getElementById('input');
    autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.addListener('place_changed', this.update);
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  update: function() {
    this.setState({
      gif: {
        display: "inline"
      }
    });

    let place = autocomplete.getPlace();
    let city_name = place.name;
    let country_name = place.address_components[place.address_components.length - 1].long_name

    let source = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city_name + ", " + country_name + "&units=metric&lang=ru&APPID=4b69a135771ec8bbe15a1d86a9cef569";    
    this.serverRequest = $.get(source, function(result) {
      this.setState({
        gif: {
          display: "none"
        },
        city: result.city.name + ", " + result.city.country,
        flag: "http://openweathermap.org/images/flags/" + result.city.country.toLowerCase() + ".png",
        list: result.list
      });
    }.bind(this));
  },

  render: function() {
    return (
      <div className='container'>        
        <h1 className="title">Weather App</h1>
        <CityInfo
          city={this.state.city}
          flag={this.state.flag}
          gif={this.state.gif}
        />
        <div className='days-container'>
        {this.state.list.map((content) => {
            let date = new Date(content.dt * 1000)
          return <WeatherInfo  
            date={date.toLocaleDateString('ru-RU', options)}        
            icon={"wi wi-owm-" + content.weather[0].id}
            tempDay={Math.round(content.temp.day)}
            tempNight={Math.round(content.temp.night)}
            description={content.weather[0].description}
            pressure={content.pressure}
            humidity={content.humidity}
            wind={content.speed}
            windDir={convertWindDirection(content.deg)}
            clouds={content.clouds}
           />
        })}
        </div>
      </div>
    );
  }
})

ReactDOM.render(
  <MainApp />,
  document.getElementById('app')
);