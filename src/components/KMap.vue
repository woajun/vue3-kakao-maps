<script setup lang="ts">
import {
  onMounted,
  ref,
  withDefaults,
  defineProps,
  defineEmits,
  watch,
  provide,
  type StyleValue,
} from 'vue';
/* global kakao */
const container = ref<HTMLElement>();
const map = ref<kakao.maps.Map | null>(null);
provide('kMap', map);

type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
interface Props {
  /** 맵의 중앙을 center에 위치시킨다. */
  center: { latitude: number; longitude: number };
  /** 지도의 확대 수준을 설정한다. 1~14 */
  level?: Level
  /**
   * 주어진 영역이 화면 안에 전부 나타날 수 있도록 지도의 중심 좌표와 확대 수준을 설정한다.
   * 주어진 영역외에 추가로 padding값을 지정할 수 있다.
   * *padding값을 지정하지 않으면 기본값으로 상하좌우 32가 적용된다.
   */
  bounds?:
    | kakao.maps.LatLngBounds
    | {
        bounds: kakao.maps.LatLngBounds;
        paddingTop: number;
        paddingRight: number;
        paddingBottom: number;
        paddingLeft: number;
      };
  style?: StyleValue;
  /** 지도의 최저 레벨 값을 설정한다.
   * 기본적으로 레벨 값이 작을수록 지도는 확대되는데
   * 이 설정한 레벨까지만 확대할 수 있게 된다. */
  minLevel?: Level;
  /** 지도의 최고 레벨 값을 설정한다.
   * 기본적으로 레벨 값이 클수록 지도는 축소되는데
   * 이 설정한 레벨까지만 축소할 수 있게 된다. */
  maxLevel?: Level;
  /**
   * center를 이동할 때 부드럽게 이동합니다.
   * 지도 화면보다 클 경우 애니메이션 없이 이동합니다.
   * 기본값은 true입니다.
   */
  useSmooth?: boolean;
  /** 컨트롤을 사용합니다. */
  useControl?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  level: 3,
  bounds: undefined,
  style: undefined,
  minLevel: 1,
  maxLevel: 14,
  useSmooth: true,
});

interface Emits {
  /** 클릭한 위치의 kakao.maps.LatLng 객체를 반환한다. */
  (e: 'getLatLng', latlng: kakao.maps.LatLng): void;
  /** 지도의 중심 좌표를 반환한다. */
  (e: 'getCenter', latlng: kakao.maps.LatLng): void;
  /** 지도의 확대 수준을 반환한다. */
  (e: 'getLevel', level: number): void;
}

const emit = defineEmits<Emits>();

watch(
  () => props.center,
  ({ latitude, longitude }) => {
    map.value?.setCenter(new window.kakao.maps.LatLng(latitude, longitude));
  },
);

function createMap() {
  if (!container.value) return;
  const aMap = new window.kakao.maps.Map(container.value, {
    center: new window.kakao.maps.LatLng(
      props.center.latitude,
      props.center.longitude,
    ),
    level: 3,
  });
  kakao.maps.event.addListener(
    aMap,
    'click',
    (e: kakao.maps.event.MouseEvent) => emit(
      'getLatLng',
      new window.kakao.maps.LatLng(e.latLng.getLat(), e.latLng.getLng()),
    ),
  );
  map.value = aMap;
}

const resizeObserver = new ResizeObserver(() => {
  map.value?.relayout();
});

onMounted(() => {
  if (!container.value) return;
  kakao.maps.load(createMap);
  resizeObserver.observe(container.value);
});
</script>
<template>
  <div
    id="map"
    ref="container"
    :style="props.style"
  />
  <slot :map="map" />
</template>
<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>
