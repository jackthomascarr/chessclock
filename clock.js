import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
// import Sound from 'react-native-sound';
// import ticking from './sounds/clockTicking.mp3';

const styles = {
    clockContainer: {
        flex:1,
        justifyContent:"center",
        alignItems: "center",
        textAlign:"center"
    },
    textStyles:{
        fontSize: "80px"
    }
}

const formatTime = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60
    const secondsString = seconds.toString().padStart('2', '0');

  
    return `${minutes}:${secondsString}`
  }

const ClockComponent = ({startTime, stage, setStage, textColor, active, setActive, style, key, setLoser, endGame, setEndedVisible}) => {
    let running = stage === "running"
 
    return(
    <View style = {[{...style}, styles.clockContainer]}>
        <CountdownCircleTimer
        key={key}
        isPlaying={active && running}
        duration={startTime}
        colors={["#3477eb", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 6, 3, 0]}
        onComplete={() => {endGame(); setLoser(key)}}
        >
        {({remainingTime, color }) => (
            <Text style={{ color, fontSize: 40 }}>
            {formatTime({remainingTime})}
            </Text>
        )}
    </CountdownCircleTimer>
    </View>
    
    )
}

export default ClockComponent;