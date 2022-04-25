import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const styles = {

}
const ClockComponent = ({startTime, active, color}) => {
    return(
    <View styles = {{backgroundColor: color}}>
        <Text>{startTime}</Text>
    </View>
    
    )
}

export default ClockComponent;