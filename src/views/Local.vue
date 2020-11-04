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
        <div v-if="passValueEntered">
          <ion-item>
            <ion-label position="stacked">Values</ion-label>
            <ion-input v-model="passValue" type="text"></ion-input>
          </ion-item>
          <span v-if="validatePassValue" style="color: red"
            >PassValue invalid</span
          >
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
import { IonContent, IonPage, IonLabel, IonInput, IonItem } from '@ionic/vue';
import { defineComponent } from 'vue';
import Dice from '@/components/Dice.vue';
import { DiceModel } from '@/models/dice.model';
import { MeirGame } from '@/services/game.service';
import { MeirValueService } from '@/services/meir-value.service';
import { MeirValue } from '@/models/meir-value.enum';

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonPage,
    IonLabel,
    IonInput,
    IonItem,
    Dice
  },
  data() {
    return {
      gameState: new MeirGame(),
      passValueEntered: false,
      passValue: '' as string
    };
  },
  computed: {
    values(): DiceModel {
      return MeirValueService.toDiceModel(this.gameState.getValue());
    },
    displayDice(): boolean {
      return this.gameState.displayDice();
    }
  },
  methods: {
    roll() {
      this.gameState.roll();
    },
    peak() {
      this.gameState.peak();
    },
    pass() {
      if (this.passValueEntered && this.validatePassValue(this.passValue)) {
        this.passValueEntered = false;

        const key: number = +this.passValue
          .split('')
          .sort()
          .reverse()
          .join('');
        const passValue: MeirValue = MeirValueService.toMeirValue(key);

        this.gameState.pass(passValue);
      } else {
        this.passValueEntered = true;
      }
    },
    accuse() {
      this.gameState.accuse();
    },
    restart() {
      this.gameState.restart();
    },
    hasOperation(operation: string): boolean {
      return this.gameState.hasOperation(operation);
    },
    validatePassValue(input: string): boolean {
      if (input && !isNaN(+input) && input.length === 2) {
        return (
          input
            .split('')
            .map(v => +v)
            .filter(v => v >= 1 && v <= 6).length === 2
        );
      }

      return false;
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
