import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS({
      config: {
        theme: {
          extend: {
            colors: {
              primary: {
                DEFAULT: '#4fb1d4',
                light: '#72c4e0',
                dark: '#3a8ba7',
                100: '#e0f7fc',
                200: '#b3eaf7',
                300: '#85ddf2',
                400: '#58d0ed',
                500: '#4fb1d4',
                600: '#3a8ba7',
                700: '#2c6b81',
                800: '#1e4b5b',
                900: '#0f2b35',
              },
            },
          },
        },
      },
    }),
  ],
})
