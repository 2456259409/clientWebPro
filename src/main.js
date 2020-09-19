// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import qs from 'qs'
import router from './router'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = axios;    //全局注册，使用方法为:this.$axios
Vue.prototype.$qs = qs;           //全局注册，使用方法为:this.qs

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App },
  template: '<App/>'
});
