<template>
  <img class="die" :src="getImageUrl" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Die',
  props: {
    value: Number
  },
  computed: {
    getImageUrl(): string {
      return `assets/images/dice/${this.value}.png`;
    }
  }
});
</script>

<style lang="scss" scoped>
.die {
  margin: 1rem;
}
</style>
