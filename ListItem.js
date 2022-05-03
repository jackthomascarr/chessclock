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
     
     <View>
        <Text>HELLO</Text>
        <Text>{item.blackPlayer}</Text>
     </View>
    </List.Accordion>
    )
};

export default MyComponent;