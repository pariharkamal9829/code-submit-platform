<!-- Animated Header Component -->
<template>
  <header class="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <!-- Logo and Title -->
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-200">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {{ title || 'CodeChallenge' }}
            </h1>
            <p v-if="subtitle" class="text-sm text-gray-600 dark:text-gray-400">
              {{ subtitle }}
            </p>
          </div>
        </div>

        <!-- Navigation and User Profile -->
        <div class="flex items-center space-x-4">
          <!-- Navigation Links -->
          <nav v-if="user" class="hidden md:flex items-center space-x-6">
            <NuxtLink 
              to="/" 
              class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
              :class="{ 'text-blue-600 dark:text-blue-400': $route.path === '/' }"
            >
              Home
            </NuxtLink>
            <NuxtLink 
              to="/challenge" 
              class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
              :class="{ 'text-blue-600 dark:text-blue-400': $route.path === '/challenge' }"
            >
              Challenge
            </NuxtLink>
            <NuxtLink 
              to="/admin" 
              class="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 font-medium"
              :class="{ 'text-purple-600 dark:text-purple-400': $route.path.startsWith('/admin') }"
            >
              Admin
            </NuxtLink>
          </nav>

          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-110"
            :class="{ 'rotate-180': isDark }"
          >
            <svg v-if="!isDark" class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>

          <!-- User Profile Dropdown -->
          <div v-if="user" class="relative" ref="profileDropdown">
            <button
              @click="showProfile = !showProfile"
              class="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
            >
              <div class="relative">
                <img
                  v-if="user.photoURL"
                  :src="user.photoURL"
                  :alt="user.displayName"
                  class="w-8 h-8 rounded-full ring-2 ring-blue-500 dark:ring-blue-400 transition-all duration-200"
                >
                <div
                  v-else
                  class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center ring-2 ring-blue-500 dark:ring-blue-400"
                >
                  <span class="text-white text-sm font-medium">
                    {{ user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase() }}
                  </span>
                </div>
                <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-900"></div>
              </div>
              <div class="hidden sm:block text-left">
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ user.displayName || 'User' }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ user.email }}
                </p>
              </div>
              <svg 
                class="w-4 h-4 text-gray-400 transition-transform duration-200"
                :class="{ 'rotate-180': showProfile }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Profile Dropdown Menu -->
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div
                v-if="showProfile"
                class="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50"
              >
                <!-- Profile Info -->
                <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <div class="flex items-center space-x-3">
                    <img
                      v-if="user.photoURL"
                      :src="user.photoURL"
                      :alt="user.displayName"
                      class="w-12 h-12 rounded-full"
                    >
                    <div
                      v-else
                      class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                    >
                      <span class="text-white font-medium">
                        {{ user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase() }}
                      </span>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">
                        {{ user.displayName || 'User' }}
                      </p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {{ user.email }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Menu Items -->
                <div class="py-2">
                  <NuxtLink
                    to="/"
                    @click="showProfile = false"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                  >
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                  </NuxtLink>
                  
                  <NuxtLink
                    to="/challenge"
                    @click="showProfile = false"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                  >
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Programming Challenge
                  </NuxtLink>

                  <button
                    @click="signOut"
                    class="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150"
                  >
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  title: String,
  subtitle: String,
  user: Object
})

const emit = defineEmits(['signOut'])

const { isDark, toggleTheme } = useTheme()
const showProfile = ref(false)
const profileDropdown = ref(null)

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (profileDropdown.value && !profileDropdown.value.contains(event.target)) {
    showProfile.value = false
  }
}

const signOut = () => {
  showProfile.value = false
  emit('signOut')
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
