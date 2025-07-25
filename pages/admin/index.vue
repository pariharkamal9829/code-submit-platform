<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
      <p class="text-gray-600">Manage submissions and administrators</p>
    </div>

    <!-- Loading State -->
    <div v-if="submissionsStore.loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4 mb-8">
      <div class="flex">
        <svg class="w-5 h-5 text-red-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
        <div>
          <h3 class="text-sm font-medium text-red-800">Error loading dashboard</h3>
          <p class="text-sm text-red-700 mt-1">{{ error }}</p>
        </div>
      </div>
    </div>

    <div v-else>
      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Submissions</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ submissionsStore.statistics.totalSubmissions }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Unique Users</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ submissionsStore.statistics.uniqueUsers }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Today's Submissions</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ submissionsStore.statistics.todaysSubmissions }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Avg per User</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ submissionsStore.statistics.averagePerUser }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="mb-8">
        <nav class="-mb-px flex space-x-8">
          <button
            @click="activeTab = 'submissions'"
            :class="[
              'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === 'submissions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            All Submissions ({{ submissionsStore.allSubmissions.length }})
          </button>
          <button
            @click="activeTab = 'admins'"
            :class="[
              'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === 'admins'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Admin Management
          </button>
        </nav>
      </div>

      <!-- Submissions Tab -->
      <div v-if="activeTab === 'submissions'">
        <!-- Search and Filters -->
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by user name or email..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div class="flex gap-2">
              <select
                v-model="selectedLanguage"
                class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Languages</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="java">Java</option>
              </select>
              <select
                v-model="sortBy"
                class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="user">By User</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Submissions List -->
        <div class="bg-white shadow-sm rounded-lg border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">
              Code Submissions ({{ filteredSubmissions.length }})
            </h3>
          </div>
          <div v-if="filteredSubmissions.length === 0" class="p-6 text-center text-gray-500">
            No submissions found matching your criteria.
          </div>
          <div v-else class="divide-y divide-gray-200">
            <div 
              v-for="submission in paginatedSubmissions" 
              :key="submission.id"
              class="p-6"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-3 mb-2">
                    <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span class="text-xs font-medium text-blue-600">
                        {{ submission.userEmail.charAt(0).toUpperCase() }}
                      </span>
                    </div>
                    <div>
                      <h4 class="text-sm font-medium text-gray-900">
                        {{ submission.userName || 'Anonymous' }}
                      </h4>
                      <p class="text-sm text-gray-500">{{ submission.userEmail }}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {{ formatDate(submission.timestamp) }}
                    </span>
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      {{ submission.language.charAt(0).toUpperCase() + submission.language.slice(1) }}
                    </span>
                  </div>
                </div>
                
                <button
                  @click="toggleSubmissionView(submission.id)"
                  class="ml-4 text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  {{ expandedSubmissions.has(submission.id) ? 'Hide Code' : 'View Code' }}
                </button>
              </div>
              
              <div v-if="expandedSubmissions.has(submission.id)" class="mt-4">
                <div class="bg-gray-50 rounded-md p-4">
                  <h5 class="text-sm font-medium text-gray-900 mb-2">Code Solution:</h5>
                  <pre class="text-sm text-gray-800 whitespace-pre-wrap font-mono"><code>{{ submission.code }}</code></pre>
                </div>
                
                <div v-if="submission.testResult" class="mt-3">
                  <h5 class="text-sm font-medium text-gray-900 mb-2">Test Output:</h5>
                  <pre class="bg-gray-900 text-green-400 p-3 rounded-md text-sm">{{ submission.testResult }}</pre>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Pagination -->
          <div v-if="totalPages > 1" class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div class="text-sm text-gray-700">
              Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredSubmissions.length) }} of {{ filteredSubmissions.length }} results
            </div>
            <nav class="flex space-x-2">
              <button
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'px-3 py-1 border rounded-md text-sm font-medium',
                  page === currentPage
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
              <button
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>

      <!-- Admin Management Tab -->
      <div v-else-if="activeTab === 'admins'">
        <AdminManagement />
      </div>
    </div>
  </div>
</template>

<script setup>
// Middleware to check admin access
definePageMeta({
  middleware: 'admin-guard'
})

const authStore = useAuthStore()
const submissionsStore = useSubmissionsStore()

const activeTab = ref('submissions')
const searchQuery = ref('')
const selectedLanguage = ref('')
const sortBy = ref('newest')
const currentPage = ref(1)
const itemsPerPage = 20
const expandedSubmissions = ref(new Set())
const error = ref('')

// Load data on mount
onMounted(async () => {
  try {
    await submissionsStore.fetchAllSubmissions()
  } catch (err) {
    error.value = err.message
  }
})

// Computed properties for filtering and pagination
const filteredSubmissions = computed(() => {
  let submissions = [...submissionsStore.allSubmissions]
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    submissions = submissions.filter(sub => 
      sub.userName?.toLowerCase().includes(query) ||
      sub.userEmail?.toLowerCase().includes(query)
    )
  }
  
  // Filter by language
  if (selectedLanguage.value) {
    submissions = submissions.filter(sub => sub.language === selectedLanguage.value)
  }
  
  // Sort submissions
  submissions.sort((a, b) => {
    switch (sortBy.value) {
      case 'newest':
        return b.timestamp.toDate() - a.timestamp.toDate()
      case 'oldest':
        return a.timestamp.toDate() - b.timestamp.toDate()
      case 'user':
        return (a.userName || '').localeCompare(b.userName || '')
      default:
        return 0
    }
  })
  
  return submissions
})

const totalPages = computed(() => Math.ceil(filteredSubmissions.value.length / itemsPerPage))

const paginatedSubmissions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredSubmissions.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Reset pagination when filters change
watch([searchQuery, selectedLanguage, sortBy], () => {
  currentPage.value = 1
})

const toggleSubmissionView = (id) => {
  if (expandedSubmissions.value.has(id)) {
    expandedSubmissions.value.delete(id)
  } else {
    expandedSubmissions.value.add(id)
  }
}

const formatDate = (timestamp) => {
  if (!timestamp) return 'Unknown'
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
