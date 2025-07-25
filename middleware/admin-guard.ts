export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  
  // Check if user is authenticated
  if (!authStore.user) {
    return navigateTo('/')
  }
  
  // Check if user is admin
  if (!authStore.isAdmin) {
    // Check admin status if not already checked
    await authStore.checkAdminStatus()
    
    // If still not admin after checking, redirect to home
    if (!authStore.isAdmin) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Access denied. Admin privileges required.',
      })
    }
  }
})
