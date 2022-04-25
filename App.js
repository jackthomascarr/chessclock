import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import ClockComponent from './clock';

export default function App() {
  const [started, setStarted] = useState(false);
  const [player1Active, togglePlayer1] = useState(false);
  const [player2Active, togglePlayer2] = useState(false);
  
  return (
    <SafeAreaView style={styles.container}>
      <ClockComponent
      startTime = "5:00"
      active={player1Active}
      color="white"
      >
      </ClockComponent>
      <ClockComponent
      startTime = "5:00"
      active={player2Active}
      color="black"
      >
      </ClockComponent>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
