// Emergency admin creator - Run this in browser console on your app
// Go to your app, open browser DevTools (F12), go to Console tab, and paste this code

async function makeAdminEmergency() {
  try {
    const { $firebase } = useNuxtApp()
    const { doc, setDoc } = await import('firebase/firestore')
    
    const user = $firebase.auth.currentUser
    if (!user) {
      console.error('No user signed in!')
      return
    }
    
    const adminId = user.email.replace(/[^a-zA-Z0-9]/g, '_')
    
    await setDoc(doc($firebase.db, 'admins', adminId), {
      email: user.email,
      displayName: user.displayName || user.email.split('@')[0],
      createdAt: new Date(),
      createdBy: 'emergency'
    })
    
    console.log('✅ Admin created successfully!')
    alert('Admin created! Refresh the page.')
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

// Run it
makeAdminEmergency()
