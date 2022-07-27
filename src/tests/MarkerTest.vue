<script setup lang="ts">
import { ref } from 'vue';
import KakaoMap from '../components/KakaoMap.vue';
import KakaoMarker from '../components/KakaoMarker.vue';

type LatLng = {lat:number, lng:number}
const myongDongStation = ref<LatLng>({ lat: 37.56095534459572, lng: 126.98628237923076 });
const gyongBockStation = ref<LatLng>({ lat: 37.57583309500656, lng: 126.97343097361679 });

const center = ref<LatLng>({ lat: 37.566826, lng: 126.9786567 });
const seoulSquare = { lat: 37.565684312790665, lng: 126.97794515385235 };
const deoksugung = { lat: 37.56559360754466, lng: 126.97491172331469 };
const position = ref<LatLng|undefined>(seoulSquare);

const title = ref('서울광장');
const draggable = ref(false);
const clickable = ref(true);
const zIndex = ref(1);
const opacity = ref(1);

function mapClick() {
  console.log('clickable Test');
}
</script>

<template>
  <div>tests</div>
  <div id="map">
    <KakaoMap
      :center="center"
      @latlng="mapClick"
    >
      <KakaoMarker
        :position="position"
        :title="title"
        :draggable="draggable"
        :clickable="clickable"
        :z-index="zIndex"
        :opacity="opacity"
      />
    </KakaoMap>
  </div>
  <hr>
  <div>
    마커테스트
    <br>
    서울광장 마커이동:
    <button @click="position = seoulSquare">
      서울광장
    </button>
    <button @click="position = deoksugung">
      덕수궁
    </button>
    <button @click="position = undefined">
      숨기기
    </button>
    <br>
    <label>
      title:
      <input
        v-model="title"
        type="text"
      >
    </label>
    <br>
    <label>
      draggable:
      <input
        v-model="draggable"
        type="checkbox"
      >
    </label>
    <br>
    <label>
      clickable:
      <input
        v-model="clickable"
        type="checkbox"
      >
    </label>
    <br>
    <label>
      zIndex:
      <input
        v-model="zIndex"
        type="number"
      >
    </label>
    <br>
    <label>
      opacity:
      <input
        v-model="opacity"
        type="number"
        max="1"
        min="0"
        step="0.1"
      >
    </label>
  </div>
</template>
<style scoped>
  #map {
    width: 500px;
    height: 300px;
  }
</style>
