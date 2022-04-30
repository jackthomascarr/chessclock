import Geocoder from 'react-native-geocoding';
import * as Location from 'expo-location';

let listFunctions = {
    updateItem(list, setList, key, newValues){
        let newList = [...list];
        newList[key] = newValues;
        setList(newList);
    },
    deleteItem(list, setList, key){

    },

    addItem(list, setList, item){
        let id = Date.now();

    },

    saveToFile(list, outputDir){

    },
    loadList(setList, listDir){

    }

}
module.exports = listFunctions;