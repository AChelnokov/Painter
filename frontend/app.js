window.axios = require('axios');


import Vue from 'vue'
import router from './router'
// import store from './store'

import './assets/sass/main.scss'

import Main from './components/Main.vue'


new Vue({
  el: '#app',
  router,
  // store,
  render: h => h(Main)
})

