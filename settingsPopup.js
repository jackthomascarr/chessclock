import React, {useState} from 'react';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';

const SettingsPage = ({visible, setVisible, whiteTime, setWhiteTime, blackTime, setBlackTime}) => {
    const [errors, setErrors] = useState([]);
    const [whiteInput, setWhiteInput] = useState(whiteTime)
    const [blackInput, setBlackInput] = useState(blackTime)
    const hideDialog = () => setVisible(false);
    const okayHandler = () => {
        validateTime(whiteTime, setWhiteTime)
        validateTime(blackTime, setBlackTime)

        if(errors.length == 0){
            setVisible(false);
        }
    }
    const validateTime = (time, setTime) => {
        try{
            const newTime = parseInt(time);
            setTime(newTime);
        }
        catch(err){
            errors.push("Failed to validate time! Make sure you are entering time in seconds!");
        }
    }

    return (
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <TextInput
          label="White Player Time (s)"
          value={whiteInput}
          onChangeText={text => setWhiteInput(text)}
         />
          <TextInput
          label="Black Player Time (s)"
          placeholder="Insert time in seconds"
          value={blackInput}
          onChangeText={text => setBlackInput(text)}
         />
        </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button onPress={() => okayHandler()}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );

}
export default SettingsPage;