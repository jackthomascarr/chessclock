import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity,Button } from 'react-native';
import ClockComponent from './clock';
import { transform } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default function App() {
  const [started, setStarted] = useState(false);
  const [whitePlayer, setWhitePlayer] = useState(true);
  // white pieces clock will run when true
  // black pieces clock will run when false
  
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
      style={{flex: 1, width:"100%"}}
      onPress={() => setWhitePlayer(!whitePlayer)}>
      <ClockComponent
      style={
        {transform: [{rotate:'180deg'}],
      }}
      started={started}
      startTime = {300}
      active={whitePlayer}
      setActive={setWhitePlayer}
      >
      </ClockComponent>
      <ClockComponent
      style={
        {color:"black",
        backgroundColor: "black"
      }}
      startTime = {300}
      started = {started}
      active={!whitePlayer}
      setActive={setWhitePlayer}
      textColor="white"
      >
      </ClockComponent>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
