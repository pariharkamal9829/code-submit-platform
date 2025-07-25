<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <NuxtPage />
  </div>
</template>

<script setup>
// Initialize theme on app mount
onMounted(() => {
  // Prevent flash of unstyled content for dark mode
  const theme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  if (theme === 'dark' || (!theme && prefersDark)) {
    document.documentElement.classList.add('dark')
  }
})
</script>