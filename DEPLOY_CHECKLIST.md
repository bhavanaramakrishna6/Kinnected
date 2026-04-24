# 🚀 Kinnected Deployment Checklist

## ⚠️ IMPORTANT: Your website is NOT deployed yet!
You need to follow these steps to make it live.

---

## Step 1: Push Code to GitHub (5 min)

Open terminal in VS Code and run:

```bash
cd "c:/Users/Bhavana Ramakrishna/Downloads/Kinnected/Kinnected-1"
git init
git add .
git commit -m "Prepare for deployment"
```

Then go to https://github.com/new
- Repository name: `kinnected`
- Make it Public
- Click **Create repository**

Copy the commands under "…or push an existing repository from the command line"

Run those commands in your terminal.

---

## Step 2: Get Free MongoDB Database (5 min)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up with Google
3. Click **"Create"** → Choose **"M0 FREE"** → Click **"Create Deployment"**
4. Create a username and password → Click **"Create Database User"**
5. Under **"Where would you like to connect from?"** → Click **"Add My Current IP Address"**
6. Click **"Finish and Close"**
7. Click **"Network Access"** on the left → **"Add IP Address"** → Type `0.0.0.0/0` → Click **"Confirm"**
8. Go back to **"Database"** → Click **"Connect"** → **"Drivers"**
9. Copy the connection string (looks like):
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/kinnected?retryWrites=true&w=majority
   ```
   (Replace `<db_password>` with your actual password!)

---

## Step 3: Get Google Gemini API Key (2 min)

1. Go to https://aistudio.google.com/app/apikey
2. Sign in with Google
3. Click **"Create API Key"**
4. Copy the key

---

## Step 4: Deploy Backend to Render (10 min)

1. Go to https://render.com and sign up
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository `kinnected`
4. Fill in:
   - **Name**: `kinnected-backend`
   - **Runtime**: `Node`
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: `Free`
5. Scroll down to **"Environment Variables"** and add:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | *(paste your MongoDB string from Step 2)* |
| `JWT_SECRET` | `any-random-secret-string-you-want` |
| `GEMINI_API_KEY` | *(paste your key from Step 3)* |
| `FRONTEND_URL` | *(leave blank for now)* |

6. Click **"Create Web Service"**
7. Wait for it to finish (green checkmark)
8. **Copy your backend URL** (looks like `https://kinnected-backend.onrender.com`)

---

## Step 5: Deploy Frontend to Vercel (5 min)

1. Go to https://vercel.com and sign up
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository `kinnected`
4. Change **"Root Directory"** to `frontend`
5. Framework should auto-detect as **Vite**
6. Add Environment Variable:
   - `VITE_API_URL` = `https://kinnected-backend.onrender.com` *(your URL from Step 4)*
7. Click **"Deploy"**
8. Wait for it to finish
9. **Copy your frontend URL** (looks like `https://kinnected-frontend.vercel.app`)

---

## Step 6: Connect Backend to Frontend (2 min)

1. Go back to https://dashboard.render.com
2. Click your `kinnected-backend` service
3. Go to **"Environment"** tab
4. Add:
   - `FRONTEND_URL` = `https://kinnected-frontend.vercel.app` *(your actual Vercel URL)*
5. Click **"Save Changes"**
6. Backend will restart automatically

---

## ✅ YOUR WEBSITE IS NOW LIVE!

### Your URLs:
- **Frontend (Your Website)**: `https://kinnected-frontend.vercel.app`
- **Backend (API)**: `https://kinnected-backend.onrender.com`

### Add to your resume:
```
🔗 Live Demo: https://kinnected-frontend.vercel.app
```

---

## 🧪 Test Your Website

1. Open your Vercel URL
2. Click **"Register"** and create an account
3. Try adding a family member
4. Try the AI chat feature

If everything works → You're done! 🎉

---

## ⏱️ Total Time: ~25-30 minutes

| Step | Time |
|------|------|
| GitHub | 5 min |
| MongoDB | 5 min |
| Gemini API | 2 min |
| Render deploy | 10 min |
| Vercel deploy | 5 min |
| Connect | 2 min |

---

## 🆘 Common Issues

**"CORS error" in browser console?**
→ Make sure `FRONTEND_URL` in Render exactly matches your Vercel URL (including `https://`)

**"Cannot connect to database"?**
→ Check MongoDB IP whitelist includes `0.0.0.0/0`

**Build fails on Render?**
→ Check Render logs for the exact error message

**Page shows "404"?**
→ Make sure Vercel "Root Directory" is set to `frontend`

---

**Start with Step 1 now! Your website will be live in 30 minutes.** 🚀

