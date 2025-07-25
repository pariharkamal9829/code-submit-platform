<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-all duration-500">
    <!-- Header -->
    <AppHeader 
      title="Admin Dashboard" 
      subtitle="Manage platform and monitor activity"
      :user="user" 
      @sign-out="signOut"
    />

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-24">
      <div class="text-center">
        <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center animate-pulse">
          <svg class="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p class="text-lg text-gray-600 dark:text-gray-300 animate-pulse">Loading dashboard...</p>
      </div>
    </div>

    <!-- Not Admin Error -->
    <div v-else-if="!isAdmin" class="max-w-2xl mx-auto px-4 py-24 text-center animate-fade-in">
      <div class="glass p-8 rounded-2xl shadow-2xl">
        <div class="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Access Denied</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">You don't have admin privileges. Contact an existing admin to get access.</p>
        <div v-if="user" class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">Signed in as: <span class="font-medium">{{ user.email }}</span></p>
        </div>
      </div>
    </div>

    <!-- Admin Content -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="card card-hover p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800 animate-fade-in">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Submissions</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ submissions.length }}</p>
            </div>
          </div>
        </div>
        
        <div class="card card-hover p-6 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 animate-fade-in" style="animation-delay: 0.1s;">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ uniqueUsers.size }}</p>
            </div>
          </div>
        </div>
        
        <div class="card card-hover p-6 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800 animate-fade-in" style="animation-delay: 0.2s;">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Admins</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ admins.length }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="card animate-slide-in">
        <div class="border-b border-gray-200 dark:border-gray-700">
          <nav class="-mb-px flex">
            <button
              @click="activeTab = 'submissions'"
              :class="activeTab === 'submissions' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'"
              class="py-4 px-6 border-b-2 font-medium text-sm transition-all duration-200 transform hover:scale-105"
            >
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>User Submissions</span>
              </div>
            </button>
            <button
              @click="activeTab = 'admins'"
              :class="activeTab === 'admins' ? 'border-purple-500 text-purple-600 dark:text-purple-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'"
              class="py-4 px-6 border-b-2 font-medium text-sm transition-all duration-200 transform hover:scale-105"
            >
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <span>Manage Admins</span>
              </div>
            </button>
          </nav>
        </div>

        <!-- Submissions Tab -->
        <div v-if="activeTab === 'submissions'" class="p-8">
          <div class="mb-6 flex justify-between items-center">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">All User Submissions</h2>
                <p class="text-sm text-gray-600 dark:text-gray-400">Monitor and review submitted solutions</p>
              </div>
            </div>
            <div class="flex space-x-3">
              <div class="relative">
                <input
                  v-model="searchQuery"
                  placeholder="Search by user email..."
                  class="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                <svg class="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div v-if="filteredSubmissions.length === 0" class="text-center py-16">
            <div class="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p class="text-gray-500 dark:text-gray-400 text-lg">No submissions found</p>
            <p class="text-gray-400 dark:text-gray-500">Try adjusting your search criteria</p>
          </div>
          
          <div v-else class="space-y-4">
            <div 
              v-for="(submission, index) in filteredSubmissions" 
              :key="submission.id"
              class="glass rounded-xl p-6 transform hover:scale-105 transition-all duration-200 animate-slide-in"
              :style="{ animationDelay: `${index * 0.05}s` }"
            >
              <div class="flex justify-between items-start mb-4">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <span class="text-white font-bold">
                      {{ submission.userName ? submission.userName.charAt(0).toUpperCase() : submission.userEmail.charAt(0).toUpperCase() }}
                    </span>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white">{{ submission.userName || 'Anonymous' }}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ submission.userEmail }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <div class="flex items-center space-x-2 mb-1">
                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span class="text-xs text-green-600 dark:text-green-400 font-medium">Submitted</span>
                  </div>
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatDate(submission.timestamp) }}</span>
                </div>
              </div>
              
              <div class="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span class="text-xs text-gray-400 font-mono">solution.py</span>
                </div>
                <pre class="text-sm text-gray-300 overflow-x-auto code-editor"><code>{{ submission.code }}</code></pre>
              </div>
            </div>
          </div>
        </div>

        <!-- Admins Tab -->
        <div v-if="activeTab === 'admins'" class="p-8">
          <div class="mb-8">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">Add New Admin</h2>
                <p class="text-sm text-gray-600 dark:text-gray-400">Grant admin privileges to users</p>
              </div>
            </div>
            
            <div class="glass rounded-xl p-6">
              <div class="flex space-x-4">
                <div class="flex-1">
                  <input
                    v-model="newAdminEmail"
                    placeholder="Enter email address"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  >
                </div>
                <button
                  @click="addAdmin"
                  :disabled="!newAdminEmail.trim()"
                  class="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add Admin</span>
                </button>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-3 flex items-center space-x-2">
                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Note: The user must sign in to the app at least once before being made an admin.</span>
              </p>
            </div>
          </div>

          <div class="mb-6">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">Current Admins</h2>
                <p class="text-sm text-gray-600 dark:text-gray-400">Manage administrator accounts</p>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <div 
              v-for="(admin, index) in admins" 
              :key="admin.id"
              class="glass rounded-xl p-6 transform hover:scale-105 transition-all duration-200 animate-slide-in"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <div class="flex justify-between items-center">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                    <span class="text-white font-bold">
                      {{ admin.displayName ? admin.displayName.charAt(0).toUpperCase() : admin.email.charAt(0).toUpperCase() }}
                    </span>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-white">{{ admin.displayName || 'Unknown' }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ admin.email }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-500">
                      Added: {{ formatDate(admin.createdAt) }}
                      <span v-if="admin.createdBy" class="ml-2">by {{ admin.createdBy }}</span>
                    </p>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <div v-if="admin.email === user?.email" class="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                    <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span class="text-sm text-blue-600 dark:text-blue-400 font-medium">You</span>
                  </div>
                  <button
                    v-else
                    @click="removeAdmin(admin.id, admin.email)"
                    class="btn-danger flex items-center space-x-2"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { collection, query, orderBy, onSnapshot, doc, setDoc, deleteDoc, getDoc, where, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const { $firebase } = useNuxtApp()
const { initTheme } = useTheme()

// Reactive state
const user = ref(null)
const loading = ref(true)
const isAdmin = ref(false)
const activeTab = ref('submissions')
const searchQuery = ref('')
const newAdminEmail = ref('')

const submissions = ref([])
const admins = ref([])

// Listen for authentication state
onMounted(() => {
  initTheme()
  
  onAuthStateChanged($firebase.auth, async (firebaseUser) => {
    if (firebaseUser) {
      user.value = firebaseUser
      await checkAdminStatus()
      if (isAdmin.value) {
        loadSubmissions()
        loadAdmins()
      }
    } else {
      navigateTo('/')
    }
    loading.value = false
  })
})

// Check if current user is admin
const checkAdminStatus = async () => {
  if (!user.value) return
  
  try {
    // Check admin by email instead of uid
    const q = query(
      collection($firebase.db, 'admins'),
      where('email', '==', user.value.email)
    )
    
    const querySnapshot = await getDocs(q)
    isAdmin.value = !querySnapshot.empty
    
    console.log('Admin check for:', user.value.email, 'Result:', isAdmin.value)
  } catch (error) {
    console.error('Error checking admin status:', error)
    isAdmin.value = false
  }
}

// Load all submissions
const loadSubmissions = () => {
  const q = query(
    collection($firebase.db, 'submissions'),
    orderBy('timestamp', 'desc')
  )
  
  onSnapshot(q, (snapshot) => {
    submissions.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  })
}

// Load all admins
const loadAdmins = () => {
  const q = query(collection($firebase.db, 'admins'))
  
  onSnapshot(q, (snapshot) => {
    admins.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  })
}

// Add new admin
const addAdmin = async () => {
  if (!newAdminEmail.value.trim()) return
  
  try {
    const email = newAdminEmail.value.trim()
    
    // Create admin document with email
    const adminId = email.replace(/[^a-zA-Z0-9]/g, '_')
    
    await setDoc(doc($firebase.db, 'admins', adminId), {
      email: email,
      displayName: email.split('@')[0],
      createdAt: new Date(),
      createdBy: user.value.email
    })
    
    newAdminEmail.value = ''
    alert('Admin added successfully!')
    
  } catch (error) {
    console.error('Error adding admin:', error)
    alert('Error adding admin: ' + error.message)
  }
}

// Remove admin
const removeAdmin = async (adminId, adminEmail) => {
  if (!confirm(`Are you sure you want to remove ${adminEmail} as admin?`)) {
    return
  }
  
  try {
    await deleteDoc(doc($firebase.db, 'admins', adminId))
    alert('Admin removed successfully!')
  } catch (error) {
    console.error('Error removing admin:', error)
    alert('Error removing admin: ' + error.message)
  }
}

// Computed properties
const uniqueUsers = computed(() => {
  const users = new Set()
  submissions.value.forEach(sub => users.add(sub.userEmail))
  return users
})

const filteredSubmissions = computed(() => {
  if (!searchQuery.value.trim()) return submissions.value
  
  const query = searchQuery.value.toLowerCase()
  return submissions.value.filter(sub => 
    sub.userEmail.toLowerCase().includes(query) ||
    (sub.userName && sub.userName.toLowerCase().includes(query))
  )
})

// Sign out function
const signOut = async () => {
  try {
    await $firebase.signOut()
    await navigateTo('/')
  } catch (error) {
    console.error('Sign out error:', error)
  }
}

// Format date for display
const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleString()
}
</script>