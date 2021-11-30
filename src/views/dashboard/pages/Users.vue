
<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <div>
      <v-card>
        <v-toolbar elevation="0">
          <v-toolbar-title>Users</v-toolbar-title>
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
                        v-model="editedItem.firstName"
                        label="firstname"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.lastName"
                        label="lastname"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.mail"
                        label="mail"
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
                            v-model="editedItem.birthDate"
                            label="birthDate"
                            hint="DD/MM/YYYY"
                            persistent-hint
                            v-bind="attrs"
                            @blur="date = parseDate(editedItem.birthDate)"
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
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.password"
                        label="password"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.homeAddress"
                        label="homeAddress"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.workAddress"
                        label="workAddress"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.favoriteTransport"
                        label="favoriteTransport"
                      />
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
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-data-table
          dense
          :search="search"
          elevation="0"
          :headers="headers"
          :items="items"
          :items-per-page="10"
          class="elevation-1"
          sort-by="name"
          @click:row="handleClickUserRow"
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
        </v-data-table>
        <!--v-btn
          color="blue darken-1"
          text
          @click="testFunck"
        >
          test print items console
        </v-btn-->
      </v-card>
    </div>
  </v-container>
</template>

<script>
/*
to do list :
- ajouter les modeif de la birth date dans l'API pour pouvoir le modifier depuis l'admin
- ajouter un compteur d'interactions pour les users
- afficher l'id du joueur a sa création depuis l'admin

*/
  import {
    mapState,
  } from 'vuex'

  export default {
    name: 'DashboardDashboard',
    data () {
      return {
        menu1: false,
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        items: [],
        dialog: false,
        itemDelete: false,
        editedIndex: -1,
        editedItem: {
          firstName: '',
          lastMame: '',
          mail: '',
          birthDate: '',
          password: '',
          homeAddress: '',
          workAddress: '',
          favoriteTransport: '',
        },
        defaultItem: {
          firstName: '',
          lastName: '',
          mail: '',
          birthDate: '',
          password: '',
          homeAddress: '',
          workAddress: '',
          favoriteTransport: '',
        },
        activeUser: Object,
        search: '',
      }
    },

    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
      ...mapState([]),
      /* items: {
        get () {
          return this.$store.state.itemsUsers
          return this.TestRetriveAllUser()
        },
        set (val) {
          this.$store.commit('SET_ITEMSUSERS', val)
        },
      }, */
      headers: {
        get () {
          return this.$store.state.headersUsers
        },
        set (val) {
          this.$store.commit('SET_HEADERSUSERS', val)
        },
      },
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    watch: {
      date (val) {
        this.editedItem.birthDate = this.formatDate(this.date)
      },
      dialog (val) {
        val || this.close()
      },
      itemDelete (val) {
        val || this.closeDelete()
      },
    },
    mounted () {
      this.GetAllUserApi()
    },
    methods: {
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
      handleClickUserRow (row) {
        console.log(row)
      },
      editItem (item) {
        console.log('my item', item)
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.itemDelete = true
      },
      deleteItemConfirm () {
        this.RemoveUserApi()
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
        if (this.editedIndex > -1) { // edit user
          this.UpdateUserApi(this.items[this.editedIndex]._id, this.editedItem.firstName, this.editedItem.lastName, this.editedItem.mail, this.editedItem.birthDate, this.editedItem.favoriteTransport, this.editedItem.homeAddress, this.editedItem.workAddress)
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else { // new user
          this.NewUserApi(this.editedItem.firstName, this.editedItem.lastName, this.editedItem.mail, this.editedItem.birthDate, this.editedItem.homeAddress, this.editedItem.workAddress, this.editedItem.favoriteTransport, this.editedItem.password)
          this.editedItem._id = this.getIdOfUserByMailApi(this.editedItem.mail)
          this.items.push(this.editedItem)
        }
        this.close()
      },
      complete (index) {
        this.list[index] = !this.list[index]
      },
      async UpdateUserApi (id, _firstName, _lastName, _mail, _birthDate, _favoriteTransport, _homeAddress, _workAddress, _profilePicture) {
        const axios = require('axios')
        await axios.post('http://185.223.73.69:8080/updateuser', { // todo: s'assurer que le birthDate et bien efectif.
          _id: id,
          firstName: _firstName,
          lastName: _lastName,
          mail: _mail,
          birthDate: _birthDate,
          favoriteTransport: _favoriteTransport,
          homeAddress: _homeAddress,
          workAddress: _workAddress,
          profilePicture: _profilePicture,
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
      async getIdOfUserByMailApi (_mail) {
        const axios = require('axios')
        await axios.post('http://185.223.73.69:8080/getuser', {
          mail: _mail,
        }, {
          headers: {
            'content-type': 'application/json',
          },
        },
        ).then((res) => {
          // console.log(res.data._id)
        }).catch((error) => {
          console.error(error.response.data)
        })
      },
      async NewUserApi (_firstName, _lastName, _mail, _birthDate, _homeAddress, _workAddress, _favoriteTransport, _password) {
        const axios = require('axios')
        await axios.post('http://185.223.73.69:8080/newUser', {
          firstName: _firstName,
          lastName: _lastName,
          mail: _mail,
          homeAddress: _homeAddress,
          workAddress: _workAddress,
          favoriteTransport: _favoriteTransport,
          birthDate: _birthDate,
          password: _password,
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
        this.$router.go()
      },
      async RemoveUserApi () {
        const axios = require('axios')
        await axios.post('http://185.223.73.69:8080/removeuser', {
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
      async GetAllUserApi () {
        // console.log('get all user : Call API ')
        const axios = require('axios')
        await axios.get('http://185.223.73.69:8080/getallusers').then((res) => {
          // console.log('Call API - ok')
          this.items = res.data.docs
        }).catch((error) => {
          console.error(error.response.data)
        })
      },
    },
  }
</script>

<style>
.selected {
    background-color: red
}
</style>
