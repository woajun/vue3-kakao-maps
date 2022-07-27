<script setup lang="ts">
import { ref } from 'vue';
import KakaoMap from '../components/KakaoMap.vue';
import KakaoCustomOverlay from '../components/KakaoCustomOverlay.vue';
</script>

<template>
  <div>tests</div>
  <div id="map">
    <KakaoMap :center="{ lat: 37.566826, lng: 126.9786567 }">
      <KakaoCustomOverlay :position="{ lat: 37.566826, lng: 126.9786567 }">
        <div class="overlaybox">
          <div class="boxtitle">
            금주 영화순위
          </div>
          <div class="first">
            <div class="triangle text">
              1
            </div>
            <div class="movietitle text">
              드래곤 길들이기2
            </div>
          </div>
          <ul>
            <li class="up">
              <span class="number">2</span>
              <span class="title">명량</span>
              <span class="arrow up" />
              <span class="count">2</span>
            </li>
            <li>
              <span class="number">3</span>
              <span class="title">해적(바다로 간 산적)</span>
              <span class="arrow up" />
              <span class="count">6</span>
            </li>
            <li>
              <span class="number">4</span>
              <span class="title">해무</span>
              <span class="arrow up" />
              <span class="count">3</span>
            </li>
            <li>
              <span class="number">5</span>
              <span class="title">안녕, 헤이즐</span>
              <span class="arrow down" />
              <span class="count">1</span>
            </li>
          </ul>
        </div>
      </KakaoCustomOverlay>
    </KakaoMap>
  </div>
</template>
<style scoped>
#map {
  width: 700px;
  height: 700px;
}
.overlaybox {
  position: relative;
  width: 360px;
  height: 350px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/box_movie.png")
    no-repeat;
  padding: 15px 10px;
}
.overlaybox div,
ul {
  overflow: hidden;
  margin: 0;
  padding: 0;
}
.overlaybox li {
  list-style: none;
}
.overlaybox .boxtitle {
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png")
    no-repeat right 120px center;
  margin-bottom: 8px;
}
.overlaybox .first {
  position: relative;
  width: 247px;
  height: 136px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumb.png")
    no-repeat;
  margin-bottom: 8px;
}
.first .text {
  color: #fff;
  font-weight: bold;
}
.first .triangle {
  position: absolute;
  width: 48px;
  height: 48px;
  top: 0;
  left: 0;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/triangle.png")
    no-repeat;
  padding: 6px;
  font-size: 18px;
}
.first .movietitle {
  position: absolute;
  width: 100%;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  padding: 7px 15px;
  font-size: 14px;
}
.overlaybox ul {
  width: 247px;
}
.overlaybox li {
  position: relative;
  margin-bottom: 2px;
  background: #2b2d36;
  padding: 5px 10px;
  color: #aaabaf;
  line-height: 1;
}
.overlaybox li span {
  display: inline-block;
}
.overlaybox li .number {
  font-size: 16px;
  font-weight: bold;
}
.overlaybox li .title {
  font-size: 13px;
}
.overlaybox ul .arrow {
  position: absolute;
  margin-top: 8px;
  right: 25px;
  width: 5px;
  height: 3px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/updown.png")
    no-repeat;
}
.overlaybox li .up {
  background-position: 0 -40px;
}
.overlaybox li .down {
  background-position: 0 -60px;
}
.overlaybox li .count {
  position: absolute;
  margin-top: 5px;
  right: 15px;
  font-size: 10px;
}
.overlaybox li:hover {
  color: #fff;
  background: #d24545;
}
.overlaybox li:hover .up {
  background-position: 0 0px;
}
.overlaybox li:hover .down {
  background-position: 0 -20px;
}
</style>
