<template>
  {{ value }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Die',
  props: {
    value: Number
  }
});
</script>
