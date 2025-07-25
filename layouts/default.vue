<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation Bar -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">&lt;/&gt;</span>
              </div>
              <span class="text-xl font-bold text-gray-900">CodeChallenge</span>
            </NuxtLink>
          </div>

          <div class="flex items-center space-x-4">
            <template v-if="authStore.user">
              <!-- Admin Panel Link -->
              <NuxtLink 
                v-if="authStore.isAdmin" 
                to="/admin"
                class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Admin Panel
              </NuxtLink>

              <!-- User Info -->
              <div class="flex items-center space-x-3">
                <img 
                  :src="authStore.user.photoURL || '/default-avatar.png'" 
                  :alt="authStore.user.displayName"
                  class="w-8 h-8 rounded-full"
                >
                <span class="text-sm font-medium text-gray-700">
                  {{ authStore.user.displayName }}
                </span>
                <button
                  @click="handleSignOut"
                  class="text-sm text-gray-500 hover:text-gray-700"
                >
                  Sign out
                </button>
              </div>
            </template>

            <template v-else>
              <button
                @click="authStore.signInWithGoogle"
                :disabled="authStore.loading"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </button>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Loading Overlay -->
    <div 
      v-if="authStore.loading" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 flex items-center space-x-3">
        <div class="spinner"></div>
        <span class="text-gray-700">Loading...</span>
      </div>
    </div>

    <!-- Error Toast -->
    <div 
      v-if="authStore.error" 
      class="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
    >
      {{ authStore.error }}
      <button 
        @click="authStore.error = ''" 
        class="ml-2 text-red-200 hover:text-white"
      >
        ×
      </button>
    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore()

// Initialize auth when component mounts
onMounted(() => {
  authStore.initAuth()
})

const handleSignOut = async () => {
  try {
    await authStore.logout()
    await navigateTo('/')
  } catch (error) {
    console.error('Sign out error:', error)
  }
}
</script>
