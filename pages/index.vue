<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-all duration-500">
    <!-- Header when logged in -->
    <AppHeader 
      v-if="user" 
      title="CodeChallenge Platform" 
      subtitle="Master your coding skills"
      :user="user" 
      @sign-out="logout"
    />

    <!-- Login Section (when not logged in) -->
    <div v-if="!user" class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-10 -left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div class="absolute -bottom-10 -right-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style="animation-delay: 2s;"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400 to-cyan-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse-slow"></div>
      </div>

      <div class="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="text-center mb-8 animate-fade-in">
          <!-- Logo -->
          <div class="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl mb-6 transform hover:scale-110 transition-all duration-300 glow-blue">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          
          <h2 class="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to CodeChallenge
          </h2>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Master your programming skills with interactive challenges
          </p>
        </div>

        <div class="glass rounded-2xl py-12 px-8 shadow-2xl animate-bounce-in">
          <div class="space-y-8">
            <!-- Sign In Button -->
            <div>
              <button
                @click="signInWithGoogle"
                :disabled="loading"
                class="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transform hover:scale-105 transition-all duration-200 glow-blue hover:glow-purple"
                :class="{ 'animate-pulse': loading }"
              >
                <div class="flex items-center space-x-3">
                  <svg class="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>{{ loading ? 'Signing in...' : 'Continue with Google' }}</span>
                </div>
              </button>
            </div>
            
            <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm text-center p-4 rounded-xl animate-slide-in">
              {{ error }}
            </div>

            <!-- Features Preview -->
            <div class="mt-8 text-center">
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">What you'll get access to:</p>
              <div class="grid grid-cols-1 gap-3">
                <div class="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                  <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Interactive Programming Challenges</span>
                </div>
                <div class="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                  <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Code Submission & History</span>
                </div>
                <div class="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Real-time Testing Environment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dashboard Section (when logged in) -->
    <div v-if="user" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome Card -->
      <div class="card card-hover mb-8 p-8 animate-fade-in">
        <div class="text-center">
          <div class="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg animate-bounce-in">
            <img
              v-if="user.photoURL"
              :src="user.photoURL"
              :alt="user.displayName"
              class="w-16 h-16 rounded-full"
            >
            <span
              v-else
              class="text-white text-2xl font-bold"
            >
              {{ user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase() }}
            </span>
          </div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {{ user.displayName || 'Developer' }}! 👋
          </h1>
          <p class="text-gray-600 dark:text-gray-400 text-lg">
            Ready to tackle some coding challenges?
          </p>
        </div>
      </div>

      <!-- Action Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Programming Challenge Card -->
        <NuxtLink to="/challenge" class="block group">
          <div class="card card-hover p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800 animate-slide-in">
            <div class="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:glow-blue transition-all duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Programming Challenge
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Solve algorithmic problems and improve your coding skills
            </p>
            <div class="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
              Start Coding
              <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </NuxtLink>

        <!-- Admin Dashboard Card -->
        <NuxtLink to="/admin" class="block group">
          <div class="card card-hover p-8 text-center bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800 animate-slide-in" style="animation-delay: 0.1s;">
            <div class="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:glow-purple transition-all duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Admin Dashboard
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Manage users, view submissions, and platform analytics
            </p>
            <div class="inline-flex items-center text-purple-600 dark:text-purple-400 font-medium group-hover:text-purple-700 dark:group-hover:text-purple-300">
              Open Dashboard
              <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Quick Stats -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="card p-6 text-center animate-fade-in">
          <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">1</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Active Challenge</div>
        </div>
        <div class="card p-6 text-center animate-fade-in" style="animation-delay: 0.1s;">
          <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">∞</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Learning Opportunities</div>
        </div>
        <div class="card p-6 text-center animate-fade-in" style="animation-delay: 0.2s;">
          <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Platform Access</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onAuthStateChanged } from 'firebase/auth'

const { $firebase } = useNuxtApp()
const { initTheme } = useTheme()

// Reactive state
const user = ref(null)
const loading = ref(false)
const error = ref('')

// Initialize theme on mount
onMounted(() => {
  initTheme()
  
  onAuthStateChanged($firebase.auth, (firebaseUser) => {
    user.value = firebaseUser
  })
})

// Google Sign-In function
const signInWithGoogle = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const result = await $firebase.signInWithGoogle()
    console.log('User signed in:', result.user)
    user.value = result.user
  } catch (err) {
    error.value = 'Failed to sign in: ' + err.message
    console.error('Sign-in error:', err)
  } finally {
    loading.value = false
  }
}

const logout = async () => {
  try {
    await $firebase.signOut()
    user.value = null
  } catch (err) {
    console.error('Sign-out error:', err)
  }
}
</script>
