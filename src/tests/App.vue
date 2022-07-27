<script setup lang="ts">
import { shallowRef } from 'vue';
import MapTest from './MapTest.vue';
import MarkerTest from './MarkerTest.vue';

const component = shallowRef();
</script>
<template>
  <label>
    <input
      v-model="component"
      :value="MapTest"
      name="pizza"
      type="radio"
    >
    Map Test
  </label>
  <label>
    <input
      v-model="component"
      :value="MarkerTest"
      name="pizza"
      type="radio"
    >
    Marker Test
  </label>
  <component :is="component" />
</template>
