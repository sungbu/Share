// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routers from './routers'

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routers,
  //http://localhost:8080/#/ 去掉#/
  mode:'history'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router: router
})