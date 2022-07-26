<script setup lang="ts">
import {
  defineProps, watch, ref, inject,
} from 'vue';
import type {
  Ref,
} from 'vue';
import helper from './helper';
/* global kakao */
interface Props {
  /** 마커의 좌표 */
  position?: { lat: number; lng: number };
  /** 마커의 이미지 */
  image?: {src: string, size: {width:number, height: number}};
  /** 마커 엘리먼트의 타이틀 속성 값 */
  title?: string;
  /** 드래그 가능한 마커, 로드뷰에 올릴 경우에는 유효하지 않다 */
  draggable?: boolean;
  /** 클릭 가능한 마커 */
  clickable?: boolean;
  /** 마커 엘리먼트의 z-index 속성 값 */
  zIndex?: number;
  /** 마커 투명도 (0-1) */
  opacity?: number;
  /** 로드뷰에 올라있는 마커의 높이 값(m 단위) */
//   altitude?: number;
  /** 로드뷰 상에서 마커의 가시반경(m 단위), 두 지점 사이의 거리가 지정한 값보다 멀어지면 마커는 로드뷰에서 보이지 않게 된다 */
//   range?: number;
}
const props = withDefaults(defineProps<Props>(), {
  position: undefined,
  image: undefined,
  title: undefined,
  draggable: false,
  clickable: true,
  zIndex: 1,
  opacity: 0,
//   altitude: undefined,
//   range: undefined,
});

const marker = ref<kakao.maps.Marker | null>(null);
const kakaoMap = inject<Ref<kakao.maps.Map | null>>('kakaoMap', ref(null));

watch(() => props.position, (newPosition) => {
  if (!newPosition) {
    marker.value?.setMap(null);
  } else {
    marker.value?.setPosition(helper.latlngToKakao(newPosition));
    marker.value?.setMap(kakaoMap.value);
  }
});

watch(
  () => kakaoMap.value,
  (newMap) => {
    if (!newMap) return;
    let initPosition;
    let initMap;
    if (props.position) {
      initPosition = helper.latlngToKakao(props.position);
      initMap = newMap;
    } else {
      initPosition = newMap.getCenter();
      initMap = undefined;
    }
    const newMarker = new window.kakao.maps.Marker({
      map: initMap,
      position: initPosition,
      image: props.image,
      title: props.title,
      draggable: props.draggable,
      clickable: props.clickable,
      zIndex: props.zIndex,
      opacity: props.opacity,
    });
    marker.value = newMarker;
  },
);

</script>
<template>
  <div ref="contents">
    <slot />
  </div>
</template>
