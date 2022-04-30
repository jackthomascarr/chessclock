import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import { List } from 'react-native-paper';


const GameList = () => {
  return(
  <List.Item
    player1="First Item"
    player2="Item description"
    left={props => <List.Icon {...props} icon="folder" />}
    />
  )
  }

export default GameList;