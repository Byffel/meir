<template>
  <die :value="values.value1"></die>
  <die :value="values.value2"></die>
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
  props: {
    values: { type: DiceModel, required: true }
  }
});
</script>
