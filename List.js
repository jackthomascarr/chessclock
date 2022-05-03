import * as React from 'react';
import { Dialog, List, Portal, Text, Button } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import ListItem from './ListItem'

const GameList = ({list, setList}) => {
    const items = Object.keys(list).map((key) => <ListItem item = {list[key]}></ListItem>)
    console.log(list);
    return (
      <Portal>
        <Dialog visible={true}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
          <ScrollView>{items}</ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress>Done</Button>
          </Dialog.Actions>
          <List.Section>
          
          </List.Section>
        </Dialog>
      </Portal>
    );
}
export default GameList;