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
import helper from './helper';
/* global kakao */

interface LatLng {
  lat: number;
  lng: number;
}

interface LatLngBounds {
  /** 사각 영역에서 남서쪽 좌표 */
  sw: LatLng;
  /** 사각 영역에서 북동쪽 좌표 */
  ne: LatLng;
}

interface Props {
  /** 맵의 중앙을 center에 위치시킨다. */
  center: LatLng;
  /** 지도의 확대 수준을 설정한다. 1~14 */
  level?: number | string;
  /**
   * 주어진 영역이 화면 안에 전부 나타날 수 있도록 지도의 중심 좌표와 확대 수준을 설정한다.
   */
  bounds?: LatLngBounds
  style?: StyleValue;
  /** 지도의 최저 레벨 값을 1~14로 설정한다.
   * 기본적으로 레벨 값이 작을수록 지도는 확대되는데
   * 이 설정한 레벨까지만 확대할 수 있게 된다. */
  minLevel?: number | string;
  /** 지도의 최고 레벨 값을 1~14로 설정한다.
   * 기본적으로 레벨 값이 클수록 지도는 축소되는데
   * 이 설정한 레벨까지만 축소할 수 있게 된다. */
  maxLevel?: number | string;
  /**
   * center를 이동할 때 부드럽게 이동한다.
   * 지도 화면보다 클 경우 애니메이션 없이 이동한다.
   * (기본값: true)
   */
  usePanTo?: boolean;
  /** 컨트롤을 사용하고, 위치를 설정 한다. */
  controlPosition?: 'TOP'|'TOPLEFT'|'TOPRIGHT'|'LEFT'|'RIGHT'|'BOTTOM'|'BOTTOMLEFT'|'BOTTOMRIGHT';
  /** 마우스 드래그와 모바일 터치를 이용한 지도 이동 가능 여부를 설정한다. (기본값: true) */
  draggable?: boolean;
  /** 마우스 휠과 모바일 터치를 이용한 지도 확대, 축소 가능 여부를 설정한다.
  지도 객체 함수 호출을 통한 확대, 축소는 동작한다. (기본값: true) */
  zoomable?: boolean;
  /** 더블클릭 확대 가능 여부, (반응형을 지원하지 않는다. 기본값: true) */
  doubleClickZoom?: boolean;
  /** 키보드의 방향키와 +,-키로 지도 이동,확대,축소 가능여부를 설정한다. (기본값: false) */
  keyboardShortcuts?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  level: 3,
  bounds: undefined,
  style: undefined,
  minLevel: 1,
  maxLevel: 14,
  usePanTo: true,
  controlPosition: undefined,
  draggable: true,
  zoomable: true,
  doubleClickZoom: true,
  keyboardShortcuts: false,
});

interface Emits {
  /** 클릭한 위치의 kakao.maps.LatLng 객체를 반환한다. */
  (e: 'latlng', latlng: LatLng): void;
  /** 지도의 중심 좌표를 반환한다. */
  (e: 'center', latlng: LatLng): void;
  /** 지도의 확대 수준을 반환한다. */
  (e: 'level', level: number): void;
}

const emit = defineEmits<Emits>();

const container = ref<HTMLElement>();
const map = ref<kakao.maps.Map | null>(null);
provide('kakaoMap', map);

function createMap() {
  if (!container.value) return;
  const options: kakao.maps.MapOptions = {
    center: new kakao.maps.LatLng(
      props.center.lat,
      props.center.lng,
    ),
    level: Number(props.level),
    draggable: props.draggable,
    scrollwheel: props.zoomable,
    disableDoubleClickZoom: !props.doubleClickZoom,
    keyboardShortcuts: props.keyboardShortcuts,
  };
  const aMap = new kakao.maps.Map(container.value, options);

  aMap.setMinLevel(Number(props.minLevel));
  aMap.setMaxLevel(Number(props.maxLevel));

  if (props.controlPosition !== undefined) {
    aMap.addControl(
      new kakao.maps.ZoomControl(),
      kakao.maps.ControlPosition[props.controlPosition],
    );
  }

  kakao.maps.event.addListener(
    aMap,
    'click',
    (e: kakao.maps.event.MouseEvent) => emit(
      'latlng',
      { lat: e.latLng.getLat(), lng: e.latLng.getLng() },
    ),
  );
  map.value = aMap;
}

watch(
  () => props.center,
  ({ lat, lng }) => {
    if (props.usePanTo) {
      map.value?.panTo(new kakao.maps.LatLng(lat, lng));
    } else {
      map.value?.setCenter(new kakao.maps.LatLng(lat, lng));
    }
  },
);

watch(
  () => props.bounds,
  (newBounds) => {
    if ('sw' in newBounds) {
      const sw = helper.latlngToKakao(newBounds.sw);
      const ne = helper.latlngToKakao(newBounds.ne);
      const bounds = new kakao.maps.LatLngBounds(sw, ne);
      map.value?.setBounds(bounds);
    }
  },
);

watch(() => props.level, (newLevel) => {
  map.value?.setLevel(Number(newLevel));
});

watch(() => props.minLevel, (newMinLevel) => {
  map.value?.setMinLevel(Number(newMinLevel));
});

watch(() => props.maxLevel, (newMaxLevel) => {
  map.value?.setMaxLevel(Number(newMaxLevel));
});

watch(() => props.draggable, (newDraggable) => {
  map.value?.setDraggable(newDraggable);
});

watch(() => props.zoomable, (newZoomable) => {
  map.value?.setZoomable(newZoomable);
});

watch(() => props.keyboardShortcuts, (newKeyboardShortcuts) => {
  map.value?.setZoomable(newKeyboardShortcuts);
});

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
