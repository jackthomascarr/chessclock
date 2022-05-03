import * as React from 'react';
import {useState} from 'react'
import { List, Text } from 'react-native-paper';
import { View, Image } from 'react-native';

const MyComponent = ({item}) => {
    const [open, setOpen] = useState(false);

    return(
    <List.Accordion key={item.id}
      title={new Date(item.id).toString()}
      left={props => <List.Icon {...props} icon="folder" />}>
     
     <View key={item.id}>
        <Text>White Player Name: {item.whitePlayer}</Text>
        <Text>Black Player Name: {item.blackPlayer}</Text>
        <Text>Location: {item.location}</Text>
        <Text>Winner: {item.winner}</Text>
        <Image
        style={{width: 150, height: 150}}
        source={{
          uri: item.picture
        }}
      />
     </View>
    </List.Accordion>
    )
};

export default MyComponent;