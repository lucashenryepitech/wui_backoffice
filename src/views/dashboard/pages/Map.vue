<template>
  <v-container
    id="google-maps"
    fluid
    tag="section"
  >
    <head />

    <v-col
      cols="12"
      style="
    padding-top: 0px;
"
    >
      <v-card>
        <div
          id="mapContainer"
          class="basemap"
          style="height : 850px; padding-top:0px;"
        />
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
</script>

<script>
/* eslint-disable vue/multi-word-component-names */
  import mapboxgl from 'mapbox-gl'
  import 'mapbox-gl/dist/mapbox-gl.css';
  import {
    mapState,
  } from 'vuex'

  export default {
    name: 'BaseMap',
    data () {
      return {
        waypoints: {},
        accessToken: 'pk.eyJ1IjoibWFnbmFzaWUiLCJhIjoiY2p2M3A1bTc5MXZiOTQ0bzQxMXQwcmw4aiJ9.bRtmeZ4gH_zvHEjNQJtP7g',

      }
    },

    computed: {
      ...mapState([]),
      items: {
        get () {
          //return this.$store.state.itemsWaypoints
        },
        set (val) {
          //this.$store.commit('SET_ITEMSWAYPOINTS', val)
        },
      },
    },

    mounted () {
      this.GetAllWaypointsApi();
      mapboxgl.accessToken = this.accessToken
      setTimeout(() => { this.PlaceWaypoints() }, 100);
    },

    methods: {
      GetClassForMarker(element) {
        let tmpType = '';
        switch (element.properties.type) { // select the right balise
          case 'Accident':
            tmpType = 'markerAccident'
            break
          case 'Roadblocked':
            tmpType = 'markerClosedRoad'
            break
          case 'TrafficJam':
            tmpType = 'markerTraficJam'
            break
          case 'Bus':
            tmpType = 'markerBus'
            break
          case 'CBus':
            tmpType = 'markerCBus'
            break
          case 'Concert':
            tmpType = 'markerConcer'
            break
          case 'Exhibition':
            tmpType = 'markerExhibition'
            break
          case 'Fire':
            tmpType = 'markerFire'
            break
          case 'Fireman':
            tmpType = 'markerFireFighter'
            break
          case 'FleaMarket':
            tmpType = 'markerFleaMarket'
            break
          case 'Funi':
            tmpType = 'markerFuni'
            break
          case 'Protest':
            tmpType = 'markerManifestation'
            break
          case 'Market':
            tmpType = 'markerMarket'
            break
          case 'Metro':
            tmpType = 'markerMerto'
            break
          case 'Other':
            tmpType = 'markerOther'
            break
          case 'Pickpocket':
            tmpType = 'markerPickPocket'
            break
          case 'Police':
            tmpType = 'markerPolice'
            break
          case 'PublicTransport':
            tmpType = 'markerPublicTransit'
            break
          case 'StreetArt':
            tmpType = 'markerStreetArt'
            break
          case 'Tram':
            tmpType = 'markerTram'
            break
          case 'Roadworks':
            tmpType = 'markerWorks'
            break
          default:
            tmpType = ''
            break
        }
        return tmpType;
      },
      PlaceWaypoints(){
        var map = new mapboxgl.Map({
        container: 'mapContainer',
        style: 'mapbox://styles/magnasie/cjv3sr37j1k511fpjsu805oni',
        center: [4.842500, 45.767036], // centré sur lyon
        zoom: 12,
      })
      console.log("this.waypoints",this.waypoints)
      this.waypoints.forEach(element => {
        var marker = new mapboxgl.Marker({className: this.GetClassForMarker(element)})
          .setLngLat([element.geometry.coordinates[0], element.geometry.coordinates[1]])
          .addTo(map);
          console.log('my marker: ',this.GetClassForMarker(element));
        });
      },
      GetAllWaypointsApi () {
         console.log('get all waypoints : Call API ')
        const axios = require('axios')
        axios.get('http://185.223.73.69:8080/retrieveallbalises').then((res) => {
          console.log("res.data.feature",res.data.features)
          this.waypoints = res.data.features
          console.log("this.waypoints call api",this.waypoints)
        }).catch((error) => {
          console.error(error.response.data)
        })
      },
    },
  }
</script>

<style>
.markerAccident {
    background-image: url('../../../assets/marker/wui-point-accident.png');
    background-size: cover;
    width: 35px;
    height: 35px;
    cursor: pointer;
}

.markerClosedRoad {
    background-image: url('../../../assets/marker/wui-point-blocked-road.png');
    background-size: cover;
    width: 35px;
    height: 35px;
    cursor: pointer;
}
.markerTraficJam {
    background-image: url('../../../assets/marker/wui-point-bottleneck.png');
    background-size: cover;
    width: 35px;
    height: 35px;
    cursor: pointer;
}

.markerBus {
    background-image: url('../../../assets/marker/wui-point-bus.png');
    background-size: cover;
    width: 35px;
    height: 35px;
    cursor: pointer;
}

.markerCBus {
    background-image: url('../../../assets/marker/wui-point-cbus.png');
    background-size: cover;
    width: 35px;
    height: 35px;
    cursor: pointer;
}

.markerConcer {
    background-image: url('../../../assets/marker/wui-point-concer.png');
    background-size: cover;
    width: 35px;
    height: 35px;
    cursor: pointer;
}

.markerExhibition {
    background-image: url('../../../assets/marker/wui-point-exhibition.png');
    background-size: cover;
    width: 35px;
    height: 35px;
    cursor: pointer;
}

.markerFire {
    background-image: url('../../../assets/marker/wui-point-fire.png');
    background-size: cover;
    width: 35px;
    height: 35px;
    cursor: pointer;
}

.markerFireFighter {
    background-image: url('../../../assets/marker/wui-point-firefighter.png');
    background-size: cover;
    width: 35px;
    height: 35px;
    cursor: pointer;
}

.markerFleaMarket {
    background-image: url('../../../assets/marker/wui-point-flea-market.png');
    background-size: cover;
    width: 35px;
    height: 35px;
    cursor: pointer;
}

.markerFuni {
    background-image: url('../../../assets/marker/wui-point-funi.png');
    background-size: cover;
    width: 35px;
    height: 35px;
    cursor: pointer;
}

.markerManifestation {
    background-image: url('../../../assets/marker/wui-point-manifestation.png');
    background-size: cover;
    width: 35px;
    height: 35px;
    cursor: pointer;
}

.markerMarket {
    background-image: url('../../../assets/marker/wui-point-market.png');
    background-size: cover;
    width: 35px;
    height: 35px;
    cursor: pointer;
}

.markerMerto {
    background-image: url('../../../assets/marker/wui-point-metro.png');
    background-size: cover;
    width: 35px;
    height: 35px;
    cursor: pointer;
}

.markerOther {
    background-image: url('../../../assets/marker/wui-point-other.png');
    background-size: cover;
    width: 35px;
    height: 35px;
    cursor: pointer;
}

.markerPickPocket {
    background-image: url('../../../assets/marker/wui-point-pickpocket.png');
    background-size: cover;
    width: 35px;
    height: 35px;
    cursor: pointer;
}

.markerPolice {
    background-image: url('../../../assets/marker/wui-point-police.png');
    background-size: cover;
    width: 35px;
    height: 35px;
    cursor: pointer;
}

.markerPublicTransit {
    background-image: url('../../../assets/marker/wui-point-public-transit.png');
    background-size: cover;
    width: 35px;
    height: 35px;
    cursor: pointer;
}

.markerStreetArt {
    background-image: url('../../../assets/marker/wui-point-street-art.png');
    background-size: cover;
    width: 35px;
    height: 35px;
    cursor: pointer;
}

.markerTram {
    background-image: url('../../../assets/marker/wui-point-tram.png');
    background-size: cover;
    width: 35px;
    height: 35px;
    cursor: pointer;
}

.markerWorks {
    background-image: url('../../../assets/marker/wui-point-works.png');
    background-size: cover;
    width: 35px;
    height: 35px;
    cursor: pointer;
}

.markerNew {
    background-image: url('../../../assets/marker/wui-point-new.png');
    background-size: cover;
    width: 35px;
    height: 35px;
    cursor: pointer;
}
</style>
