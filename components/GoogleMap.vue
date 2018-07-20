<template>
<div ref='map' class='map'>
  <div ref='infoWindow'>
    <slot name='infoWindow'></slot>
  </div>
</div>
</template>

<script>
/* global alert */
/* global google */

export default {
  props: {
    apiKey: String,
    zoom: {
      type: Number,
      default: 15,
    },
    center: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      client: null,
    };
  },
  created() {},
  mounted() {
    // create the map, marker and infoWindow after the component has
    // been rendered because we need to manipulate the DOM for Google =(
    this.map = this.createMap();
    this.marker = this.createMarker();
    this.infoWindow = this.createInfoWindow();
    // have to define google maps event listeners here too
    // because we can't add listeners on the map until its created
    // google.maps.event.addListener(this.map, 'zoom_changed', () => this.handleZoomChange());
  },
  methods: {
    createMap() {
      const mapOptions = {
        zoom: this.zoom,
        scrollwheel: false,
        panControl: false,
        center: new google.maps.LatLng(
          this.center.latitude,
          this.center.longitude,
        ),
      };
      const map = new google.maps.Map(this.$refs.map, mapOptions);
      const styles = [
        {
          featureType: 'landscape',
          stylers: [
            { saturation: -100 },
            { lightness: 65 },
            { visibility: 'on' },
          ],
        },
        {
          featureType: 'poi',
          stylers: [
            { saturation: -100 },
            { lightness: 51 },
            { visibility: 'simplified' },
          ],
        },
        {
          featureType: 'road.highway',
          stylers: [{ saturation: -100 }, { visibility: 'simplified' }],
        },
        {
          featureType: 'road.arterial',
          stylers: [
            { saturation: -100 },
            { lightness: 30 },
            { visibility: 'on' },
          ],
        },
        {
          featureType: 'road.local',
          stylers: [
            { saturation: -100 },
            { lightness: 40 },
            { visibility: 'on' },
          ],
        },
        {
          featureType: 'transit',
          stylers: [{ saturation: -100 }, { visibility: 'simplified' }],
        },
        {
          featureType: 'administrative.province',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'water',
          elementType: 'labels',
          stylers: [
            { visibility: 'on' },
            { lightness: -25 },
            { saturation: -100 },
          ],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            { hue: '#ffff00' },
            { lightness: -25 },
            { saturation: -97 },
          ],
        },
      ];
      map.set('styles', styles);
      return map;
    },
    createMarker() {
      return new google.maps.Marker({
        position: new google.maps.LatLng(
          this.center.latitude,
          this.center.longitude,
        ),
        map: this.map,
        clickable: true,
        // icon: {
        //     path: fontawesome.markers.MAP_MARKER,
        //     scale: 0.8,
        //     strokeWeight: 0.2,
        //     strokeColor: 'black',
        //     strokeOpacity: 1,
        //     fillColor: '#008cba',
        //     fillOpacity: 1,
        // }
      });
    },
    createInfoWindow() {
      return new google.maps.InfoWindow({
        map: this.map,
        anchor: this.marker,
        content: this.$refs.infoWindow,
      });
    },
  },
};
</script>

<style scoped>
.map {
  box-sizing: border-box;
}

/* Small Devices, Tablets */
@media only screen and (max-width: 768px) {
  .map {
    margin-left: 30px;
    margin-right: 30px;
  }
}
</style>
