<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900">Admin Management</h3>
      <button
        @click="showAddAdmin = true"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Admin
      </button>
    </div>

    <!-- Add Admin Form -->
    <div v-if="showAddAdmin" class="bg-gray-50 rounded-lg p-4 mb-6">
      <h4 class="text-md font-medium text-gray-900 mb-4">Add New Administrator</h4>
      <form @submit.prevent="addAdmin" class="space-y-4">
        <div>
          <label for="adminEmail" class="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="adminEmail"
            v-model="newAdminEmail"
            type="email"
            required
            placeholder="Enter admin email address"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
        </div>
        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="cancelAddAdmin"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="!newAdminEmail.trim() || adding"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <svg v-if="adding" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ adding ? 'Adding...' : 'Add Admin' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Current Admins List -->
    <div>
      <h4 class="text-md font-medium text-gray-900 mb-4">
        Current Administrators ({{ authStore.admins.length }})
      </h4>
      
      <div v-if="loading" class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      </div>

      <div v-else-if="authStore.admins.length === 0" class="text-center py-8 text-gray-500">
        No administrators found. Add the first admin using the button above.
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="admin in authStore.admins"
          :key="admin.id"
          class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span class="text-sm font-medium text-blue-600">
                {{ admin.email.charAt(0).toUpperCase() }}
              </span>
            </div>
            <div>
              <h5 class="text-sm font-medium text-gray-900">
                {{ admin.displayName || 'No name provided' }}
              </h5>
              <p class="text-sm text-gray-500">{{ admin.email }}</p>
              <div class="flex items-center mt-1">
                <span class="text-xs text-gray-400">
                  Added {{ formatDate(admin.createdAt) }}
                </span>
                <span v-if="admin.email === authStore.user?.email" class="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  You
                </span>
              </div>
            </div>
          </div>
          
          <div class="flex items-center space-x-2">
            <!-- Status indicator -->
            <div class="flex items-center">
              <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span class="text-xs text-gray-500">Active</span>
            </div>
            
            <!-- Remove admin button (can't remove yourself) -->
            <button
              v-if="admin.email !== authStore.user?.email"
              @click="confirmRemoveAdmin(admin)"
              :disabled="removing === admin.id"
              class="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
              title="Remove admin access"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Remove Admin Confirmation Modal -->
    <div v-if="adminToRemove" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 m-4 max-w-md w-full">
        <div class="flex items-center mb-4">
          <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.134 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900">Remove Administrator</h3>
        </div>
        
        <p class="text-sm text-gray-600 mb-6">
          Are you sure you want to remove admin access for 
          <strong>{{ adminToRemove.email }}</strong>? 
          This action cannot be undone.
        </p>
        
        <div class="flex justify-end space-x-3">
          <button
            @click="adminToRemove = null"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            @click="removeAdmin"
            :disabled="removing"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
          >
            <svg v-if="removing" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ removing ? 'Removing...' : 'Remove Admin' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <div v-if="message" :class="[
      'mt-4 p-4 rounded-md',
      message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
    ]">
      <div class="flex">
        <svg :class="[
          'w-5 h-5 mr-3 mt-0.5',
          message.type === 'success' ? 'text-green-400' : 'text-red-400'
        ]" fill="currentColor" viewBox="0 0 20 20">
          <path v-if="message.type === 'success'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          <path v-else fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
        <span class="text-sm font-medium">{{ message.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore()

const showAddAdmin = ref(false)
const newAdminEmail = ref('')
const adding = ref(false)
const loading = ref(false)
const removing = ref(null)
const adminToRemove = ref(null)
const message = ref(null)

// Load admins on mount
onMounted(async () => {
  loading.value = true
  try {
    await authStore.fetchAdmins()
  } catch (error) {
    showMessage('Failed to load administrators: ' + error.message, 'error')
  } finally {
    loading.value = false
  }
})

const addAdmin = async () => {
  if (!newAdminEmail.value.trim()) return

  adding.value = true
  try {
    await authStore.addAdmin(newAdminEmail.value.trim())
    showMessage(`Successfully added ${newAdminEmail.value} as an administrator.`, 'success')
    cancelAddAdmin()
  } catch (error) {
    showMessage('Failed to add administrator: ' + error.message, 'error')
  } finally {
    adding.value = false
  }
}

const cancelAddAdmin = () => {
  showAddAdmin.value = false
  newAdminEmail.value = ''
  clearMessage()
}

const confirmRemoveAdmin = (admin) => {
  adminToRemove.value = admin
}

const removeAdmin = async () => {
  if (!adminToRemove.value) return

  removing.value = adminToRemove.value.id
  try {
    await authStore.removeAdmin(adminToRemove.value.id)
    showMessage(`Successfully removed admin access for ${adminToRemove.value.email}.`, 'success')
    adminToRemove.value = null
  } catch (error) {
    showMessage('Failed to remove administrator: ' + error.message, 'error')
  } finally {
    removing.value = null
  }
}

const showMessage = (text, type = 'success') => {
  message.value = { text, type }
  setTimeout(() => {
    message.value = null
  }, 5000)
}

const clearMessage = () => {
  message.value = null
}

const formatDate = (timestamp) => {
  if (!timestamp) return 'Unknown'
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>
