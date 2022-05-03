import * as React from 'react';
import { List, Portal, Text } from 'react-native-paper';
import ListItem from './ListItem'

const GameList = ({list, setList}) => {
    return(
        <Portal>
        <List.Section>
        <List.Accordion
            title="Uncontrolled Accordion"
            left={props => <List.Icon {...props} icon="folder" />}>
            <List.Item title="First item" />
            <List.Item title="Second item" />
        </List.Accordion>
            {Object.keys(list).map((key) => <ListItem item = {list[key]}></ListItem>)} 
        </List.Section>
        </Portal>
    )
}
export default GameList;