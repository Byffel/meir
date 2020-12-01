import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCdil-oD7wTqEsEDqYtY6pRlTiqk_ulEec",
    authDomain: "meir.firebaseapp.com",
    databaseURL: "https://byffel-meir.firebaseio.com/"
};

firebase.initializeApp(firebaseConfig)


export class RemoteGameSession {

    private database: firebase.database.Database;
    private playerName = "";
    private gameName = "";

    private constructor() {
        this.database = firebase.database();
    }

    static create(name: string, playerName: string) {
        // if game already exists return null
        const game = new this();
        game.database.ref("game/" + name).set({
            state: "lobby",
            currentPlayer: playerName
        });
        return this.join(name, playerName);
    }
    static join(name: string, playerName: string) {
        // if game does not exist return null
        const game = new this();
        game.playerName = playerName;
        game.gameName = name;
        game.database.ref("players/" + name).push({name: playerName});
        return game;
    }

    public getGameName(){
        return this.gameName;
    }

    public onNewPlayer(callback: (currentPlayers: string[]) => void) {
        const playerList = this.database.ref("players/" + this.gameName);
        playerList.on('child_added', () => {
            playerList.once('value', (snapshot) => {
                const playerNames = [] as string[];
                snapshot.forEach((playerEntry) => {
                    playerNames.push(playerEntry.val().name)
                    callback(playerNames);
                });
            });
        });
    }
}
