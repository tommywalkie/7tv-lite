<template>
  <div class="flex flex-col items-center bg-gray-200 dark:bg-gray-800 rounded-lg h-35 justify-center p-3 animate-pulse">
    <div class="bg-gray-400 dark:bg-gray-700 rounded-md w-20 h-20"></div>
    <div class="mt-2 text-center">
      <div class="bg-gray-300 dark:bg-gray-600 h-4 w-16 mb-1 rounded"></div>
      <div class="bg-gray-300 dark:bg-gray-600 h-3 w-12 rounded"></div>
    </div>
  </div>
</template>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
