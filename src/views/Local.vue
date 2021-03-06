<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Meir</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div id="container">
        {{ localPassValue }}
        <!-- <div v-if="displayPassValue">{{ passValue }}</div> -->
        <div class="dices">
          <dice v-if="displayDice" :values="value"></dice>
        </div>
        <div v-if="passValueEntered">
          <ion-item>
            <ion-label position="stacked">Value</ion-label>
            <ion-input v-model="passValueInput" type="text"></ion-input>
          </ion-item>
          <span v-if="passValueInvalid" style="color: red"
            >PassValue invalid</span
          >
          <span v-if="passValueTooSmall" style="color: red"
            >PassValue is smaller than previous value!</span
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
        <div v-if="hasOperation('restart')">
          <div>{{ determineAccusationOutcome }}</div>
          <ion-button @click="restart()">restart</ion-button>
        </div>
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
      passValueInput: '' as string,
      passValueInvalid: false,
      passValueTooSmall: false,
      previousPassValue: 0,
      localPassValue: '' as string
    };
  },
  computed: {
    value(): DiceModel {
      return MeirValueService.toDiceModel(this.gameState.getValue());
    },
    passValue(): number {
      return MeirValueService.toNumber(this.gameState.getPassValue());
    },
    displayDice(): boolean {
      return this.gameState.displayDice();
    },
    displayPassValue(): boolean {
      return this.gameState.displayPassValue();
    },
    determineAccusationOutcome(): string {
      const theyLied: boolean =
        MeirValueService.compare(
          this.gameState.getValue(),
          this.gameState.getPassValue()
        ) < 0;

      return theyLied
        ? 'You are right. THEY LIED!'
        : 'You are wrong :( They were right...';
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
      if (this.passValueEntered) {
        if (this.validatePassValue(this.passValueInput)) {
          this.passValueInvalid = false;

          const key: number = +this.passValueInput
            .split('')
            .sort()
            .reverse()
            .join('');
          const passValue: MeirValue = MeirValueService.toMeirValue(key);

          if (this.isValueHigherThanPrevious(passValue)) {
            this.passValueTooSmall = false;
            this.passValueEntered = false;
            this.previousPassValue = passValue;
            this.localPassValue = this.passValueInput;
            this.gameState.pass(passValue);
          } else {
            this.passValueTooSmall = true;
          }
        } else {
          this.passValueTooSmall = false;
          this.passValueInvalid = true;
        }
      } else {
        this.passValueInput = '';
        this.passValueEntered = true;
      }
    },
    accuse() {
      this.gameState.accuse(this.gameState.getPassValue());
    },
    restart() {
      this.localPassValue = '';
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
    },
    isValueHigherThanPrevious(input: number): boolean {
      return input > this.previousPassValue ? true : false;
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
