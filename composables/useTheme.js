// Theme composable for dark/light mode
import { ref, watch } from 'vue'

const isDark = ref(false)

export const useTheme = () => {
  // Initialize theme from localStorage or system preference
  const initTheme = () => {
    if (process.client) {
      const stored = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      isDark.value = stored ? stored === 'dark' : prefersDark
      updateTheme()
    }
  }

  // Update DOM and localStorage
  const updateTheme = () => {
    if (process.client) {
      const html = document.documentElement
      if (isDark.value) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    }
  }

  // Toggle theme
  const toggleTheme = () => {
    isDark.value = !isDark.value
    updateTheme()
  }

  // Watch for changes
  watch(isDark, updateTheme)

  return {
    isDark: readonly(isDark),
    toggleTheme,
    initTheme
  }
}
