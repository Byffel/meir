<template>
  <die :value="calcFirstValue"></die>
  <die :value="calcSecondValue"></die>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DiceModel } from '@/models/dice.model';
import Die from '@/components/Die.vue';

export default defineComponent({
  name: 'Dice',
  components: {
    Die
  },
  data() {
    return {
      firstValue: 0 as number,
      secondValue: 0 as number
    };
  },
  props: {
    values: { type: DiceModel, required: true }
  },
  computed: {
    calcFirstValue(): number {
      const { value1, value2 } = this.values;
      return value1 > value2 ? value1 : value2;
    },
    calcSecondValue(): number {
      const { value1, value2 } = this.values;
      return value1 <= value2 ? value1 : value2;
    }
  }
});
</script>
