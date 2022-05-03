import * as React from 'react';
import {useState} from 'react'
import { Dialog, List, Portal, Text, Button } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import ListItem from './ListItem'

const GameList = ({list, setList, setStage}) => {
    const items = Object.keys(list).map((key) => <ListItem item = {list[key]}></ListItem>)
    const [visible, setVisible] = useState(true);
    return (
      <Portal>
        <Dialog visible={visible}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.ScrollArea>
          <ScrollView>{items}</ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={() => {setVisible(false); setStage("configuring")}}>Done</Button>
          </Dialog.Actions>
          <List.Section>
          
          </List.Section>
        </Dialog>
      </Portal>
    );
}
export default GameList;