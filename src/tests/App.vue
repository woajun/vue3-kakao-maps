<script setup lang="ts">
import { shallowRef } from 'vue';
import MapTest from './MapTest.vue';
import MapTsTest from './MapTsTest.vue';
import MarkerTest from './MarkerTest.vue';
import CustomOverlayTest from './CustomOverlayTest.vue';

const component = shallowRef(MapTsTest);
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
  <label>
    <input
      v-model="component"
      :value="MapTsTest"
      name="comp"
      type="radio"
    >
    Typescript
  </label>
  <component :is="component" />
</template>
