<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Meir: Remote game</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div id="container">
        <Lobby v-if="!hasSession" @session-created="setSession"/>
        <div v-else>
          <p>GAME NAME: {{session.getGameName()}}</p>
          <p>Waiting for otters to join...</p>
          <iframe src="https://giphy.com/embed/tQAApm4PMOpiM" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
          <p>Already joined:</p>
          {{ playerListStr }}
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import { RemoteGameSession } from '../services/remote-game-connector';
import Lobby from '../components/Lobby.vue'

export default defineComponent({
  name: 'RemoteGame',
  components: {
    IonContent,
    IonPage,
    Lobby,
  },
  data() {
    return {
      session: {} as RemoteGameSession,
      hasSession: false as boolean,
      playerList: [] as string[]
    };
  },
  computed: {
    playerListStr(): string {
      return this.playerList.join(', ')
    }
  },
  methods: {
    newPlayerAdded(playerList: string[]) {
      this.playerList = playerList;
    },
    setSession(session: RemoteGameSession) {
      this.session = session;
      this.hasSession = true;
      this.session.onNewPlayer(this.newPlayerAdded);
    }
  }
});
</script>

<style lang="scss" scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
