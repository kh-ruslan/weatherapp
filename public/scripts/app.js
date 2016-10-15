var autocomplete;
var options = { weekday: 'short', month: 'short', day: 'numeric' };

function convertWindDirection(dir) {
  var rose = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];
  var eightPoint = Math.floor(dir / 45);
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
    var options = {
      types: ['(cities)']
    };

    var input = document.getElementById('input');
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

    var place = autocomplete.getPlace();
    var city_name = place.formatted_address;

    var source = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city_name + "&units=metric&lang=ru&APPID=4b69a135771ec8bbe15a1d86a9cef569";
    console.log(place);
    console.log(source);
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
        <SingleInfo
          city={this.state.city}
          flag={this.state.flag}
          gif={this.state.gif}
        />
        <div className='days-container'>
        {this.state.list.map(function(content) {
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

var SingleInfo = React.createClass({
  render: function() {
    return (
      <div className=''>
        <input id='input'/>
        <img className='gif' src="http://hulk-games.com/themes/happywheels_v2//resources/img/loading.gif" style={this.props.gif}/>
        <div>
          <h3>{this.props.city}</h3>
          <img className='flag' src={this.props.flag}/>
        </div>
      </div>
    )
  }
})

var WeatherInfo = React.createClass({
  render: function() {
    return (
      <div className='day-item'>
        <p className='date'>{this.props.date}</p>  
        <div className='weather-info'>             
          <div className='main-info'>        
            <i className={this.props.icon}></i>
            <p> <i>{this.props.description}</i></p>        
          </div>       
          <ul>
            <li><p><b>Днем: {this.props.tempDay} &deg;C</b></p></li>
            <li><p><b>Ночью: {this.props.tempNight} &deg;C</b></p></li>        
            <li><p>Давление: {this.props.pressure} мм</p></li>
            <li><p>Влажность: {this.props.humidity}%</p></li>
            <li><p>Ветер: {this.props.wind} м/с, {this.props.windDir}</p></li>
            <li><p>Облачность: {this.props.clouds}%</p></li>
          </ul>
        </div>
      </div>
    )
  }
})

ReactDOM.render(
  <MainApp />,
  document.getElementById('app')
);