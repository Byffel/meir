<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Meir</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      {{ gameState }}
      <div id="container">
        <div class="dices">
          <dice v-if="displayDice" :values="values"></dice>
        </div>
        <ion-button v-if="hasOperation('roll')" @click="roll()"
          >roll</ion-button
        >
        <ion-button v-if="hasOperation('peak')" @click="peak()"
          >peak</ion-button
        >
        <ion-button v-if="hasOperation('pass')" @click="pass()"
          >pass</ion-button
        >
        <ion-button v-if="hasOperation('accuse')" @click="accuse()"
          >du lügsch!</ion-button
        >
        <ion-button v-if="hasOperation('restart')" @click="restart()"
          >restart</ion-button
        >
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import Dice from '@/components/Dice.vue';
import { DiceModel } from '@/models/dice.model';
import { MeirGame } from '@/services/game.service';

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonPage,
    Dice
  },
  data() {
    return {
      gameState: new MeirGame()
    };
  },
  computed: {
    values(): DiceModel {
      return this.gameState.getValues();
    },
    displayDice(): boolean {
      return this.gameState.displayDice();
    }
  },
  methods: {
    roll() {
      // const result = new DiceModel(this.getRandomInt(6), this.getRandomInt(6));
      // this.values = result;
      this.gameState.roll();
    },
    peak() {
      this.gameState.peak();
    },
    pass() {
      this.gameState.pass();
    },
    accuse() {
      this.gameState.accuse();
    },
    restart() {
      this.gameState.restart();
    },
    hasOperation(operation: string): boolean {
      return this.gameState.hasOperation(operation);
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
