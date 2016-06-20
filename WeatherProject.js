var React = require('react');
var {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image
} = require('react-native');

var Forecast = require("./Forecast");

var WeatherProject = React.createClass({
  getInitialState() {
    return ({
      zip: "",
      forecast: null
    });
  },
  _handleTextChange(event) {
    var zip = event.nativeEvent.text;
    this.setState({zip: zip});
    fetch("http://api.openweathermap.org/data/2.5/weather?zip=" + 80207 + "&units=imperial&APPID=4756af9614c9971a6c4c4b17ef4630fe")
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({
          forecast: {
            main: responseJSON.weather[0].main,
            description: responseJSON.weather[0].description,
            temp: responseJSON.main.temp
          }
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  },
  render() {
    var content = null;
    if(this.state.forecast !== null){
      content = <Forecast main={this.state.forecast.main} description={this.state.forecast.description} temp={this.state.forecast.temp}/>;
    }
    return (
      <View style={styles.container}>
        <Image source={require("./mountains.jpg")}
          resizeMode="cover"
          style={styles.backdrop}>
          <View style={styles.overlay}>
            <View style={styles.row}>
              <Text style={styles.mainText}>
                Current weather for
              </Text>
              <View style={styles.zipContainer}>
                <TextInput
                  style={[styles.zipCode, styles.mainText]}
                  returnKeyType="go"
                  onSubmitEditing={this._handleTextChange}/>
              </View>
            </View>
            {content}
          </View>
        </Image>
      </View>
    );
  }
});

var baseFontSize = 16;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
  },
  backdrop: {
    flex: 1,
    flexDirection: "column"
  },
  overlay: {
    paddingTop: 5,
    backgroundColor: "#000000",
    opacity: 0.8,
    flexDirection: "column",
    alignItems: "center"
  },
  row: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "flex-start",
    padding: 30
  },
  zipContainer: {
    flex: 1,
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 2
  },
  zipCode: {
    width: 50,
    height: baseFontSize
  },
  mainText: {
    flex: 1,
    fontSize: baseFontSize,
    color: "#FFFFFF"
  }
});

module.exports = WeatherProject;
