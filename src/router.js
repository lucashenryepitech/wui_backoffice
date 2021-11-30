import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/pages/Dashboard'),
        },
        // Pages
        {
          name: 'Users',
          path: 'pages/users',
          component: () => import('@/views/dashboard/pages/Users'),
        },
        {
          name: 'Waypoints',
          path: 'pages/waypoints',
          component: () => import('@/views/dashboard/pages/Waypoints'),
        },
        {
          name: 'Messages',
          path: 'pages/messages',
          component: () => import('@/views/dashboard/pages/Messages'),
        },
        {
          name: 'Map',
          path: 'pages/map',
          component: () => import('@/views/dashboard/pages/Map'),
        },
        {
          path: '*',
          name: 'catchAll',
          component: () => import('@/views/dashboard/pages/Dashboard'),
       },
      ],
    },
  ],
})
