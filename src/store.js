import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: null,
    headersMessage: [
      {
        sortable: false,
        text: 'edit',
        value: 'actionEdit',
      },
      {
        sortable: true,
        text: 'ID',
        value: '_id',
      },
      {
        sortable: true,
        text: 'date',
        value: 'date',
      },
      {
        sortable: true,
        text: 'First Name',
        value: 'firstName',
      },
      {
        sortable: true,
        text: 'Last Name',
        value: 'lastName',
      },
      {
        sortable: true,
        text: 'E-mail',
        value: 'mail',
      },
      {
        sortable: true,
        text: 'Country',
        value: 'country',
      },
      {
        sortable: true,
        text: 'Status',
        value: 'isSolved',
      },
      {
        sortable: true,
        text: 'object',
        value: 'object',

      },
      {
        sortable: true,
        text: 'message',
        value: 'message',

      },
    ],
    headersUsers: [
      {
        sortable: false,
        text: 'edit',
        value: 'actionEdit',
      },
      {
        sortable: true,
        text: 'ID',
        value: '_id',
      },
      {
        sortable: true,
        text: 'First Name',
        value: 'firstName',
      },
      {
        sortable: true,
        text: 'Last Name',
        value: 'lastName',
      },
      {
        sortable: true,
        text: 'Birth Date',
        value: 'birthDate',
      },
      {
        sortable: true,
        text: 'E-mail',
        value: 'mail',
      },
      {
        sortable: true,
        text: 'homeAddress',
        value: 'homeAddress',
      },
      {
        sortable: true,
        text: 'work Address',
        value: 'workAddress',
      },
      {
        sortable: true,
        text: 'favorite Transport',
        value: 'favoriteTransport',
      },
      /* {
        sortable: true,
        text: 'Interactions',
        value: 'interactions',
        align: 'right',
      }, */
      /* {
        sortable: true,
        text: 'Birth date',
        value: 'birthDate',
        align: 'right',
      }, */
    ],
    headersWaypoints: [
      {
        sortable: false,
        text: 'edit',
        value: 'actionEdit',
      },
      {
        sortable: true,
        text: 'ID',
        value: 'properties._id',
      },
      {
        sortable: true,
        text: 'Droped by',
        value: 'properties.username',
      },
      {
        sortable: true,
        text: 'Date (yyyy/mm/dd)',
        value: 'properties.date',
        align: 'left',
      },
      {
        sortable: true,
        text: 'latitude : 0',
        value: 'geometry.coordinates.0',
        align: 'left',
      },
      {
        sortable: true,
        text: 'longitude : 1',
        value: 'geometry.coordinates.1',
        align: 'left',
      },
      {
        sortable: true,
        text: 'Type',
        value: 'properties.type',
        align: 'left',
      },
      {
        sortable: true,
        text: 'Status',
        value: 'properties.status',
        align: 'right',
      },
      {
        sortable: true,
        text: 'infirmation',
        value: 'properties.infirmation',
        align: 'right',
      },
      {
        sortable: true,
        text: 'verification',
        value: 'properties.verification',
        align: 'right',
      },
    ],
  },
  mutations: {
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
  },
  actions: {

  },
})
