<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div class="mt-8 space-y-6">
        <button
          @click="signInWithGoogle"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $firebase } = useNuxtApp()

const signInWithGoogle = async () => {
  try {
    const result = await $firebase.signInWithGoogle()
    console.log('User signed in:', result.user)
    // Redirect to home page after successful login
    await navigateTo('/')
  } catch (error) {
    console.error('Sign-in error:', error)
    alert('Sign-in failed: ' + error.message)
  }
}
</script>