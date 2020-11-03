import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/database";


export class RemoteGameSession {
    firebaseConfig = {
        apiKey: "AIzaSyCdil-oD7wTqEsEDqYtY6pRlTiqk_ulEec",
        authDomain: "meir.firebaseapp.com",
        databaseURL: "https://byffel-meir.firebaseio.com/"
    };

    private database: firebase.database.Database;
    constructor(createNew: boolean, name: string, playerName: string) {
        firebase.initializeApp(this.firebaseConfig);
        this.database = firebase.database();

        if (createNew) {
            this.database.ref("game/" + name).set({
                state: "lobby",
                currentPlayer: playerName
            });
            this.database.ref("players/" + name).set([]);
        }
        this.database.ref("players/" + name).push({name: playerName});
    }
}
