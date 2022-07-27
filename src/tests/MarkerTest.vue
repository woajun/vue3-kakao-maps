<script setup lang="ts">
import { ref } from 'vue';
import KakaoMap from '../components/KakaoMap.vue';
import KakaoMarker from '../components/KakaoMarker.vue';

type LatLng = {lat:number, lng:number}

const center = ref<LatLng>({ lat: 37.566826, lng: 126.9786567 });
const seoulSquare = ref();
const myongDongStation = ref<LatLng>({ lat: 37.56095534459572, lng: 126.98628237923076 });
const gyongBockStation = ref<LatLng>({ lat: 37.57583309500656, lng: 126.97343097361679 });

</script>

<template>
  <div>tests</div>
  <div id="map">
    <KakaoMap
      :center="center"
    >
      <KakaoMarker :position="seoulSquare" />
      <KakaoMarker :position="myongDongStation" />
      <KakaoMarker :position="gyongBockStation" />
    </KakaoMap>
  </div>
  <hr>
  <div>
    마커테스트
    <br>
    서울광장 마커이동:
    <button @click="seoulSquare = {lat: 37.565684312790665, lng: 126.97794515385235}">
      서울광장
    </button>
    <button @click="seoulSquare = {lat: 37.56559360754466, lng: 126.97491172331469}">
      덕수궁
    </button>
    <button @click="seoulSquare = undefined">
      숨기기
    </button>
    <br>
  </div>
</template>
<style scoped>
  #map {
    width: 500px;
    height: 300px;
  }
</style>
