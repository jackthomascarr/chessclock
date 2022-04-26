import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity,Button } from 'react-native';
import ClockComponent from './clock';
import { transform } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import SettingsPage from './settingsPopup';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  const [started, setStarted] = useState(false);
  const [whitePlayer, setWhitePlayer] = useState(true);
  const [settingsVisible, setSettingsVisible] = useState(true);
  const [whitePlayerTime, setWhitePlayerTime] = useState(300);
  const [blackPlayerTime, setBlackPlayerTime] = useState(300);
  // white clock will run when true
  // black clock will run when false
  
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{flex: 1, width:"100%"}}
        onPress={() => {setWhitePlayer(!whitePlayer); setStarted(true);}}
      >
          
        <ClockComponent
          style={
            {transform: [{rotate:'180deg'}],
          }}
          started={started}
          startTime = {300}
          active={whitePlayer}
          setActive={setWhitePlayer}
        ></ClockComponent>
        
        <PaperProvider>
          <SettingsPage
            visible={settingsVisible}
            setVisible={setSettingsVisible}
            whiteTime={whitePlayerTime}
            setWhiteTime={setWhitePlayerTime}
            blackPlayerTime={blackPlayerTime}
            setBlackPlayerTime={setBlackPlayerTime}
          ></SettingsPage>
        </PaperProvider>
        
        <ClockComponent
          style={{
            color:"black",
            backgroundColor: "black"
          }}
          startTime = {300}
          started = {started}
          active={!whitePlayer}
          setActive={setWhitePlayer}
          textColor="white"
        ></ClockComponent>
      
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
