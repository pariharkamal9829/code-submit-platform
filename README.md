# Code Submit Platform

A Vue 3 + Nuxt 3 + Firebase application for programming challenge submissions with admin management capabilities.

## Features

### 🔐 Authentication
- **Google Sign-In Only**: Secure authentication using Firebase Auth
- **Role-Based Access Control**: Visitor and Admin roles
- **Admin Management**: Add/remove administrators dynamically

### 👥 User Roles
- **Visitors**: Can solve programming challenges, submit code, and view their submission history
- **Admins**: Full access to submissions dashboard, user management, and platform statistics

### 💻 Programming Challenge System
- **Code Editor**: Syntax-highlighted Python code editor using CodeMirror
- **Live Testing**: Run code directly in browser using Pyodide
- **Code Submission**: Submit solutions with automatic timestamping
- **Submission History**: View and expand previous submissions

### 🛡️ Admin Dashboard
- **Submission Management**: View all user submissions with filtering and search
- **User Statistics**: Track total submissions, unique users, daily activity
- **Admin Management**: Add/remove admin privileges
- **Secure Access**: Protected routes with middleware guards

### 🚀 Technical Stack
- **Frontend**: Vue 3, Nuxt 3, TypeScript
- **Styling**: Tailwind CSS with custom components
- **State Management**: Pinia for reactive state
- **Database**: Firebase Firestore with security rules
- **Authentication**: Firebase Auth with Google provider
- **Code Editor**: CodeMirror 6 with Python syntax highlighting
- **Code Execution**: Pyodide for client-side Python execution

## Project Structure

```
code-submit-platform/
├── assets/
│   └── css/
│       └── main.css              # Global styles and Tailwind imports
├── components/
│   ├── AdminManagement.vue       # Admin user management interface
│   └── CodeEditor.vue           # CodeMirror-based code editor
├── layouts/
│   └── default.vue              # Main app layout with navigation
├── middleware/
│   ├── auth-guard.ts            # Authentication middleware
│   └── admin-guard.ts           # Admin access middleware
├── pages/
│   ├── index.vue                # Programming challenge interface
│   └── admin/
│       └── index.vue            # Admin dashboard
├── plugins/
│   └── firebase.client.ts       # Firebase initialization
├── stores/
│   ├── auth.ts                  # Authentication & admin management
│   └── submissions.ts           # Code submission management
├── firestore.rules              # Firebase security rules
├── nuxt.config.ts              # Nuxt configuration
└── package.json                # Dependencies and scripts
```

## Setup Instructions

### 1. Prerequisites
- Node.js 18+ and npm/yarn
- Firebase project with Firestore and Authentication enabled
- Google OAuth credentials configured in Firebase

### 2. Installation

```bash
# Clone and install dependencies
npm install

# Install additional CodeMirror packages if needed
npm install @codemirror/lang-javascript @codemirror/lang-java @codemirror/state @codemirror/view
```

### 3. Firebase Configuration

Create a `.env` file in the root directory:

```env
NUXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NUXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NUXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Firebase Setup

#### Enable Authentication:
1. Go to Firebase Console → Authentication → Sign-in method
2. Enable Google Sign-in provider
3. Add your domain to authorized domains

#### Setup Firestore:
1. Create Firestore database in production mode
2. Deploy the provided security rules from `firestore.rules`

#### Deploy Security Rules:
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init firestore

# Deploy rules
firebase deploy --only firestore:rules
```

### 5. Initial Admin Setup

Since admin management is done through the app, you'll need to manually add the first admin:

1. Sign in to the app with your Google account
2. Get your user UID from Firebase Console → Authentication
3. Add a document in Firestore: `admins/{your-uid}` with fields:
   ```json
   {
     "email": "your-email@domain.com",
     "displayName": "Your Name",
     "createdAt": "2024-01-01T00:00:00Z"
   }
   ```

### 6. Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage Guide

### For Visitors:
1. **Sign In**: Use Google account to authenticate
2. **Solve Challenge**: Read the programming challenge description
3. **Write Code**: Use the integrated Python editor with syntax highlighting
4. **Test Code**: Run code locally using the "Test Run" button
5. **Submit**: Submit your solution when satisfied
6. **Review**: View submission history and previous attempts

### For Admins:
1. **Dashboard Access**: Navigate to `/admin` (protected route)
2. **View Statistics**: Monitor platform usage and user activity
3. **Review Submissions**: Browse all user submissions with search/filter
4. **Manage Admins**: Add/remove administrator privileges
5. **Export Data**: View and analyze submission patterns

## Security Features

### Firebase Security Rules:
- **Authentication Required**: All operations require valid authentication
- **Role-Based Access**: Admins can access all data, users only their own
- **Submission Protection**: Users can't modify others' submissions
- **Admin-Only Operations**: Admin management restricted to existing admins

### Middleware Protection:
- **Auth Guard**: Protects authenticated routes
- **Admin Guard**: Restricts admin-only pages
- **Error Handling**: Graceful handling of unauthorized access

### Data Privacy:
- **User Isolation**: Users see only their own submission history
- **Admin Oversight**: Admins can monitor without exposing user details unnecessarily
- **Secure State Management**: Pinia stores handle sensitive data properly

## Future Enhancements

### Planned Features:
- **Multiple Challenges**: Support for different programming problems
- **Language Support**: Add JavaScript, Java, C++ challenge options  
- **Automated Testing**: Unit test integration for submissions
- **Leaderboards**: Performance tracking and rankings
- **Code Review**: Admin feedback and scoring system
- **Export Tools**: CSV/JSON export for submission data
- **Analytics Dashboard**: Advanced usage statistics and insights

### Technical Improvements:
- **SSR Support**: Enable server-side rendering for better SEO
- **PWA Features**: Offline capability and app-like experience
- **Mobile Optimization**: Enhanced mobile code editing experience
- **Performance**: Code splitting and lazy loading optimizations

## Troubleshooting

### Common Issues:

1. **Firebase Configuration Errors**:
   - Verify environment variables are set correctly
   - Check Firebase project settings match `.env` file
   - Ensure Authentication and Firestore are enabled

2. **Admin Access Issues**:
   - Verify admin document exists in Firestore
   - Check security rules are deployed correctly
   - Clear browser cache and re-authenticate

3. **Code Editor Problems**:
   - Ensure CodeMirror dependencies are installed
   - Check browser console for JavaScript errors
   - Verify Pyodide loads correctly (network connection required)

4. **Build Errors**:
   - Run `npm install` to ensure all dependencies are present
   - Check Node.js version compatibility (18+)
   - Clear `.nuxt` folder and rebuild: `rm -rf .nuxt && npm run dev`

### Development Tips:
- Use browser dev tools to monitor Firebase operations
- Check Firestore security rules tab for access denials
- Enable Firebase debug mode for detailed error messages
- Use Vue DevTools for state management debugging

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make changes and test thoroughly
4. Commit with clear messages: `git commit -m "Add feature description"`
5. Push and create a pull request

## License

This project is licensed under the MIT License. See LICENSE file for details.

---

**Built with ❤️ using Vue 3, Nuxt 3, and Firebase**
