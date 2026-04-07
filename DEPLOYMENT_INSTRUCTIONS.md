# 🚀 DEPLOYMENT INSTRUCTIONS (Step-by-Step)

**Last Updated:** April 7, 2026  
**Status:** Ready for Vercel Deployment  
**Estimated Time:** 15-30 minutes  

---

## ⚠️ PREREQUISITES (MUST DO FIRST)

### 1. MongoDB Atlas IP Whitelist Configuration
**THIS IS CRITICAL - DEPLOYMENT WILL FAIL WITHOUT THIS**

1. Go to: https://cloud.mongodb.com
2. Login to your account
3. Select your cluster (Cluster0)
4. Go to **Security → Network Access**
5. Click **"Add IP Address"**
6. Enter: `0.0.0.0/0`
7. Click **"Confirm"**
8. Wait for it to finish updating (status changes from "PENDING" to "ACTIVE")

**Why?** Vercel uses dynamic IPs. You MUST whitelist all IPs for the connection to work.

### 2. GitHub Repository Setup
- ✅ Already done (your repo is clean)
- Just ensure you've committed all changes

### 3. Vercel Account
- Create account at: https://vercel.com
- Connect your GitHub account

---

## 🔧 LOCAL TESTING (DO THIS FIRST)

### Step 1: Verify Backend Starts
```bash
cd "E:\Anas Todo List\server"
npm run dev
```

**Expected Output:**
```
✓ MongoDB Connected: cluster0.xxx.mongodb.net/todo
✓ Server running on http://localhost:5000
```

**If it fails:**
- Check MongoDB Atlas is reachable
- Verify MONGO_URI in server/.env is correct
- IP whitelist might not be active yet (wait 5 minutes)

### Step 2: Verify Frontend Builds
```bash
cd "E:\Anas Todo List\client"
npm run build
```

**Expected Output:**
```
✓ built in 2.34s
```

**If it fails:**
- Check for console errors
- Verify all imports are correct
- Try: `npm install` again

### Step 3: Test Frontend Locally
```bash
cd "E:\Anas Todo List\client"
npm run dev
```

**Expected Output:**
```
  VITE v4.4.9  ready in 123 ms
  ➜  Local:   http://localhost:5173/
```

**Manual Testing Checklist (while back + front running):**
- [ ] Open http://localhost:5173
- [ ] See login page
- [ ] Click "Create Account"
- [ ] Register: username=testuser, email=test@example.com, password=Test123456
- [ ] Should redirect to dashboard
- [ ] Click "+ New Task"
- [ ] Create a task
- [ ] Task appears in list
- [ ] Edit task - changes persist
- [ ] Delete task - removed from list
- [ ] Logout
- [ ] Login again
- [ ] Refresh page - session persists (token in localStorage)
- [ ] See task still there

**If all pass:** ✅ Ready for deployment!

---

## 📦 DEPLOYMENT PROCESS

### OPTION A: Deploy via Vercel Web Dashboard (Easiest)

#### Step 1: Deploy Backend First
1. Go to https://vercel.com/dashboard
2. Click **"Create new project"**
3. Insert GitHub repo
4. Select **"Other"** as framework (not Next.js)
5. Configure:
   - **Root Directory:** `server`
   - **Build Command:** `npm run build` (leave empty, it's just Node.js)
   - **Output Directory:** Leave empty
6. Add Environment Variables:
   ```
   MONGO_URI = (copy from your .env)
   JWT_SECRET = (copy from your .env)
   JWT_EXPIRES_IN = 1d
   NODE_ENV = production
   FRONTEND_URL = https://your-frontend.vercel.app
   ```
7. Click **"Deploy"**
8. Wait for deployment to complete
9. Copy the Backend URL (e.g., `https://todo-api-xxx.vercel.app`)

#### Step 2: Deploy Frontend
1. Back on Vercel dashboard, click **"Create new project"**
2. Insert same GitHub repo
3. Select **"Other"** as framework
4. Configure:
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add Environment Variables:
   ```
   VITE_API_URL = https://todo-api-xxx.vercel.app/api
   ```
   (Use the backend URL from Step 1)
6. Click **"Deploy"**
7. Wait for deployment
8. Copy the Frontend URL

#### Step 3: Test Production
1. Open: `https://your-frontend.vercel.app`
2. Run through manual testing checklist again
3. Check DevTools Network tab - API calls should go to your backend URL

---

### OPTION B: Deploy via Vercel CLI (Faster if You Know Command Line)

#### Install Vercel CLI
```bash
npm install -g vercel
```

#### Deploy Backend
```bash
cd "E:\Anas Todo List\server"
vercel --prod
# Answer prompts:
# - Link existing project: No
# - Project name: todo-api (or similar)
# - Directory: ./
# - Build: (default)
# - Output: (leave empty)
```

#### Get Backend URL
```
Deployed to: https://todo-api-xxx.vercel.app
```

#### Update Frontend .env
```bash
cd "E:\Anas Todo List\client"
# Edit .env:
VITE_API_URL=https://todo-api-xxx.vercel.app/api
```

#### Deploy Frontend
```bash
cd "E:\Anas Todo List\client"
vercel --prod
# Answer prompts similarly
```

---

## ✅ POST-DEPLOYMENT VERIFICATION

### Step 1: Check Backend Health
Open in browser:
```
https://your-backend.vercel.app/api/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Health check passed"
}
```

### Step 2: Test API Endpoint
Open in browser:
```
https://your-backend.vercel.app/
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Todo API Server is running",
  "version": "1.0.0",
  "endpoints": { ... }
}
```

### Step 3: Manual Test Full Flow
1. Open: `https://your-frontend.vercel.app`
2. Register new user
3. Login
4. Create task
5. Edit task
6. Delete task
7. Logout
8. Open DevTools (F12)
9. Go to Network tab
10. Login again
11. Check: API calls show `https://your-backend.vercel.app/api`
12. Create task
13. Verify response comes back successfully
14. Check localStorage has token: `F12 → Application → localStorage → token`

### Step 4: Test Session Persistence
1. Create a task
2. Refresh page
3. Task should still appear
4. Token should still be in localStorage

---

## 🐛 TROUBLESHOOTING DEPLOYMENT ERRORS

### Error: "Cannot find module 'mongoose'"
**Cause:** Dependencies not installed  
**Fix:** Ensure package-lock.json is committed to git

### Error: "MONGO_URI is not set"
**Cause:** Environment variables not configured  
**Fix:** Add environment variables in Vercel dashboard (see deployment steps)

### Error: "Connection to MongoDB fails"
**Cause:** IP whitelist not configured  
**Fix:** Go to MongoDB Atlas → Network Access → Add 0.0.0.0/0

### Error: "API calls return 404"
**Cause:** Backend URL in frontend .env is wrong  
**Fix:** Update `VITE_API_URL` to correct backend URL

### Error: "CORS error"
**Cause:** Frontend origin not in CORS allowlist  
**Fix:** Add your frontend URL to `origin` array in server.js

### Blank screen on frontend
**Cause:** Routing issue  
**Fix:** Ensure vercel.json has rewrite rules for SPA

### API returns "Cannot GET /some-path"
**Cause:** Route doesn't exist  
**Fix:** Check server routes are all prefixed with /api/

---

## 📝 ENVIRONMENT VARIABLES REFERENCE

### Backend (server/.env on Vercel dashboard)
```env
MONGO_URI=mongodb+srv://Anas1412:Anasdemo2005@cluster0.x0jkv6j.mongodb.net/todo?appName=Cluster0
JWT_SECRET=78f9efdf4417485d107e57f01a8d06891adbefa129825becbfd0c2b48794b7fc
JWT_EXPIRES_IN=1d
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (client/.env on Vercel dashboard)
```env
VITE_API_URL=https://your-backend.vercel.app/api
```

---

## 🔐 IMPORTANT SECURITY NOTES

### Before Going to Production
1. ✅ Change JWT_SECRET to a new random value
   ```bash
   # Generate new secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   Then update `JWT_SECRET` in Vercel dashboard

2. ✅ Change MongoDB password in production
   - Go to MongoDB Atlas
   - Create new database user with strong password
   - Update MONGO_URI in Vercel dashboard

3. ✅ Enable HTTPS
   - Vercel auto-enables HTTPS (no action needed)
   - Ensure your frontend API calls use HTTPS

4. ✅ Set NODE_ENV to "production"
   - Already configured in Vercel

### Remove Sensitive Information
- ✅ Never commit .env files (already in .gitignore)
- ✅ Never commit node_modules (already in .gitignore)
- ✅ Use environment variables for all secrets (already done)

---

## 📊 DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] MongoDB Atlas IP whitelist set to 0.0.0.0/0
- [ ] Local testing passed (all manual tests work)
- [ ] npm run build succeeds
- [ ] Git status is clean
- [ ] All sensitive data removed from code
- [ ] Backend .env has all required variables
- [ ] Frontend .env has VITE_API_URL

### During Deployment
- [ ] Backend deployed first
- [ ] Copy backend URL
- [ ] Update frontend .env with backend URL
- [ ] Frontend deployed second
- [ ] Environment variables set in Vercel dashboard

### Post-Deployment
- [ ] Backend health check endpoint works
- [ ] Frontend loads without errors
- [ ] Registration works
- [ ] Login works
- [ ] API calls use correct backend URL
- [ ] Tasks can be created/edited/deleted
- [ ] Session persists on refresh
- [ ] Logout works
- [ ] Clean git history

---

## 📞 IF DEPLOYMENT FAILS

### Step 1: Check Logs
- Go to Vercel dashboard
- Click on the failed deployment
- View build logs
- Read error message carefully

### Step 2: Common Fixes
1. **Build fails:** Missing dependencies
   - Solution: `npm install` locally, commit, redeploy

2. **Runtime fails:** Wrong environment variables
   - Solution: Add missing var to Vercel dashboard, redeploy

3. **API fails:** MongoDB connection
   - Solution: Check IP whitelist, check MONGO_URI

4. **Frontend fails:** API URL wrong
   - Solution: Update VITE_API_URL in Vercel dashboard

### Step 3: Redeploy
- Fix the issue
- Commit changes to git
- Vercel auto-deploys from main branch

---

## 🎉 SUCCESS INDICATORS

✅ All of these should work:
1. Backend API responds to requests
2. Frontend loads without console errors
3. Can register new user
4. Can login with credentials
5. Can create/read/update/delete tasks
6. API calls use correct backend URL
7. Session persists across page refreshes
8. Logout clears session properly
9. Network tab shows successful API responses
10. localStorage contains valid JWT token

---

## 📚 REFERENCE LINKS

- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas:** https://cloud.mongodb.com
- **GitHub:** https://github.com

---

**Deployment Guide Version:** 1.0  
**Last Updated:** April 7, 2026  
**Status:** Ready for Production  

Good luck! 🚀
