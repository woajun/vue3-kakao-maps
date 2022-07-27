<script setup lang="ts">
import {
  inject, ref, watch, type Ref,
} from 'vue';
import helper from './helper';
/* global kakao */

interface Props {
    position?: {lat:number; lng: number};
}

const props = defineProps<Props>();

const kakaoMap = inject<Ref<kakao.maps.Map | null>>('kakaoMap', ref(null));
const content = ref<HTMLDivElement| null>(null);

watch(
  () => kakaoMap.value,
  (newMap) => {
    if (!newMap || !content.value) return;
    let initPosition;
    if (props.position) {
      initPosition = helper.latlngToKakao(props.position);
    } else {
      initPosition = newMap.getCenter();
    }
    const newOverlay = new window.kakao.maps.CustomOverlay({
      position: initPosition,
      content: content.value,
      xAnchor: 0.3,
      yAnchor: 0.91,
    });
    newOverlay.setMap(newMap);
  },
);
</script>
<template>
  <div ref="content">
    <slot />
  </div>
</template>
