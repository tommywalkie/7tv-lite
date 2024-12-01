import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query'
import { injectLiwanScript } from './utils/analytics'
import 'virtual:windi.css'
import './style.pcss'
import App from './App.vue'
import Home from './routes/Home.vue'
import Privacy from './routes/Privacy.vue'

const isProd = import.meta.env.PROD

if (isProd && window.location.hostname === '7tv-lite.tommywalkie.com') {
  injectLiwanScript('7tv-lite')
}

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      name: 'home',
    },
    {
      path: '/privacy',
      component: Privacy,
      name: 'privacy',
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
