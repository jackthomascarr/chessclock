import * as React from 'react';
import {useState} from 'react'
import { List } from 'react-native-paper';

const MyComponent = ({item}) => {
    const [open, setOpen] = useState(false);

    return(
    <List.Accordion
      title={new Date(item.id).toString()}
      
      left={props => <List.Icon {...props} icon="folder" />}>
     <View>
        <p>{item.whitePlayer}</p>
        <p>{item.blackPlayer}</p>
     </View>
    </List.Accordion>
    )
};

export default MyComponent;