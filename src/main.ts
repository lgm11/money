import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue'//引入Nav
import Layout from  '@/components/Layout.vue'
import Icon from '@/components/Icon.vue'

Vue.config.productionTip = false
Vue.component('Nav',Nav)//全局组件Nav
Vue.component('Layout',Layout)//全局组件Layout
Vue.component('Icon',Icon)




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.onload = function(){
  setTimeout(function(){
    window.scrollTo(0,10000)
  },0)
}