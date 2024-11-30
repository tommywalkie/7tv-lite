<template>
  <div class="min-h-screen flex flex-col bg-gray-100 dark:bg-secondary relative">
    <div class="absolute top-3 right-3">
      <button
        @click="toggleDarkMode"
        class="p-2 rounded-md bg-transparent hover:bg-gray-300 dark:hover:bg-gray-700"
        style="outline: none !important; border: none !important"
      >
        <svg
          class="hidden dark:block"
          width="1.2em"
          height="1.2em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
          style=""
        >
          <path
            fill="currentColor"
            d="M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 0 1-2.064-7.723A1 1 0 0 0 9.73 2.034a10.014 10.014 0 0 0-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 0 0 7.072 2.93a9.93 9.93 0 0 0 7.07-2.929a10.007 10.007 0 0 0 2.583-4.491a1.001 1.001 0 0 0-1.224-1.224zm-2.772 4.301a7.947 7.947 0 0 1-5.656 2.343a7.953 7.953 0 0 1-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 0 1 2.06-1.483a10.027 10.027 0 0 0 2.89 7.848a9.972 9.972 0 0 0 7.848 2.891a8.036 8.036 0 0 1-1.484 2.059z"
          ></path>
        </svg>
        <svg
          class="block dark:hidden"
          width="1.2em"
          height="1.2em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 512 512"
        >
          <path
            d="M256 387c-8.5 0-15.4 6.9-15.4 15.4v46.2c0 8.5 6.9 15.4 15.4 15.4s15.4-6.9 15.4-15.4v-46.2c0-8.5-6.9-15.4-15.4-15.4z"
            fill="currentColor"
          ></path>
          <path
            d="M256 48c-8.5 0-15.4 6.9-15.4 15.4v46.2c0 8.5 6.9 15.4 15.4 15.4s15.4-6.9 15.4-15.4V63.4c0-8.5-6.9-15.4-15.4-15.4z"
            fill="currentColor"
          ></path>
          <path
            d="M125 256c0-8.5-6.9-15.4-15.4-15.4H63.4c-8.5 0-15.4 6.9-15.4 15.4s6.9 15.4 15.4 15.4h46.2c8.5 0 15.4-6.9 15.4-15.4z"
            fill="currentColor"
          ></path>
          <path
            d="M448.6 240.6h-46.2c-8.5 0-15.4 6.9-15.4 15.4s6.9 15.4 15.4 15.4h46.2c8.5 0 15.4-6.9 15.4-15.4s-6.9-15.4-15.4-15.4z"
            fill="currentColor"
          ></path>
          <path
            d="M152.5 344.1c-4.1 0-8 1.6-10.9 4.5l-32.7 32.7c-2.9 2.9-4.5 6.8-4.5 10.9s1.6 8 4.5 10.9c2.9 2.9 6.8 4.5 10.9 4.5 4.1 0 8-1.6 10.9-4.5l32.7-32.7c6-6 6-15.8 0-21.8-2.9-2.9-6.8-4.5-10.9-4.5z"
            fill="currentColor"
          ></path>
          <path
            d="M359.5 167.9c4.1 0 8-1.6 10.9-4.5l32.7-32.7c2.9-2.9 4.5-6.8 4.5-10.9s-1.6-8-4.5-10.9c-2.9-2.9-6.8-4.5-10.9-4.5-4.1 0-8 1.6-10.9 4.5l-32.7 32.7c-2.9 2.9-4.5 6.8-4.5 10.9s1.6 8 4.5 10.9c2.9 2.9 6.8 4.5 10.9 4.5z"
            fill="currentColor"
          ></path>
          <path
            d="M130.7 108.9c-2.9-2.9-6.8-4.5-10.9-4.5-4.1 0-8 1.6-10.9 4.5-2.9 2.9-4.5 6.8-4.5 10.9 0 4.1 1.6 8 4.5 10.9l32.7 32.7c2.9 2.9 6.8 4.5 10.9 4.5 4.1 0 8-1.6 10.9-4.5 2.9-2.9 4.5-6.8 4.5-10.9s-1.6-8-4.5-10.9l-32.7-32.7z"
            fill="currentColor"
          ></path>
          <path
            d="M370.4 348.6c-2.9-2.9-6.8-4.5-10.9-4.5-4.1 0-8 1.6-10.9 4.5-6 6-6 15.8 0 21.8l32.7 32.7c2.9 2.9 6.8 4.5 10.9 4.5 4.1 0 8-1.6 10.9-4.5 2.9-2.9 4.5-6.8 4.5-10.9s-1.6-8-4.5-10.9l-32.7-32.7z"
            fill="currentColor"
          ></path>
          <path
            d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
    </div>

    <!-- Main content wrapper -->
    <div class="flex-grow">
      <div class="max-w-7xl mx-auto p-0 sm:p-8 pt-5 sm:pt-8 md:pt-10 lg:pt-12">
        <div class="flex flex-col items-center text-center">
          <a href="/">
            <img src="/logo.svg" alt="7TV Lite" class="w-24 h-24 mb-5" />
          </a>
          <h1 class="text-2xl font-bold text-center">7TV Lite</h1>
          <p class="text-center text-gray-500 dark:text-gray-400">
            Lightweight client for browsing the latest
            <a href="https://7tv.app/" target="_blank" rel="noopener noreferrer">7TV</a>
            emotes.
          </p>
        </div>
        <div>
          <RouterView />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="w-full py-4 mt-auto bg-gray-200 dark:bg-secondary-400 text-gray-800 dark:text-gray-200">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-2 justify-center">
          <p>
            <a href="https://github.com/tommywalkie/7tv-lite" target="_blank" rel="noopener noreferrer">
              <svg
                viewBox="0 0 1024 1024"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 inline-block mr-1 align-sub text-nowrap fill-gray-800 dark:fill-white"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                  transform="scale(64)"
                />
              </svg>
              &nbsp;Source
            </a>
          </p>
          <span class="text-gray-400 hidden sm:block">✦</span>
          <p class="text-center text-gray-500 dark:text-gray-200">
            Made with ❤️ by
            <a href="https://github.com/tommywalkie" target="_blank" rel="noopener noreferrer">tommywalkie</a>
          </p>
          <span class="text-gray-400 hidden sm:block">✦</span>
          <p>
            <router-link to="/privacy">Privacy Policy</router-link>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useDarkMode } from 'src/hooks/useDarkMode'

const { toggleDarkMode } = useDarkMode()
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
