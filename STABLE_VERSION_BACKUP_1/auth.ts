import { defineStore } from 'pinia'
import { ref, readonly } from 'vue'

import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  type User 
} from 'firebase/auth'
import { 
  doc, 
  getDoc, 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore'


export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAdmin = ref(false)
  const loading = ref(true)
  const error = ref('')
  const admins = ref<any[]>([])

  const { $firebase } = useNuxtApp()

  // Initialize auth state listener
  const initAuth = () => {
    onAuthStateChanged($firebase.auth, async (firebaseUser) => {
      user.value = firebaseUser
      if (firebaseUser) {
        await checkAdminStatus()
      } else {
        isAdmin.value = false
      }
      loading.value = false
    })
  }

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      error.value = ''
      const provider = new GoogleAuthProvider()
      await signInWithPopup($firebase.auth, provider)
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  // Sign out
  const logout = async () => {
    try {
      await signOut($firebase.auth)
      user.value = null
      isAdmin.value = false
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  // Check if user is admin
  const checkAdminStatus = async () => {
    if (!user.value) return

    try {
      const adminDoc = await getDoc(doc($firebase.db, 'admins', user.value.uid))
      isAdmin.value = adminDoc.exists()
    } catch (err: any) {
      console.error('Error checking admin status:', err)
      isAdmin.value = false
    }
  }

  // Add new admin
  const addAdmin = async (email: string, displayName: string) => {
    if (!isAdmin.value) throw new Error('Only admins can add other admins')

    try {
      await addDoc(collection($firebase.db, 'admins'), {
        email,
        displayName,
        addedBy: user.value?.email,
        addedAt: serverTimestamp()
      })
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  // Remove admin
  const removeAdmin = async (adminId: string) => {
    if (!isAdmin.value) throw new Error('Only admins can remove other admins')

    try {
      await deleteDoc(doc($firebase.db, 'admins', adminId))
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  // Get all admins
  const getAdmins = async () => {
    if (!isAdmin.value) throw new Error('Only admins can view admin list')

    try {
      const adminsCollection = collection($firebase.db, 'admins')
      const snapshot = await getDocs(adminsCollection)
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  // Fetch admins and update state
  const fetchAdmins = async () => {
    try {
      const adminsList = await getAdmins()
      admins.value = adminsList
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  return {
    user: readonly(user),
    isAdmin: readonly(isAdmin),
    loading: readonly(loading),
    error: readonly(error),
    admins: readonly(admins),
    initAuth,
    signInWithGoogle,
    logout,
    checkAdminStatus,
    addAdmin,
    removeAdmin,
    getAdmins,
    fetchAdmins
  }
})
function useNuxtApp(): { $firebase: any } {
    throw new Error('Function not implemented.')
}
