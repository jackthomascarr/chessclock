import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { 
  Button,
  Dialog,
  Portal,
  TextInput,
  Checkbox,
  Text,
  Title,
  Divider,
} from "react-native-paper";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const SettingsPage = ({
  visible,
  setVisible,
  whiteTime,
  setWhiteTime,
  blackTime,
  setBlackTime,
}) => {
  const [errors, setErrors] = useState([]);
  const [whiteInput, setWhiteInput] = useState(`${whiteTime}`);
  const [blackInput, setBlackInput] = useState(`${blackTime}`);
  const [handiCap, setHandiCap] = useState(false);

  const styles = StyleSheet.create({
    textInput: {
      marginBottom: 5,
    },
    checkBoxView: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    title: {
      textAlign: "center",
      paddingBottom: 25,
      marginTop: 0,
    },
  });

  let blackInputVisible = handiCap ? {} : { display: "none" };
  let inputTitle = handiCap ? "White Player Time (s)" : "Player Times (s)";

  const hideDialog = () => setVisible(false);
  const okayHandler = () => {
    let errors = [];
    let blackInputCopy = blackInput;
    if (!handiCap) {
      blackInputCopy = whiteInput;
    }

    validateTime(whiteInput, setWhiteTime, errors);
    validateTime(blackInputCopy, setBlackTime, errors);

    if (errors.length == 0) {
      setVisible(false);
    }
  };
  const validateTime = (time, setTime, errors) => {
    try {
      const newTime = parseInt(time);
      setTime(newTime);
    } catch (err) {
      console.log(err);
      let error = "Failed to validate time!";
      errors.push(error);
    }
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Title style={styles.title}>Game Configuration</Title>
          <View>
            <TextInput
              style={styles.textInput}
              label={inputTitle}
              placeholder="Insert time in seconds"
              value={whiteInput}
              onChangeText={(text) => setWhiteInput(text)}
            />
            <TextInput
              style={[blackInputVisible, styles.textInput]}
              label="Black Player Time (s)"
              placeholder="Insert time in seconds"
              disabled={!handiCap}
              value={blackInput}
              onChangeText={(text) => setBlackInput(text)}
            />
            <View style={styles.checkBoxView}>
              <Checkbox.Item
                color="#3477eb"
                style={styles.checkBoxView}
                label="Allow Handicap"
                status={handiCap ? "checked" : "unchecked"}
                onPress={() => {
                  setHandiCap(!handiCap);
                }}
              />
            </View>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)}>Cancel</Button>
          <Button onPress={() => okayHandler()}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
export default SettingsPage;
