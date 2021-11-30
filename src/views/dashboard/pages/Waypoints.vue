<template>
  <v-container
    id="waypoints"
    fluid
    tag="section"
  >
    <v-card>
      <v-toolbar elevation="0">
        <v-toolbar-title>Waypoints</v-toolbar-title>
        <v-spacer />
        <v-text-field
          v-model="search"
          hide-details
          prepend-icon="mdi-magnify"
          single-line
        />
        <v-dialog
          v-model="dialog"
          max-width="1000px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.id"
                      label="id"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.username"
                      label="username"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.lat"
                      label="lat"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.long"
                      label="long"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select
                      v-model="editedItem.type"
                      :items="items_type"
                      label="type"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select
                      v-model="editedItem.status"
                      :items="items_status"
                      label="status"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-menu
                      ref="menu1"
                      v-model="menu1"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="editedItem.date"
                          label="creation date"
                          hint="DD/MM/YYYY"
                          persistent-hint
                          v-bind="attrs"
                          @blur="date = parseDate(editedItem.date)"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="date"
                        no-title
                        @input="menu1 = false"
                      />
                    </v-menu>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="itemDelete"
          max-width="500px"
        >
          <v-card>
            <v-card-title class="text-h5">
              Are you sure you want to delete this item?
            </v-card-title>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="blue darken-1"
                text
                @click="deleteItemConfirm"
              >
                OK
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="closeDelete"
              >
                Cancel
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table
        :search="search"
        :headers="headers"
        :items="items"
        :items-per-page="10"
        class="elevation-1"
        dense
        elevation="0"
        sort-by="name"
        @click:row="handleClickWaypointRow"
      >
        <template v-slot:[`item.actionEdit`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:[`item.properties.date`]="{ item }">
          {{ ConvertDateToDate(item.properties) }}
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
/* eslint-disable */
  import {
    mapState,
  } from 'vuex'

  export default {
    name: 'DashboardDashboard',

    data () {
      return {
        items_type: ['StreetArt', 'Roadworks', 'Protest', 'Roadblocked', 'FleaMarket', 'Accident', 'Fireman', 'Pickpocket', 'Police', 'PublicTransport', 'TrafficJam', 'Market', 'Exhibition', 'Concert', 'Other', 'New'],
        items_status: ['Pending', 'Active', 'Declined'],
        items: [],
        menu1: false,
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        dialog: false,
        itemDelete: false,
        editedIndex: -1,
        editedItem: {
          id: '',
          type: '',
          username: '',
          lat: '',
          long: '',
          date: '',
          status: '', // inutile pour le moment
        },
        defaultItem: {
          id: '',
          type: '',
          username: '',
          lat: '',
          long: '',
          date: '',
          status: '', // inutile pour le moment
        },
        activeUser: Object,
        search: '',
        tabs: 0,
      }
    },

    computed: {
      ...mapState([]),
      headers: {
        get () {
          return this.$store.state.headersWaypoints
        },
      },
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      itemDelete (val) {
        val || this.closeDelete()
      },
      date (val) {
        this.editedItem.date = this.formatDate(this.date)
      },
    },

    mounted () {
      this.GetAllWaypointsApi()
    },
    methods: {
      getColor (type) {
        if (type === 'fire') return 'red'
        else if (type === 'car crash') return 'orange'
        else if (type === 'closed road') return 'yellow'
        else if (type === 'market') return 'green'
        else if (type === 'street art') return 'light blue'
        else return 'grey'
      },
      handleClickWaypointRow (row) {
        console.log(row)
      },
      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem.date = item.properties.date
        this.editedItem.id = item.properties._id
        this.editedItem.lat = parseFloat(item.geometry.coordinates[0])
        this.editedItem.long = parseFloat(item.geometry.coordinates[1])
        this.editedItem.status = ''
        this.editedItem.type = item.properties.type
        this.editedItem.username = item.properties.username
        this.dialog = true
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      deleteItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.itemDelete = true
      },
      deleteItemConfirm () {
        this.RemoveWaypointApi()
        this.items.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.itemDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) { // edit waypoint :
          this.UpdateWaypointsApi(this.editedItem.id, this.editedItem.type, this.editedItem.username, this.editedItem.long, this.editedItem.lat, this.editedItem.date)
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else { // new waypoint :
          this.NewWaypointApi(this.editedItem.type, this.editedItem.username, this.editedItem.lat, this.editedItem.long)
          this.items.push(this.editedItem)
        }
        this.close()
        setTimeout(() => { this.GetAllWaypointsApi() }, 50)
      },
      complete (index) {
        this.list[index] = !this.list[index]
      },
      async UpdateWaypointsApi (id, _type, _username, _longitude, _latitude, _date) {
        const axios = require('axios')
        await axios.post('http://185.223.73.69:8080/updateBalise', {
          _id: id,
          type: _type,
          username: _username,
          longitude: parseFloat(_longitude),
          latitude: parseFloat(_latitude),
          date: _date,
        }, {
          headers: {
            'content-type': 'application/json',
          },
        },
        ).then((res) => {
        }).catch((error) => {
          console.error(error.response.data)
        })
      },
      async NewWaypointApi (_type, _username, _lat, _long) {
        const axios = require('axios')
        console.log('newWayppoints API : type:' + _type + ' username:' + _username + ' lat :' + _lat + ' long:' + _long)
        await axios.post('http://185.223.73.69:8080/push', {
          type: 'FeatureCollection',
          features: [{
            type: 'Features',
            properties: {
              type: _type,
              username: _username,
            },
            geometry: {
              type: 'Point',
              coordinates: [_lat, _long],
            },
          }],
        }, {
          headers: {
            'content-type': 'application/json',
          },
        },
        ).then((res) => {
        }).catch((error) => {
          console.error(error.response.data)
        })
        this.$router.go()
      },
      async RemoveWaypointApi () {
        const axios = require('axios')
        await axios.post('http://185.223.73.69:8080/removebalise', {
          _id: this.items[this.editedIndex].properties._id,
        }, {
          headers: {
            'content-type': 'application/json',
          },
        },
        ).then((res) => {
        }).catch((error) => {
          console.error(error.response.data)
        })
      },
      GetAllWaypointsApi () {
        const axios = require('axios')
        axios.get('http://185.223.73.69:8080/retrieveallbalises').then((res) => {
          this.items = res.data.features
          this.items = this.converteApiWaypointToArrayWaypoints(res.data.features)
        }).catch((error) => {
          console.error(error.response.data)
        })
      },
      ConvertDateToDate (input) {
        var d = new Date(input.date)
        return (d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes())
      },
    },
  }
</script>
