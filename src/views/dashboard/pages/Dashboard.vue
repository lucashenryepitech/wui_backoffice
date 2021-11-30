<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        sm="5"
        lg="5"
      >
        <v-card

          class="mx-auto"
          max-width="500"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">
                Nombre d'utilisateur :
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ users.length }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="blue"
            >
              <v-icon large>
                mdi-map-marker-account
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="5"
        lg="5"
      >
        <v-card
          class="mx-auto"
          max-width="500"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">
                Nombre de Balises total :
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ waypoints.length }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="blue"
            >
              <v-icon large>
                mdi-map-marker
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        sm="5"
        lg="5"
      >
        <v-card
          class="mx-auto"
          max-width="500"
          outlined
        >
          <v-img
            src="../../../assets/streetart-bg.png"
            height="200px"
          />
          <v-list-item three-line>
            <v-list-item-content>
              <p class="text-h4 text--primary">
                Street-Art
              </p>
              <div class="text-overline mb-4">
                Nombre de Balises :
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ getPreciseWaypointNumber('StreetArt') }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="blue"
            >
              <v-icon
                large
              >
                mdi-spray
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        sm="5"
        lg="5"
      >
        <v-card
          class="mx-auto"
          max-width="500"
          outlined
        >
          <v-img
            src="../../../assets/travaux-bg.jpg"
            height="200px"
          />
          <v-list-item three-line>
            <v-list-item-content>
              <p class="text-h4 text--primary">
                Travaux Publique
              </p>
              <div class="text-overline mb-4">
                Nombre de Balises :
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ getPreciseWaypointNumber('Roadworks') }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="blue"
            >
              <v-icon large>
                mdi-road-variant
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        sm="5"
        lg="5"
      >
        <v-card
          class="mx-auto"
          max-width="500"
          outlined
        >
          <v-img
            src="../../../assets/manif-bg.jpeg"
            height="200px"
          />
          <v-list-item three-line>
            <v-list-item-content>
              <p class="text-h4 text--primary">
                Manifestation
              </p>
              <div class="text-overline mb-4">
                Nombre de Balises :
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ getPreciseWaypointNumber('Protest') }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="blue"
            >
              <v-icon
                large
              >
                mdi-account-group
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        sm="5"
        lg="5"
      >
        <v-card
          class="mx-auto"
          max-width="500"
          outlined
        >
          <v-img
            src="../../../assets/road-closed-bg.jpg"
            height="200px"
          />
          <v-list-item three-line>
            <v-list-item-content>
              <p class="text-h4 text--primary">
                Route Barrée
              </p>
              <div class="text-overline mb-4">
                Nombre de Balises :
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ getPreciseWaypointNumber('Roadblocked') }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="blue"
            >
              <v-icon large>
                mdi-road-variant
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        sm="5"
        lg="5"
      >
        <v-card
          class="mx-auto"
          max-width="500"
          outlined
        >
          <v-img
            src="../../../assets/brocante-bg.jpg"
            height="200px"
          />
          <v-list-item three-line>
            <v-list-item-content>
              <p class="text-h4 text--primary">
                Vide-Grenier/Brocante
              </p>
              <div class="text-overline mb-4">
                Nombre de Balises :
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ getPreciseWaypointNumber('FleaMarket') }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="blue"
            >
              <v-icon
                large
              >
                mdi-basket
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        sm="5"
        lg="5"
      >
        <v-card
          class="mx-auto"
          max-width="500"
          outlined
        >
          <v-img
            src="../../../assets/concert-bg.jpg"
            height="200px"
          />
          <v-list-item three-line>
            <v-list-item-content>
              <p class="text-h4 text--primary">
                Concert
              </p>
              <div class="text-overline mb-4">
                Nombre de Balises :
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ getPreciseWaypointNumber('Concert') }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="blue"
            >
              <v-icon large>
                mdi-music
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        sm="5"
        lg="5"
      >
        <v-card
          class="mx-auto"
          max-width="500"
          outlined
        >
          <v-img
            src="../../../assets/accident-bg.jpg"
            height="200px"
          />
          <v-list-item three-line>
            <v-list-item-content>
              <p class="text-h4 text--primary">
                Accident
              </p>
              <div class="text-overline mb-4">
                Nombre de Balises :
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ getPreciseWaypointNumber('Accident') }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="blue"
            >
              <v-icon
                large
              >
                mdi-alert-remove
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        sm="5"
        lg="5"
      >
        <v-card
          class="mx-auto"
          max-width="500"
          outlined
        >
          <v-img
            src="../../../assets/pompier-bg.jpeg"
            height="200px"
          />
          <v-list-item three-line>
            <v-list-item-content>
              <p class="text-h4 text--primary">
                Pompier
              </p>
              <div class="text-overline mb-4">
                Nombre de Balises :
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ getPreciseWaypointNumber('Fireman') }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="blue"
            >
              <v-icon large>
                mdi-fire-truck
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        sm="5"
        lg="5"
      >
        <v-card
          class="mx-auto"
          max-width="500"
          outlined
        >
          <v-img
            src="../../../assets/pickpocket-bg.jpg"
            height="200px"
          />
          <v-list-item three-line>
            <v-list-item-content>
              <p class="text-h4 text--primary">
                Pick-pocket
              </p>
              <div class="text-overline mb-4">
                Nombre de Balises :
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ getPreciseWaypointNumber('Pickpocket') }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="blue"
            >
              <v-icon
                large
              >
                mdi-handcuffs
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        sm="5"
        lg="5"
      >
        <v-card
          class="mx-auto"
          max-width="500"
          outlined
        >
          <v-img
            src="../../../assets/police-bg.jpg"
            height="200px"
          />
          <v-list-item three-line>
            <v-list-item-content>
              <p class="text-h4 text--primary">
                Police
              </p>
              <div class="text-overline mb-4">
                Nombre de Balises :
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ getPreciseWaypointNumber('Police') }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="blue"
            >
              <v-icon large>
                mdi-police-badge
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        sm="5"
        lg="5"
      >
        <v-card
          class="mx-auto"
          max-width="500"
          outlined
        >
          <v-img
            src="../../../assets/bus-bg.jpeg"
            height="200px"
          />
          <v-list-item three-line>
            <v-list-item-content>
              <p class="text-h4 text--primary">
                Transport en Commun
              </p>
              <div class="text-overline mb-4">
                Nombre de Balises :
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ getPreciseWaypointNumber('PublicTransport') }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="blue"
            >
              <v-icon
                large
              >
                mdi-bus-clock
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        sm="5"
        lg="5"
      >
        <v-card
          class="mx-auto"
          max-width="500"
          outlined
        >
          <v-img
            src="../../../assets/embouteillage-bg.jpg"
            height="200px"
          />
          <v-list-item three-line>
            <v-list-item-content>
              <p class="text-h4 text--primary">
                Embouteillage
              </p>
              <div class="text-overline mb-4">
                Nombre de Balises :
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ getPreciseWaypointNumber('TrafficJam') }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="blue"
            >
              <v-icon large>
                mdi-car-multiple
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        sm="5"
        lg="5"
      >
        <v-card
          class="mx-auto"
          max-width="500"
          outlined
        >
          <v-img
            src="../../../assets/market-bg.jpg"
            height="200px"
          />
          <v-list-item three-line>
            <v-list-item-content>
              <p class="text-h4 text--primary">
                Marché
              </p>
              <div class="text-overline mb-4">
                Nombre de Balises :
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ getPreciseWaypointNumber('Market') }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="blue"
            >
              <v-icon
                large
              >
                mdi-shopping
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        sm="5"
        lg="5"
      >
        <v-card
          class="mx-auto"
          max-width="500"
          outlined
        >
          <v-img
            src="../../../assets/expo-bg.jpg"
            height="200px"
          />
          <v-list-item three-line>
            <v-list-item-content>
              <p class="text-h4 text--primary">
                Exposition
              </p>
              <div class="text-overline mb-4">
                Nombre de Balises :
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ getPreciseWaypointNumber('Exhibition') }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="blue"
            >
              <v-icon large>
                mdi-chart-tree
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardDashboard',

    data () {
      return {
        waypoints: {},
        users: {},
      }
    },
    mounted () {
      this.GetAllUserApi()
      this.GetAllWaypointsApi()
    },
    methods: {
      getPreciseWaypointNumber (type) {
        let i = 0
        this.waypoints.forEach(item => {
          if (item.properties.type === type) {
            i++
          }
        })
        return (i)
      },
      async GetAllUserApi () {
        const axios = require('axios')
        await axios.get('http://185.223.73.69:8080/getallusers').then((res) => {
          this.users = res.data.docs
        }).catch((error) => {
          console.error(error.response.data)
        })
      },
      GetAllWaypointsApi () {
        const axios = require('axios')
        axios.get('http://185.223.73.69:8080/retrieveallbalises').then((res) => {
          this.waypoints = res.data.features
          this.waypoints = this.converteApiWaypointToArrayWaypoints(res.data.features)
        }).catch((error) => {
          console.error(error.response.data)
        })
      },
      complete (index) {
        this.list[index] = !this.list[index]
      },
    },
  }
</script>
