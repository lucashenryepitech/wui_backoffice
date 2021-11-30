<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    mobile-breakpoint="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <v-list
      dense
      nav
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-h6"
            v-text="profile.title"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list
      expand
      nav
    >
      <div />

      <template v-for="(item, i) in computedItems">
        <base-item-group
          v-if="item.children"
          :key="`group-${i}`"
          :item="item"
        />

        <base-item
          v-else
          :key="`item-${i}`"
          :item="item"
        />
      </template>
      <div />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import {
    mapState,
  } from 'vuex'

  export default {
    name: 'DashboardCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      items: [
        {
          icon: 'mdi-home',
          title: 'dashboard',
          to: '/',
        },
        {
          icon: 'mdi-account',
          title: 'users',
          to: '/pages/users',
        },
        {
          icon: 'mdi-map-marker',
          title: 'waypoints',
          to: '/pages/waypoints',
        },
        {
          icon: 'mdi-message',
          title: 'messages',
          to: 'messages',
        },
        {
          title: 'map',
          icon: 'mdi-map-marker',
          to: '/pages/map',
        },
        /*
        {
          title: 'notifications',
          icon: 'mdi-bell',
          to: '/components/notifications',
        }, */
      ],
    }),

    computed: {
      ...mapState([]),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      computedItems () {
        return this.items.map(this.mapItem)
      },
      profile () {
        return {
          avatar: true,
          title: this.$t('title_website'),
        }
      },
    },

    methods: {
      mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: this.$t(item.title),
        }
      },
    },
  }
</script>

<style lang="sass">

</style>
