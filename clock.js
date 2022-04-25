import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

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

const ClockComponent = ({startTime, started, textColor, active, setActive, style}) => {
    const [isPlaying, setIsPlaying] = useState(active && started);
    const remainingTime = startTime;

    return(
    <View style = {[{...style}, styles.clockContainer]}>
        <CountdownCircleTimer
        isPlaying={active}
        duration={remainingTime}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 6, 3, 0]}
        onComplete={() => ({ shouldRepeat: true, delay: 2 })}
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