import Vue from 'vue'
import VueTable from 'vuetable-2'

if (process.browser) {
  Vue.use(VueTable)
}