import remoteFunctions from './remoteList'
import _ from 'lodash'


let listFunctions = {
    async updateItem(list, setList, key, newValues){
        let newList = _.cloneDeep(list);
        if(newList[key]){
            newList[key] = newValues;
            setList(newList);
    
            let json = JSON.stringify(newList);
    
            let baseUrl = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/savejson.php"
            let username = "chessApp"
    
            let url = new URL(baseUrl);
            url.searchParams.append("user", username)
    
            await remoteFunctions.saveList(url.toString(), json);
        }
    },
    async deleteItem(list, setList, key){
        let listCopy = _.cloneDeep(list);
        delete listCopy[key];

        setList(listCopy);

        let json = JSON.stringify(listCopy);

        let baseUrl = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/savejson.php"
        let username = "chessApp"

        let url = new URL(baseUrl);
        url.searchParams.append("user", username)

        await remoteFunctions.saveList(url.toString(), json);
    },

    async addItem(list, setList, item){
        let id = Date.now();
        item.id = id;

        let listCopy = _.cloneDeep(list);
        listCopy[id] = item;

        setList(listCopy);

        let json = JSON.stringify(listCopy);

        let baseUrl = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/savejson.php"
        let username = "chessApp"

        let url = new URL(baseUrl);
        url.searchParams.append("user", username)

        await remoteFunctions.saveList(url.toString(), json);
    },

    async loadList(setList){
        let baseUrl = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php"
        let username = "chessApp"
        let url = new URL(baseUrl);
        url.searchParams.append("user", username);

        let list = await remoteFunctions.loadRemoteList(url.toString())
        console.log(list);
        setList(list);
    }

}
module.exports = listFunctions;