import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import ClockComponent from './clock';
import { transform } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import SettingsPage from './settingsPopup';
import { Provider as PaperProvider, Button, Appbar } from 'react-native-paper';
import { Icon, mdiCogOutline } from 'react-native-vector-icons/MaterialCommunityIcons'

export default function App() {
  const [started, setStarted] = useState(false);
  const [whitePlayer, setWhitePlayer] = useState(true);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [whitePlayerTime, setWhitePlayerTime] = useState(600);
  const [blackPlayerTime, setBlackPlayerTime] = useState(600);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bar:{
      backgroundColor: '#3477eb'
    }
  });
  // white clock will run when true
  // black clock will run when false

  const MiddleBar = () => { return started ? 
  <Button style={styles.bar} icon="stop" mode="contained" onPress={() => setStarted(false)}>
    End Game
  </Button> :
  <Appbar.Header style={styles.bar}>
  <Appbar.Action icon="filter-variant"></Appbar.Action>
  <Appbar.Content title="Chessclock++"/>
  <Appbar.Action icon="cog" onPress={() => setSettingsVisible(true)}/>
  </Appbar.Header>;}

  return (
    <PaperProvider>
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
          startTime = {whitePlayerTime}
          active={whitePlayer}
          setActive={setWhitePlayer}
        ></ClockComponent>


          <MiddleBar></MiddleBar>
          
          <SettingsPage
            visible={settingsVisible}
            setVisible={setSettingsVisible}
            whiteTime={whitePlayerTime}
            setWhiteTime={setWhitePlayerTime}
            blackTime={blackPlayerTime}
            setBlackTime={setBlackPlayerTime}
          ></SettingsPage>
        <ClockComponent
          style={{
            color:"black",
            backgroundColor: "black"
          }}
          started = {started}
          startTime = {blackPlayerTime}
          active={!whitePlayer}
          setActive={setWhitePlayer}
          textColor="white"
        ></ClockComponent>
        </TouchableOpacity>
    </SafeAreaView>
    </PaperProvider>
  );
}


