import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text as TextNative,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import formattedTime from 'minutes-seconds-milliseconds';
import {Container, Header, Title, Content,Card,CardItem} from 'native-base';

class StopWatch extends Component{
  constructor(props){
    super(props);
    this.state={
      timeElapsed:null,
      startTime:null,
      running:false,
      laps:[]
    };
  }
  render(){
    return (
      <Container>
      <Header>
      <Title>Just a simple StopWatch</Title>
      </Header>


    <View style={[styles.header]}> 

      <View style={[styles.timerWrapper]}>
        <TextNative style={styles.timer}>
          {formattedTime(this.state.timeElapsed)}
        </TextNative>
      </View>

      <View style={[styles.buttonWrapper]}> 
      {this.startStopButton()}
      {this.lapButton()}
      </View>

    </View>

    <View style={[styles.footer]}>
    
        {this.laps()}
    </View>

    </Container>);
  }

  laps(){
    return this.state.laps.map(function(time,index){
      return (
        <Card key={index}>
      <CardItem header>
      <TextNative>Lap #{index+1}</TextNative>
      </CardItem>
      <CardItem>
      <TextNative>{formattedTime(time)}</TextNative>
      </CardItem>
    </Card>
   );
    })
  }
  startStopButton(){
    var style = this.state.running ? styles.stopButton : styles.startButton;
    return (<TouchableHighlight 
    underlayColor='gray'
    onPress={this.handleStartPress.bind(this)}
    style={[style,styles.button]}
    >
        <TextNative>
          {this.state.running ? 'Stop' : 'Start'}
        </TextNative>
      </TouchableHighlight>);
  }
  lapButton(){
    return (<TouchableHighlight
    underlayColor='gray'
    onPress={this.handleLapPress.bind(this)}
    style={styles.button}>
        <TextNative>
          Lap
        </TextNative>
      </TouchableHighlight>);
  }
  border(color){
    return {
      borderColor:color,
      borderWidth:4
    }
  }
  handleStartPress(){
    if(!this.state.running){
    var startTime=new Date();

    this.setState({startTime:new Date()})

    this.interval=setInterval(
    ()=>{this.setState({
      timeElapsed:new Date()-this.state.startTime,
      running:true
    })}
    ,30);
    
    }else{
      clearInterval(this.interval);
      this.setState({running:false});
    }
  }
  handleLapPress(){
    var lap = this.state.timeElapsed;
    this.setState({startTime:new Date(),
      laps:this.state.laps.concat([lap])});
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'stretch'
  },
  header:{
    flex:1
  },
  footer:{
    flex:1,

  },
  timerWrapper:{
    flex:4,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonWrapper:{
    flex:3,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  timer:{
    fontSize:60
  },
  button:{
    borderWidth:2,
    height:100,
    width:100,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:50
  },
  startButton:{
    borderColor:'#00CC00'
  },
  stopButton:{
    borderColor:'#CC0000'
  },
  lap:{
    justifyContent:'space-around',
    flexDirection:'row'
  },
  lapText:{
    fontSize:30
  }
})

AppRegistry.registerComponent('stopwatch', () => StopWatch);
