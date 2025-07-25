export default defineNuxtRouteMiddleware((to, from) => {
  const { $firebase } = useNuxtApp()
  
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged($firebase.auth, (user) => {
      unsubscribe() // Clean up the listener
      
      if (!user) {
        // User is not authenticated, redirect to login
        return navigateTo('/login')
      }
      
      // User is authenticated, allow access
      resolve()
    })
  })
})
