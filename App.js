import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import ClockComponent from './clock';
import { transform } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import SettingsPage from './settingsPopup';
import { Provider as PaperProvider, Button, Appbar, Text, Portal, Dialog, Title } from 'react-native-paper';
import { Icon, mdiCogOutline } from 'react-native-vector-icons/MaterialCommunityIcons'

export default function App() {
  const [stage, setStage] = useState("configuring");
  const [savedConfiguration, setSavedConfiguration] = useState(null);
  const [whitePlayer, setWhitePlayer] = useState(true);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [whitePlayerTime, setWhitePlayerTime] = useState(600);
  const [blackPlayerTime, setBlackPlayerTime] = useState(600);
  const [endedVisible, setEndedVisible] = useState(false);
  const [clockKey, setClockKey] = useState([0, 1]);


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

  const resetGame = () =>{
    if(savedConfiguration !== null){
      setWhitePlayerTime(savedConfiguration.whiteTime)
      setBlackPlayerTime(savedConfiguration.blackTime)
    }
    setSavedConfiguration(null);
    setEndedVisible(false);
    setStage("configuring")
    let whiteKey = clockKey[0] + 2;
    let blackKey = clockKey[1] + 2;

    let newArr = [whiteKey, blackKey]

    setClockKey(newArr);
  }
  const startClock = () => {
    if(savedConfiguration === null){
      let configuration = {
        blackTime : blackPlayerTime,
        whiteTime: whitePlayerTime
      };
    
      setSavedConfiguration(configuration);
    }
    let setPlayer = stage !== "paused" ? !whitePlayer : whitePlayer;
    setWhitePlayer(setPlayer);
    setStage("running");
  }

  const MiddleBar = () => { 
    switch(stage){
      case "running":
        return <Button style={styles.bar} icon="stop" mode="contained" onPress={() => setStage("paused")}>
        Pause Game
      </Button>
      case "paused":
        return <Button style={styles.bar} icon="stop" mode="contained" onPress={() => {setStage("ended"); setEndedVisible(true)}}>
        End Game, (Press on screen to resume)
        </Button>
      case "ended":
        return <Portal>
        <Dialog visible={endedVisible} onDismiss={() => resetGame()}>
          <Dialog.Content>
            <Title style={styles.title}>Save Game</Title>
            <Text>Press save if you want to save the game</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => {resetGame()}}>Restart</Button>
            <Button onPress={() => {}}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      case "configuring":
      return  <Appbar.Header style={styles.bar}>
        <Appbar.Action icon="filter-variant"></Appbar.Action>
        <Appbar.Content title="Chessclock++"/>
        <Appbar.Action icon="cog" onPress={() => setSettingsVisible(true)}/>
        </Appbar.Header>;}
  }

  return (
    <PaperProvider>
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{flex: 1, width:"100%"}}
        onPress={() => startClock()}
      >
        <ClockComponent
          style={
            {transform: [{rotate:'180deg'}],
          }}
          stage={stage}
          startTime = {whitePlayerTime}
          active={whitePlayer}
          setActive={setWhitePlayer}
          key={clockKey[0]}
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
          stage = {stage}
          startTime = {blackPlayerTime}
          active={!whitePlayer}
          setActive={setWhitePlayer}
          textColor="white"
          key={clockKey[1]}
        ></ClockComponent>
        </TouchableOpacity>
    </SafeAreaView>
    </PaperProvider>
  );
}



