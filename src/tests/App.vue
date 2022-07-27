<script setup lang="ts">
import { shallowRef } from 'vue';
import MapTest from './MapTest.vue';
import MarkerTest from './MarkerTest.vue';
import CustomOverlayTest from './CustomOverlayTest.vue';

const component = shallowRef(CustomOverlayTest);
</script>
<template>
  <label>
    <input
      v-model="component"
      :value="MapTest"
      name="comp"
      type="radio"
    >
    Map Test
  </label>
  <label>
    <input
      v-model="component"
      :value="MarkerTest"
      name="comp"
      type="radio"
    >
    Marker Test
  </label>
  <label>
    <input
      v-model="component"
      :value="CustomOverlayTest"
      name="comp"
      type="radio"
    >
    CustomOverlay Test
  </label>
  <component :is="component" />
</template>
