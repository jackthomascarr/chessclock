import Geocoder from 'react-native-geocoding'
import * as Location from 'expo-location';

Geocoder.init("AIzaSyDqW8jK0xxnIRKTKXACxIK-q3UerQTiCsA");
let geoLocation = {

    /**
     * Retrieves a location specified by the given string
     * @param {*} location - string to find location of
     * @returns - Location of place
     */
    getLocation: async function (location) {
        let foundLocation = null;
        try {
            // Runs name through geocoder
            const response = await Geocoder.from(location);
            
            // Returns the first response
            foundLocation = response.results[0].geometry.location
        }
        catch (err) {
            console.log(err);
        }
        return foundLocation;
    },

    /**
     * Retrieves the current location of the user.
     * @returns - Current location
     */
    getCurrentLocation: async function () {
        // Asks user for permission
        let { status } = await Location.requestForegroundPermissionsAsync();
        let locationResult = null;

        if (status !== 'granted') {
            console.log('Permission to access location was denied');

        } else {
            locationResult = ""
            try {
                // Retrieves position if granted
                let foundLocation = await Location.getCurrentPositionAsync();
                const [latitude, longitude] = [foundLocation.coords.latitude, foundLocation.coords.longitude];
                let locationInfo = await Geocoder.from(latitude, longitude);
                let city = locationInfo.results[0].address_components[3].long_name;
                let state = locationInfo.results[0].address_components[5].short_name;
                let country = locationInfo.results[0].address_components[6].long_name;

                locationResult = `${city} ${state}, ${country}`
            }
            catch(err){
                console.log("Error occured reading location!" + err);
            }
        }
        return locationResult;
    }
}

module.exports = geoLocation;