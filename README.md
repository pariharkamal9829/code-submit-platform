# 🚀 Code Submit Platform

A modern, feature-rich Vue 3 + Nuxt 3 + Firebase application for programming challenge submissions with enhanced UI, multi-language support, and comprehensive admin management.

## ✨ Features

### 🔐 Authentication System
- **Google Sign-In Integration**: Secure authentication using Firebase Auth
- **Role-Based Access Control**: Automatic user and admin role management
- **Real-time Auth State**: Persistent login sessions with automatic state management
- **Admin Management**: Dynamic admin privileges with secure access control

### � Enhanced Programming Challenge System
- **Multi-Language Code Editor**: Support for Python, C++, Java, and JavaScript
- **Syntax Highlighting**: Professional code editor with language-specific highlighting
- **Live Code Testing**: Real-time test case validation with visual feedback
- **Language Templates**: Pre-built code templates for each supported language
- **Test Case System**: Comprehensive test validation with pass/fail indicators
- **Real-time Submission Updates**: Live updates when code is submitted

### 🎨 Modern UI/UX Design
- **Dark/Light Mode Toggle**: Smooth animated theme switching with system preference detection
- **Professional Animations**: Custom fade-in, slide-in, bounce-in, and float animations
- **Glassmorphism Effects**: Modern glass-like design elements
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Header**: User profile dropdown with smooth transitions
- **Custom Loading States**: Beautiful loading animations and feedback

### � Advanced Admin Dashboard
- **Comprehensive Statistics**: Total submissions, unique users, daily activity tracking
- **Submission Management**: View all user submissions with advanced filtering and search
- **User Management**: Add/remove admin privileges dynamically
- **Real-time Updates**: Live dashboard updates using Firebase listeners
- **Admin-Only Features**: Secure access to platform management tools

### 🛡️ Security & Privacy
- **User Isolation**: Users can only view their own submissions
- **Firebase Security Rules**: Comprehensive database access control
- **Protected Routes**: Middleware-based route protection
- **Secure Admin Access**: Multi-layer admin verification
- **Data Privacy**: Complete separation of user data and admin oversight

## 🚀 Technical Stack

### Frontend
- **Vue 3**: Latest Vue.js with Composition API
- **Nuxt 3**: Full-stack framework with SSR capabilities
- **TypeScript**: Type-safe development with modern JavaScript features
- **Tailwind CSS**: Utility-first CSS framework with custom animations

### Backend & Database
- **Firebase Firestore**: NoSQL database with real-time capabilities
- **Firebase Auth**: Secure authentication with Google provider
- **Firebase Security Rules**: Database-level access control

### State Management
- **Pinia**: Modern state management with TypeScript support
- **Composables**: Reusable logic with Vue 3 Composition API

### Development Tools
- **ESLint**: Code quality and consistency
- **Hot Module Replacement**: Fast development experience
- **Environment Variables**: Secure configuration management

## 📁 Project Structure

```
code-submit-platform/
├── 📦 assets/
│   └── css/
│       ├── main.css              # Global styles and base imports
│       └── tailwind.css          # Custom animations and Tailwind styles
├── 🧩 components/
│   ├── AdminManagement.vue       # Admin user management interface
│   ├── AppHeader.vue             # Universal header with profile dropdown
│   ├── AppNavigation.vue         # Navigation component
│   ├── CodeEditor.vue            # CodeMirror-based code editor
│   └── LoginForm.vue             # Authentication form component
├── 🔄 composables/
│   ├── useStore.ts               # Store utilities and helpers
│   └── useTheme.js               # Theme management composable
├── 🏗️ layouts/
│   └── default.vue               # Main app layout with navigation
├── 🛡️ middleware/
│   ├── admin.ts                  # Admin route protection
│   ├── auth.js                   # Authentication middleware
│   ├── auth.ts                   # TypeScript auth middleware
│   └── guest.ts                  # Guest-only route protection
├── 📄 pages/
│   ├── admin/
│   │   └── index.vue             # Admin dashboard
│   ├── challenge.vue             # Multi-language coding interface
│   ├── index.vue                 # Landing page with authentication
│   └── login.vue                 # Login page
├── 🔌 plugins/
│   └── firebase.client.js        # Firebase configuration and initialization
├── 🗄️ stores/
│   ├── admin.ts                  # Admin management store
│   ├── auth.ts                   # Authentication and user management
│   └── submissions.ts            # Submission handling and statistics
├── 🌐 public/
│   ├── favicon.ico               # Site favicon
│   └── robots.txt                # SEO robots configuration
├── ⚙️ Configuration Files
│   ├── .env                      # Environment variables (not in git)
│   ├── .firebaserc               # Firebase project configuration
│   ├── .gitignore                # Git ignore rules
│   ├── app.vue                   # Root Vue component
│   ├── firebase.json             # Firebase hosting/functions config
│   ├── firestore.rules           # Firebase security rules
│   ├── nuxt.config.ts            # Nuxt configuration with Tailwind
│   ├── package.json              # Dependencies and scripts
│   ├── package-lock.json         # Locked dependency versions
│   └── tsconfig.json             # TypeScript configuration
└── 📚 README.md                  # This comprehensive guide
```

## 🔧 Setup Instructions

### Prerequisites
- **Node.js 20.11.0+** and npm
- **Firebase Project** with Firestore and Authentication enabled
- **Google OAuth** credentials configured in Firebase Console

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/pariharkamal9829/code-submit-platform.git
cd code-submit-platform

# Install dependencies
npm install
```

### 2. Firebase Configuration

Create a `.env` file in the root directory:

```env
NUXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NUXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NUXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 3. Firebase Setup

#### Enable Authentication:
1. Go to Firebase Console → Authentication → Sign-in method
2. Enable **Google Sign-in provider**
3. Add your domain to **Authorized domains**

#### Setup Firestore:
1. Create Firestore database in **production mode**
2. Deploy the security rules from `firestore-rules.txt`

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

### 4. Initial Admin Setup

**Method 1: Manual Setup**
1. Sign in to the app with your Google account
2. Get your user UID from Firebase Console → Authentication
3. Add a document in Firestore: `admins/{your-uid}` with fields:
   ```json
   {
     "email": "your-email@domain.com",
     "displayName": "Your Name",
     "addedAt": "2025-01-25T00:00:00Z"
   }
   ```

**Method 2: Using Emergency Script**
```bash
node emergency-admin.js your-email@domain.com
```

### 5. Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Usage Guide

### For Regular Users:
1. **🔐 Sign In**: Use Google account to authenticate securely
2. **📝 Choose Language**: Select from Python, C++, Java, or JavaScript
3. **💻 Write Code**: Use the professional code editor with syntax highlighting
4. **🧪 Test Code**: Run test cases to validate your solution
5. **📤 Submit**: Submit your solution and see real-time feedback
6. **📊 Track Progress**: View your personal submission history and test results

### For Administrators:
1. **🔧 Dashboard Access**: Navigate to `/admin` (protected route)
2. **📈 View Statistics**: Monitor platform usage and user engagement
3. **👥 Review Submissions**: Browse all user submissions with advanced search
4. **⚙️ Manage Admins**: Add/remove administrator privileges
5. **📋 Export Data**: Analyze submission patterns and user behavior

## 🌟 Key Features Showcase

### Multi-Language Code Editor
- **Python**: Default `def two_sum(nums, target):` template
- **C++**: Complete `#include` headers with `vector<int>` implementation
- **Java**: Full class structure with `public int[]` method
- **JavaScript**: Modern ES6+ `function twoSum(nums, target)` template

### Advanced Test System
- **4 Comprehensive Test Cases**: Cover edge cases and normal scenarios
- **Visual Feedback**: Green/red indicators for pass/fail status
- **Real-time Results**: Instant feedback on code execution
- **Progress Tracking**: See how many tests passed out of total

### Professional UI Elements
- **Smooth Animations**: Custom keyframes for all interactions
- **Theme Persistence**: Remembers user's dark/light mode preference
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Loading States**: Beautiful spinners and progress indicators

## 🔒 Security Features

### Firebase Security Rules
```javascript
// Submissions: Users can only read/write their own
match /submissions/{document} {
  allow read, write: if request.auth != null && 
    request.auth.uid == resource.data.userId;
}

// Admins: Only admins can manage admin list
match /admins/{document} {
  allow read, write: if request.auth != null && 
    exists(/databases/$(database)/documents/admins/$(request.auth.uid));
}
```

### Data Privacy
- **User Isolation**: Complete separation of user submissions
- **Admin Oversight**: Admins can monitor without compromising privacy
- **Secure Authentication**: Google OAuth with Firebase security
- **Protected Routes**: Middleware-based access control

## 🚀 Deployment Options

### Netlify (Recommended)
The project is optimized for Netlify deployment with automatic build configuration.

#### 🔧 Netlify Setup Steps:
1. **Connect Repository**:
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select `pariharkamal9829/code-submit-platform`

2. **Build Configuration**:
   ```toml
   # netlify.toml is already configured with:
   Build command: npm run build
   Publish directory: .output/public
   Node version: 20
   ```

3. **Environment Variables**:
   - Go to Site Settings → Environment Variables
   - Add all Firebase configuration variables:
   ```env
   NUXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NUXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NUXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Deploy**:
   - Click "Deploy site"
   - Netlify will automatically build and deploy your app
   - Get your deployment URL (e.g., `https://amazing-app-123456.netlify.app`)

#### 🔒 Firebase Configuration for Netlify:
- Add your Netlify domain to Firebase Console → Authentication → Settings → Authorized domains
- Example: `amazing-app-123456.netlify.app`

#### 🐛 Build Issue Fix:
The `.nuxt/tsconfig.app.json` missing file issue has been resolved with:
- ✅ **Updated package.json**: Added `nuxt prepare` to build process
- ✅ **Added netlify.toml**: Proper Netlify configuration
- ✅ **Updated nuxt.config.ts**: Netlify preset and build optimization

### Vercel (Alternative)
```bash
# Connect GitHub repository
# Auto-deployment on push to main branch
# Environment variables configured in dashboard
```

### Firebase Hosting (Alternative)
```bash
firebase init hosting
firebase deploy
```

## 🛠️ Development Features

### Hot Reload & Development
- **Fast Refresh**: Instant updates during development
- **Error Overlay**: Clear error messages with stack traces
- **TypeScript Support**: Full type checking and IntelliSense
- **ESLint Integration**: Code quality enforcement

### State Management
- **Pinia Stores**: Modern, typed state management
- **Composables**: Reusable logic patterns
- **Real-time Updates**: Firebase listeners for live data
- **Persistent State**: Theme and user preferences saved

## 📈 Performance & Optimization

- **Code Splitting**: Automatic route-based code splitting
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Optimized images and fonts
- **Caching Strategy**: Efficient browser and CDN caching

## 🔄 Version Control & Backup

### Git Workflow
```bash
# Current version on GitHub
git remote -v
# origin https://github.com/pariharkamal9829/code-submit-platform.git
# Ready for Netlify deployment
```

## 🐛 Troubleshooting

### Common Issues & Solutions

**1. Firebase Configuration Errors**
```bash
# Check environment variables
npm run dev
# Verify .env file exists and contains correct values
```

**2. Admin Access Issues**
```bash
# Run emergency admin script
node emergency-admin.js your-email@domain.com
```

**3. Build Errors**
```bash
# Clear cache and reinstall
rm -rf .nuxt node_modules package-lock.json
npm install
npm run dev
```

**4. TypeScript Errors**
```bash
# Check file extensions (.js vs .ts)
# Verify imports and exports
# Clear .nuxt directory
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature-name`
3. **Commit** changes: `git commit -m "Add feature description"`
4. **Push** to branch: `git push origin feature-name`
5. **Create** a Pull Request

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

## 👨‍💻 Author

**Kamlesh Parihar**
- GitHub: [@pariharkamal9829](https://github.com/pariharkamal9829)
- Project: [code-submit-platform](https://github.com/pariharkamal9829/code-submit-platform)

---

**🎉 Built with ❤️ using Vue 3, Nuxt 3, Firebase, and modern web technologies**

### Quick Links
- 🌐 [Live Demo](#) (Configure your deployment URL)
- 📚 [Documentation](#usage-guide)
- 🐛 [Report Issues](https://github.com/pariharkamal9829/code-submit-platform/issues)
- 💡 [Feature Requests](https://github.com/pariharkamal9829/code-submit-platform/issues/new)

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
