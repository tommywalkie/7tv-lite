import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query'
import 'virtual:windi.css'
import './style.pcss'
import App from './App.vue'
import Home from './routes/Home.vue'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
  ],
})

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
app.use(router)
app.mount('#app')
