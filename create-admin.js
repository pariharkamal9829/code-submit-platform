// Run this script once to create your first admin
// Replace 'your-email@gmail.com' with your actual Google account email

import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

// Your Firebase config (copy from your project)
const firebaseConfig = {
  // Add your Firebase config here
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function createFirstAdmin() {
  try {
    // Replace with your Google account email
    const adminEmail = 'your-email@gmail.com' // <-- CHANGE THIS
    
    const adminId = adminEmail.replace(/[^a-zA-Z0-9]/g, '_')
    
    await setDoc(doc(db, 'admins', adminId), {
      email: adminEmail,
      displayName: adminEmail.split('@')[0],
      createdAt: new Date(),
      createdBy: 'system'
    })
    
    console.log(`✅ Admin created successfully: ${adminEmail}`)
  } catch (error) {
    console.error('❌ Error creating admin:', error)
  }
}

createFirstAdmin()
