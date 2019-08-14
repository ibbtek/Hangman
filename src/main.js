import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'
import locales from './locales/locales'

Vue.config.productionTip = false

Vue.use(VueI18n)
var i18n = new VueI18n({
  locale: 'en',
  messages: locales
})

new Vue({
  i18n: i18n,
  render: function (h) { return h(App) },
}).$mount('#app')
