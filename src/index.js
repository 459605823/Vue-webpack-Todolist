import Vue from 'vue'
import App from './app.vue'
import './assets/styles/global.css'


const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
  // el:root
  render: (h) => h(App)
}).$mount(root)//$mount(root)等价于el:root
