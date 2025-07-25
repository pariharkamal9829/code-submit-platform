import { defineStore } from 'pinia'
import { ref, readonly, computed } from 'vue'
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  where,
  serverTimestamp 
} from 'firebase/firestore'
import { useAuthStore } from './auth' // Adjust the path if your auth store is in a different location

export interface Submission {
  id: string
  userId: string
  userEmail: string
  code: string
  language: string
  timestamp: any
  testResult?: string
}

export const useSubmissionsStore = defineStore('submissions', () => {
  const submissions = ref<Submission[]>([])
  const userSubmissions = ref<Submission[]>([])
  const loading = ref(false)
  const error = ref('')

  const { $firebase } = useNuxtApp()
  const authStore = useAuthStore()

  // Submit code solution
  const submitCode = async (code: string, language: string = 'python', testResult?: string) => {
    if (!authStore.user.value) throw new Error('User must be logged in to submit')

    try {
      loading.value = true
      error.value = ''

      await addDoc(collection($firebase.db, 'submissions'), {
        userId: authStore.user.value.uid,
        userEmail: authStore.user.value.email,
        code,
        language,
        testResult: testResult || null,
        timestamp: serverTimestamp()
      })

      // Refresh user submissions
      await fetchUserSubmissions()
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Fetch user's own submissions
  const fetchUserSubmissions = async () => {
    if (!authStore.user.value) return

    try {
      loading.value = true
      const q = query(
        collection($firebase.db, 'submissions'),
        where('userId', '==', authStore.user.value.uid),
        orderBy('timestamp', 'desc')
      )
      
      const snapshot = await getDocs(q)
      userSubmissions.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Submission[]
    } catch (err: any) {
      error.value = err.message
      console.error('Error fetching user submissions:', err)
    } finally {
      loading.value = false
    }
  }

  // Fetch all submissions (admin only)
  const fetchAllSubmissions = async () => {
    if (!authStore.isAdmin) throw new Error('Only admins can view all submissions')

    try {
      loading.value = true
      const q = query(
        collection($firebase.db, 'submissions'),
        orderBy('timestamp', 'desc')
      )
      
      const snapshot = await getDocs(q)
      submissions.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Submission[]
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Get submission statistics
  const getStats = computed(() => {
    const totalSubmissions = submissions.value.length
    const uniqueUsers = new Set(submissions.value.map(s => s.userId)).size
    const recentSubmissions = submissions.value.filter(s => {
      const submissionDate = s.timestamp?.toDate?.() || new Date(s.timestamp)
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
      return submissionDate > dayAgo
    }).length

    return {
      totalSubmissions,
      uniqueUsers,
      recentSubmissions
    }
  })

  return {
    submissions: readonly(submissions),
    userSubmissions: readonly(userSubmissions),
    loading: readonly(loading),
    error: readonly(error),
    submitCode,
    fetchUserSubmissions,
    fetchAllSubmissions,
    getStats
  }
})
function useNuxtApp(): { $firebase: any } {
    throw new Error('Function not implemented.')
}
