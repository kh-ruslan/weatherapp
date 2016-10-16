/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var CityInfo = __webpack_require__(1);
	var WeatherInfo = __webpack_require__(2);

	var autocomplete = void 0;
	var options = { weekday: 'short', month: 'short', day: 'numeric' };

	function convertWindDirection(dir) {
	  var rose = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];
	  var eightPoint = Math.floor(dir / 45);
	  return rose[eightPoint];
	}

	var MainApp = React.createClass({
	  displayName: 'MainApp',

	  getInitialState: function getInitialState() {
	    return {
	      city: '',
	      flag: '',
	      gif: {
	        display: "none"
	      },
	      list: []
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    var options = {
	      types: ['(cities)']
	    };

	    var input = document.getElementById('input');
	    autocomplete = new google.maps.places.Autocomplete(input, options);
	    autocomplete.addListener('place_changed', this.update);
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this.serverRequest.abort();
	  },

	  update: function update() {
	    this.setState({
	      gif: {
	        display: "inline"
	      }
	    });

	    var place = autocomplete.getPlace();
	    var city_name = place.name;
	    var country_name = place.address_components[place.address_components.length - 1].long_name;

	    var source = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city_name + ", " + country_name + "&units=metric&lang=ru&APPID=4b69a135771ec8bbe15a1d86a9cef569";
	    console.log(place);
	    console.log(source);
	    this.serverRequest = $.get(source, function (result) {
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

	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'container' },
	      React.createElement(
	        'h1',
	        { className: 'title' },
	        'Weather App'
	      ),
	      React.createElement(CityInfo, {
	        city: this.state.city,
	        flag: this.state.flag,
	        gif: this.state.gif
	      }),
	      React.createElement(
	        'div',
	        { className: 'days-container' },
	        this.state.list.map(function (content) {
	          var date = new Date(content.dt * 1000);
	          return React.createElement(WeatherInfo, {
	            date: date.toLocaleDateString('ru-RU', options),
	            icon: "wi wi-owm-" + content.weather[0].id,
	            tempDay: Math.round(content.temp.day),
	            tempNight: Math.round(content.temp.night),
	            description: content.weather[0].description,
	            pressure: content.pressure,
	            humidity: content.humidity,
	            wind: content.speed,
	            windDir: convertWindDirection(content.deg),
	            clouds: content.clouds
	          });
	        })
	      )
	    );
	  }
	});

	ReactDOM.render(React.createElement(MainApp, null), document.getElementById('app'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var CityInfo = React.createClass({
	  displayName: 'CityInfo',

	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement('input', { id: 'input' }),
	      React.createElement('img', { className: 'gif', src: '../images/loading.gif', style: this.props.gif }),
	      React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'h3',
	          null,
	          this.props.city
	        ),
	        React.createElement('img', { className: 'flag', src: this.props.flag })
	      )
	    );
	  }
	});

	module.exports = CityInfo;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var WeatherInfo = React.createClass({
	  displayName: 'WeatherInfo',

	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'day-item' },
	      React.createElement(
	        'p',
	        { className: 'date' },
	        this.props.date
	      ),
	      React.createElement(
	        'div',
	        { className: 'weather-info' },
	        React.createElement(
	          'div',
	          { className: 'main-info' },
	          React.createElement('i', { className: this.props.icon }),
	          React.createElement(
	            'p',
	            null,
	            ' ',
	            React.createElement(
	              'i',
	              null,
	              this.props.description
	            )
	          )
	        ),
	        React.createElement(
	          'ul',
	          null,
	          React.createElement(
	            'li',
	            null,
	            React.createElement(
	              'p',
	              null,
	              React.createElement(
	                'b',
	                null,
	                '\u0414\u043D\u0435\u043C: ',
	                this.props.tempDay,
	                ' \xB0C'
	              )
	            )
	          ),
	          React.createElement(
	            'li',
	            null,
	            React.createElement(
	              'p',
	              null,
	              React.createElement(
	                'b',
	                null,
	                '\u041D\u043E\u0447\u044C\u044E: ',
	                this.props.tempNight,
	                ' \xB0C'
	              )
	            )
	          ),
	          React.createElement(
	            'li',
	            null,
	            React.createElement(
	              'p',
	              null,
	              '\u0414\u0430\u0432\u043B\u0435\u043D\u0438\u0435: ',
	              this.props.pressure,
	              ' \u043C\u043C'
	            )
	          ),
	          React.createElement(
	            'li',
	            null,
	            React.createElement(
	              'p',
	              null,
	              '\u0412\u043B\u0430\u0436\u043D\u043E\u0441\u0442\u044C: ',
	              this.props.humidity,
	              '%'
	            )
	          ),
	          React.createElement(
	            'li',
	            null,
	            React.createElement(
	              'p',
	              null,
	              '\u0412\u0435\u0442\u0435\u0440: ',
	              this.props.wind,
	              ' \u043C/\u0441, ',
	              this.props.windDir
	            )
	          ),
	          React.createElement(
	            'li',
	            null,
	            React.createElement(
	              'p',
	              null,
	              '\u041E\u0431\u043B\u0430\u0447\u043D\u043E\u0441\u0442\u044C: ',
	              this.props.clouds,
	              '%'
	            )
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = WeatherInfo;

/***/ }
/******/ ]);