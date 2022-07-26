<script setup lang="ts">
import { ref } from 'vue';
import KMap from '../components/KMap.vue';

const center = ref({ lat: 37.566826, lng: 126.9786567 });

const seoulStation = { lat: 37.566826, lng: 126.9786567 };
const myongDongStation = { lat: 37.56095534459572, lng: 126.98628237923076 };
const gyongBockStation = { lat: 37.57583309500656, lng: 126.97343097361679 };

function latlng(latlngs:any) {
  console.log(latlngs);
}

const bounds = ref<any>();
function boundsChange() {
  bounds.value = { sw: gyongBockStation, ne: myongDongStation };
}

const level = ref(3);
const minLevel = ref(1);
const maxLevel = ref(10);
const usePanTo = ref(true);
</script>

<template>
  <div>tests</div>
  <div id="map">
    <KMap
      :center="center"
      :level="level"
      :min-level="minLevel"
      :max-level="maxLevel"
      :bounds="bounds"
      :use-pan-to="usePanTo"
      :control-position="'RIGHT'"
      @latlng="latlng"
    />
  </div>
  <br>
  boundsChange:
  <button @click="boundsChange">
    boundsChange
  </button>
  <br>
  이동:
  <button @click="center = myongDongStation">
    명동역
  </button>
  <button @click="center = seoulStation">
    서울역
  </button>
  <button @click="center = gyongBockStation">
    경북궁역
  </button>
  <br>
  <label for="level">
    Level:
    <input
      id="level"
      v-model="level"
      min="1"
      max="14"
      type="number"
    >
  </label>
  <br>
  <label for="minLevel">
    minLevel:
    <input
      id="minLevel"
      v-model="minLevel"
      min="1"
      max="14"
      type="number"
    >
  </label>
  <br>
  <label for="maxLevel">
    maxLevel:
    <input
      id="maxLevel"
      v-model="maxLevel"
      min="1"
      max="14"
      type="number"
    >
  </label>
  <br>
  <label for="usePanTo">
    usePanTo:
    <input
      id="usePanTo"
      v-model="usePanTo"
      type="checkbox"
    >
  </label>
  <br>
</template>
<style scoped>
  #map {
    width: 500px;
    height: 300px;
  }
</style>
