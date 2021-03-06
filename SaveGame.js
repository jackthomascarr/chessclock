import * as React from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView, Image} from "react-native";
import {
  List,
  Portal,
  Dialog,
  Button,
  Title,
  Text,
  RadioButton,
  Divider,
  Checkbox,
  TextInput,
} from "react-native-paper";
import { useState } from "react";
import listFunctions from "./listDataStructure";
import geoLocation from './geolocation'
import CameraApp from "./Camera";

const SaveGame = ({ list, setList, loser, setStage, whiteTime, blackTime }) => {
  const [gameData, setGameData] = useState({});
  const [formState, setFormState] = useState({loser: "White"});
  const [visible, setVisible] = useState(true);
  const [whitePlayerName, setWhitePlayerName] = useState("");
  const [blackPlayerName, setBlackPlayerName] = useState("");
  const [saveLocation, setSaveLocation] = useState(true);
  const [showCamera, setCamera] = useState(false);

  const styles = StyleSheet.create({
    radioView: {
      display: "flex",
      flexDirection: "row",
      marginLeft: 0,
    },
    centerTitle: {
      marginBottom: 25,
      paddingTop: 25,
      textAlign: "center",
    },
    textGroup: {
      marginBottom: 10,
    },
  });

  const modifyLoser = (value) => {
    let formCopy = { ...formState };
    let dataCopy = { ...gameData };

    formCopy.loser = value;
    dataCopy.loser = parseInt(value);

    setGameData(dataCopy);
    setFormState(formCopy);
  };

  const LoserForm = () => {
    return loser === null ? (
      <RadioButton.Group
        onValueChange={(newValue) => modifyLoser(newValue)}
        value={formState.loser}
      >
        <Title>Who won?</Title>
        <View style={styles.radioView}>
          <RadioButton.Item
            label="White"
            value="White"
            color={"#3477eb"}
            mode="android"
          />
          <RadioButton.Item
            label="Black"
            value="Black"
            color={"#3477eb"}
            mode="android"
          />
        </View>
      </RadioButton.Group>
    ) : (
      <></>
    );
  };

  const cancel = () => {
    setVisible(false);
    setStage("configuring");
  };


  const PreviewImage = () => {
    return gameData.photo ? (
      <Image
        source={{ uri: gameData.photo }}
        style={{ height: 100}}
      ></Image>
    ) : (
      <></>
    );
  };

  const saveForm = async () => {
    let item = {
      blackPlayer: blackPlayerName,
      whitePlayer: whitePlayerName,
      location: "",
      picture: null,
      whitePlayerTime: whiteTime,
      blackPlayerTime:blackTime,
      winner: gameData.loser

    }
    if(saveLocation){
      item.location = await geoLocation.getCurrentLocation()
    }

    if(gameData.photo){
      item.picture = gameData.photo
    }
    if(!gameData.loser){
      item.winner = loser % 2 ? "Black" : "White";
    }
    setStage("configuring")

    listFunctions.addItem(list, setList, item)
  }

  return ( !showCamera ? <Portal>
  <Dialog
    visible={true}
    onDismiss={() => {
      setVisible(false);
      setStage("configuring")
    }}
  >
    <Dialog.ScrollArea>
      <Title style={styles.centerTitle}>Save Game</Title>
      <Divider></Divider>
      <ScrollView>
        <View>
          <View style={[styles.textGroup, { marginTop: 5 }]}>
            <Text>White Player Name</Text>
            <TextInput
              onChangeText={value => setWhitePlayerName(value)}
              value={whitePlayerName}
            ></TextInput>
          </View>
          <View style={styles.textGroup}>
            <Text>Black Player Name</Text>
            <TextInput
              value={blackPlayerName}
              onChangeText={(text) => {setBlackPlayerName(text)}}
            ></TextInput>
            <Divider></Divider>
            <LoserForm></LoserForm>
            </View>

            <Checkbox.Item
              label="Save Location"
              status={saveLocation ? "checked" : "unchecked"}
              mode="android"
              color={"#3477eb"}
              onPress={() => {
                setSaveLocation(!saveLocation);
              }}
            />

            <Button
              onPress={() => {
                setCamera(true);
              }}
            >
              Take a Picture!
            </Button>
            <PreviewImage></PreviewImage>
          </View>
      </ScrollView>
    </Dialog.ScrollArea>
    <Dialog.Actions>
      <Button
        onPress={() => {
          cancel();
        }}
      >
        Cancel
      </Button>
      <Button onPress={async () => {await saveForm()}}>Save Game</Button>
    </Dialog.Actions>
  </Dialog>
  </Portal> :

  <CameraApp
        saveData={gameData}
        setSaveData={setGameData}
        cameraVisible={showCamera}
        setCamera={setCamera}
        ></CameraApp>);
};

export default SaveGame;
