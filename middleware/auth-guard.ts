export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  // Check if user is authenticated
  if (!authStore.user) {
    // Redirect to home page if not authenticated
    return navigateTo('/')
  }
})
