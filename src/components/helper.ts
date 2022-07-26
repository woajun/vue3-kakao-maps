/* global kakao */
interface LatLng {
  lat: number;
  lng: number;
}
function latlngToKakao({ lat, lng }: LatLng) {
  return new window.kakao.maps.LatLng(lat, lng);
}

export default { latlngToKakao };
