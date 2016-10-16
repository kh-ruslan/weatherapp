var CityInfo = React.createClass({
  render: function() {
    return (
      <div>
        <input id='input'/>
        <img className='gif' src="../images/loading.gif" style={this.props.gif}/>
        <div>
          <h3>{this.props.city}</h3>
          <img className='flag' src={this.props.flag}/>
        </div>
      </div>
    )
  }
})

module.exports = CityInfo;