<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Meir</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div id="container">
        <div class="dices">
          <dice :values="values"></dice>
        </div>
        <ion-button @click="getValues()">roll the dices</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import Dice from '@/components/Dice.vue';
import { DiceModel } from '@/models/dice.model';

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonPage,
    Dice
  },
  data() {
    return {
      values: new DiceModel(5, 3)
    };
  },
  methods: {
    getValues() {
      const result = new DiceModel(this.getRandomInt(6), this.getRandomInt(6));
      this.values = result;
    },
    getRandomInt(max: number) {
      return Math.floor(Math.random() * Math.floor(max)) + 1;
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
