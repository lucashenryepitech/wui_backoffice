<template>
  <v-container
    id="waypoints"
    fluid
    tag="section"
  >
    <v-card>
      <v-toolbar elevation="0">
        <v-toolbar-title>Messages</v-toolbar-title>
        <v-spacer />
        <v-text-field
          v-model="search"
          hide-details
          prepend-icon="mdi-magnify"
          single-line
        />
        <v-dialog
          v-model="itemDelete"
          max-width="500px"
        >
          <v-card>
            <v-card-title class="text-h5">
              Are you sure you want to delete this item?
            </v-card-title>
            <v-card-actions>
              <v-btn
                color="blue darken-1"
                text
                @click="closeDelete"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="deleteItemConfirm"
              >
                OK
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="itemFinish"
          max-width="500px"
        >
          <v-card>
            <v-card-title class="text-h5">
              Are you sure you want to change the status of this ticket ?
            </v-card-title>
            <v-card-actions>
              <v-btn
                color="blue darken-1"
                text
                @click="closeFinish"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="finishItemConfirm"
              >
                OK
              </v-btn>
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
        @click:row="handleClickMessageRow"
      >
        <template v-slot:[`item.actionEdit`]="{ item }">
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon><v-icon
            small
            @click="finishItem(item)"
          >
            mdi-swap-horizontal-bold
          </v-icon>
        </template>
        <template v-slot:[`item.date`]="{ item }">
          {{ ConvertDateToDate(item) }}
        </template>
        <template v-slot:[`item.isSolved`]="{ item }">
          <v-chip :color="getColorStatus(item.isSolved)">
            {{ ConvertIsSolvedToStatus(item.isSolved) }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import {
    mapState,
  } from 'vuex'

  export default {
    name: 'DashboardDashboard',

    data () {
      return {
        itemDelete: false,
        itemFinish: false,
        items: [],
        dialog: false,
        search: '',
        tabs: 0,
      }
    },

    computed: {
      ...mapState([]),
      headers: {
        get () {
          return this.$store.state.headersMessage
        },
      },
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      itemDelete (val) {
        val || this.closeDelete()
      },
      itemFinish (val) {
        val || this.closeFinish()
      },
    },
    mounted () {
      this.GetAllMessageApi()
    },

    methods: {
      testFunck () {
        console.log(this.items)
      },
      handleClickMessageRow (row) {
        console.log(row)
        // toadd : open detail
      },

      deleteItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.itemDelete = true
      },

      finishItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.itemFinish = true
      },

      deleteItemConfirm () {
        this.RemoveMessageApi()
        this.items.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      finishItemConfirm () {
        this.FinishMessageApi()
        this.closeFinish()
        setTimeout(() => { this.GetAllMessageApi() }, 50)
      },

      closeDelete () {
        this.itemDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeFinish () {
        this.itemFinish = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.close()
      },
      complete (index) {
        this.list[index] = !this.list[index]
      },

      GetAllMessageApi () {
        const axios = require('axios')
        axios.get('http://185.223.73.69:8080/getallforms').then((res) => {
          this.items = res.data.docs
        }).catch((error) => {
          console.error(error.response.data)
        })
      },
      async RemoveMessageApi () {
        const axios = require('axios')
        await axios.post('http://185.223.73.69:8080/removeform', {
          _id: this.items[this.editedIndex]._id,
        }, {
          headers: {
            'content-type': 'application/json',
          },
        },
        ).then((res) => {
          // console.log(res.data)
        }).catch((error) => {
          console.error(error.response.data)
        })
      },
      async FinishMessageApi () {
        const axios = require('axios')
        await axios.post('http://185.223.73.69:8080/changeFormStatus', {
          _id: this.items[this.editedIndex]._id,
        }, {
          headers: {
            'content-type': 'application/json',
          },
        },
        ).then((res) => {
          // console.log(res.data)
        }).catch((error) => {
          console.error(error.response.data)
        })
      },
      ConvertDateToDate (input) {
        var d = new Date(input.date)
        return (d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes())
      },
      ConvertIsSolvedToStatus (input) {
        if (input === true) { return ('Finished') } else { return ('Pending') }
      },
      getColorStatus (status) {
        if (status === true) { return 'green' } else { return 'orange' }
      },
    },
  }
</script>

<style>
.selected {
    background-color: red
}
</style>
