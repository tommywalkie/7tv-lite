import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import typedGraphQL from 'vite-plugin-typed-graphql'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    typedGraphQL({
      schemaPath: resolve(__dirname, 'src/graphql/schema.gql'),
      scalars: {
        ObjectID: 'string',
        EmoteVersionState: {
          input: 'string',
          output: 'string',
        },
      },
    }),
    WindiCSS({
      config: {
        darkMode: 'class',
        theme: {
          extend: {
            screens: {
              xs: '480px',
            },
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
              secondary: {
                DEFAULT: '#121212',
                50: '#808080',
                100: '#666666',
                200: '#4d4d4d',
                300: '#333333',
                400: '#1f1f1f',
                500: '#121212',
                600: '#0f0f0f',
                700: '#0c0c0c',
                800: '#090909',
                900: '#060606',
              },
            },
          },
        },
      },
    }),
  ],
})
