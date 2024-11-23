import { createApp } from 'vue'
import { VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query'
import 'virtual:windi.css'
import './style.css'
import App from './App.vue'

const app = createApp(App)

const vueQueryOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
      },
    },
  },
}

app.use(VueQueryPlugin, vueQueryOptions)
app.mount('#app')
