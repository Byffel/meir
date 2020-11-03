<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Meir: Remote game</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div id="container">
        <ion-item>
          <ion-label position="stacked">Player name</ion-label>
          <ion-input :value="playerName"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Game name</ion-label>
          <ion-input :value="gameName"></ion-input>
        </ion-item>
        <ion-button @click="createNew">Create game</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonInput, IonLabel, IonItem, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import { RemoteGameSession } from '../services/remote-game-connector'

export default defineComponent({
  name: 'Lobby',
  components: {
    IonContent,
    IonPage,
    IonInput,
    IonLabel,
    IonItem,
    IonButton,
  },
  data() {
    return {
      gameName: "sauglatts-Büsi",
      playerName: "huere-Hanspeter",
    };
  },
  methods: {
    createNew() {
      const session: RemoteGameSession = new RemoteGameSession(true, this.gameName, this.playerName);
      console.log(session);
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
