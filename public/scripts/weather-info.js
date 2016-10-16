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

module.exports = WeatherInfo;