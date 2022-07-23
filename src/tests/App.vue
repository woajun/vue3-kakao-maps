<script setup lang="ts">
import { ref } from 'vue';
import KMap from '../components/KMap.vue';

const center = ref({ latitude: 37.566826, longitude: 126.9786567 });
</script>

<template>
  <div>tests</div>
  <div id="map">
    <KMap
      :center="center"
      :style="{
        height: '100vh',
        position: 'fixed',
        'padding-left': '480px',
      }"
    />
  </div>
</template>
<style scoped>
  #map {
    width: 500px;
    height: 500px;
  }
</style>
