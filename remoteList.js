
let remoteFunctions = {
/**
 * Loads from a remote url and updates the list with the specified values
 * @param {} url - The url to load data from
 */
loadRemoteList: async function(url) {
    try {

        let response = await fetch(url);
        console.log(response);
        let data = await response.json();

        return data;
    }
    catch (err) {
        console.log(err);
    }
},

 /**
   * Saves the list to database
   * @param {*} url - The url to save data to
   * @param {*} json - The json to send to the server
   */
  saveList: async function(url, json) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: json
    };

    try {
      await fetch(url, requestOptions);
    }
    catch (err) {
      console.log(err);
    }
  }
}

module.exports = remoteFunctions;