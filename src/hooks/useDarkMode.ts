import { ref, onMounted } from 'vue'

export function useDarkMode() {
  const isDark = ref(false)

  const updateTheme = (dark: boolean) => {
    // Update DOM
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    // Save preference
    localStorage.setItem('color-theme', dark ? 'dark' : 'light')
    isDark.value = dark
  }

  const toggleDarkMode = () => {
    updateTheme(!isDark.value)
  }

  onMounted(() => {
    // Check for saved preference first
    const savedTheme = localStorage.getItem('color-theme')
    if (savedTheme) {
      updateTheme(savedTheme === 'dark')
    } else {
      // If no saved preference, use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      updateTheme(prefersDark)
    }

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Only update if there's no saved preference
      if (!localStorage.getItem('color-theme')) {
        updateTheme(e.matches)
      }
    })
  })

  return {
    isDark,
    toggleDarkMode,
  }
}
