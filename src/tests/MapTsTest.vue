<script setup lang="ts">
import { ref } from 'vue';
import KakaoMapTs from '../components/KakaoMapTs';
import KakaoMarker from '../components/KakaoMarker.vue';

type LatLng = {lat:number, lng:number}
const center = ref({ lat: 37.566826, lng: 126.9786567 });

const seoulStation = ref({ lat: 37.566826, lng: 126.9786567 });
const seoulSquare = ref<LatLng>();
const myongDongStation = ref({ lat: 37.56095534459572, lng: 126.98628237923076 });
const gyongBockStation = ref({ lat: 37.57583309500656, lng: 126.97343097361679 });

function latlng(latlngs:any) {
  console.log(latlngs);
}

const bounds = ref<any>();
function boundsChange() {
  bounds.value = { sw: gyongBockStation, ne: myongDongStation };
}

const level = ref(4);
const minLevel = ref(1);
const maxLevel = ref(10);
const usePanTo = ref(true);
</script>

<template>
  <div>tests</div>
  <div id="map">
    <KakaoMapTs
      :center="center"
      :level="level"
      :min-level="minLevel"
      :max-level="maxLevel"
      :bounds="bounds"
      :use-pan-to="usePanTo"
      :control-position="'RIGHT'"
      @latlng="latlng"
    >
      <KakaoMarker :position="seoulSquare" />
      <KakaoMarker :position="myongDongStation" />
      <KakaoMarker :position="gyongBockStation" />
    </KakaoMapTs>
  </div>
  <div>
    지도테스트
    <br>
    boundsChange:
    <button @click="boundsChange">
      boundsChange
    </button>
    <br>
    <label>
      이동:
    </label>
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
    <label>
      Level:
      <input
        v-model="level"
        min="1"
        max="14"
        type="number"
      >
    </label>
    <br>
    <label>
      minLevel:
      <input
        v-model="minLevel"
        min="1"
        max="14"
        type="number"
      >
    </label>
    <br>
    <label>
      maxLevel:
      <input
        v-model="maxLevel"
        min="1"
        max="14"
        type="number"
      >
    </label>
    <br>
    <label>
      usePanTo:
      <input
        v-model="usePanTo"
        type="checkbox"
      >
    </label>
    <br>
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
