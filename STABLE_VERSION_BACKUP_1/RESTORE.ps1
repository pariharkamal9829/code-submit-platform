# RESTORE STABLE VERSION 1 SCRIPT
# Run this script from the project root to restore the stable version

# Copy files from backup
Copy-Item "STABLE_VERSION_BACKUP_1\package.json" "." -Force
Copy-Item "STABLE_VERSION_BACKUP_1\nuxt.config.ts" "." -Force
Copy-Item "STABLE_VERSION_BACKUP_1\firebase.client.js" "plugins\" -Force
Copy-Item "STABLE_VERSION_BACKUP_1\auth.ts" "stores\" -Force
Copy-Item "STABLE_VERSION_BACKUP_1\submissions.ts" "stores\" -Force

Write-Host "✅ Stable version 1 has been restored!"
Write-Host "🔧 Run 'npm install' if needed"
Write-Host "🚀 Run 'npm run dev' to start the development server"
