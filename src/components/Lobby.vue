<template>
    <div id="lobby">
    <ion-item>
        <ion-label position="stacked">Player name</ion-label>
        <ion-input v-model="playerName"></ion-input>
    </ion-item>
    <ion-button @click="createGame">Create game</ion-button>
    <ion-item>
        <ion-label>Join existing game</ion-label>
    </ion-item>
    <ion-item>
        <ion-label position="stacked">Game name</ion-label>
        <ion-input v-model="gameName"></ion-input>
    </ion-item>
    <ion-button @click="joinGame">Join game</ion-button>
    </div>
</template>

<script lang="ts">
import { IonInput, IonLabel, IonItem, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import { RemoteGameSession } from '../services/remote-game-connector';
import generate from '@byffel/chasperli-box';

export default defineComponent({
  name: 'Lobby',
  components: {
    IonInput,
    IonLabel,
    IonItem,
    IonButton,
  },
  emits: ['session-created'],
  data() {
    return {
      gameName: "",
      playerName: "",
      session: {} as RemoteGameSession,
    };
  },
  mounted() {
    this.playerName = generate().dashed
  },
  methods: {
    createGame() {
      const gameName = generate().dashed
      this.session = RemoteGameSession.create(gameName, this.playerName);
      this.$emit("session-created", this.session);
    },
    joinGame() {
      this.session = RemoteGameSession.join(this.gameName, this.playerName);
      this.$emit("session-created", this.session);
    },
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
