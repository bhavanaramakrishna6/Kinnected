# 🚀 Kinnected Deployment Guide

This guide will help you deploy **Kinnected** so you can add a working link to your resume.

---

## 📋 Prerequisites

1. **GitHub Account** - Push your code to a public repository
2. **MongoDB Atlas Account** - Free tier available
3. **Google AI Studio Account** - For Gemini API key (free tier available)
4. **Render Account** - For hosting (free tier available)
5. **Vercel Account** (Alternative) - For frontend hosting (free tier)

---

## 🔧 Step 1: Prepare Environment Variables

### Backend Environment Variables (`backend/.env`)

```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_random_string_min_32_chars
GEMINI_API_KEY=your_google_gemini_api_key
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Frontend Environment Variables (`frontend/.env`)

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## 🗄️ Step 2: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (M0 tier)
3. Create a database user and password
4. Whitelist all IP addresses (`0.0.0.0/0`) for deployment
5. Get your connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/kinnected?retryWrites=true&w=majority
   ```

---

## 🔑 Step 3: Get Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Copy the key for your backend environment variables

---

## 🚀 Step 4: Deploy Backend to Render

### Option A: Using Render Blueprint (Recommended)

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click **"New +"** → **"Blueprint"**
4. Connect your GitHub repository
5. Render will detect `render.yaml` and create services automatically
6. Add your environment variables in the Render dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `GEMINI_API_KEY`
7. Deploy!

### Option B: Manual Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo
4. Configure:
   - **Name**: `kinnected-backend`
   - **Runtime**: `Node`
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free
5. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret
   - `GEMINI_API_KEY`: Your Gemini API key
   - `FRONTEND_URL`: Your frontend URL (update after frontend deployment)
6. Click **Create Web Service**

---

## 🌐 Step 5: Deploy Frontend

### Option A: Vercel (Recommended for Frontend)

1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variable:
   - `VITE_API_URL`: Your Render backend URL (e.g., `https://kinnected-backend.onrender.com`)
5. Deploy!

### Option B: Netlify

1. Go to [Netlify](https://netlify.com)
2. Drag and drop your `frontend/dist` folder, or connect Git
3. If using Git:
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/dist`
4. Add environment variable `VITE_API_URL`
5. Deploy!

### Option C: Render Static Site

Already configured in `render.yaml` - deploys automatically with the blueprint.

---

## 🔗 Step 6: Connect Frontend & Backend

After both are deployed:

1. **Update Backend CORS**:
   - Go to your Render backend dashboard
   - Update `FRONTEND_URL` environment variable with your actual frontend URL
   - The backend will restart automatically

2. **Verify Connection**:
   - Visit your frontend URL
   - Check browser console for API errors
   - Test login/register functionality

---

## ✅ Step 7: Verify Deployment

### Health Check
Visit: `https://your-backend-url.onrender.com/health`

Should return:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production"
}
```

### API Test
Visit: `https://your-backend-url.onrender.com/api/auth`

Should return a 404 or method not allowed (which is expected).

### Frontend Test
Visit your frontend URL and try:
- Register a new account
- Log in
- Add a family member
- Use the AI chat feature

---

## 📱 Add to Resume

Add this link to your resume:
```
🌐 Live Demo: https://your-frontend-url.vercel.app
```

Or if using Render for both:
```
🌐 Live Demo: https://kinnected-frontend.onrender.com
```

---

## 💡 Pro Tips for Resume

1. **Custom Domain** (Optional):
   - Vercel: Go to Project Settings → Domains
   - Render: Go to Settings → Custom Domains
   - Use something like `kinnected.yourname.dev`

2. **GitHub README**:
   Add deployment badges to your README:
   ```markdown
   ![Render](https://img.shields.io/badge/Render-deployed-brightgreen)
   ![Vercel](https://img.shields.io/badge/Vercel-deployed-black)
   ```

3. **Screenshot**:
   Take a screenshot of your deployed app and add it to your GitHub README

4. **Keep it Running**:
   - Render free tier spins down after 15 min of inactivity
   - First request after spin-down takes ~30 seconds
   - Consider adding a uptime monitor (e.g., UptimeRobot) to keep it warm

---

## 🐛 Troubleshooting

### CORS Errors
- Verify `FRONTEND_URL` in backend matches exactly (including `https://`)
- No trailing slashes

### MongoDB Connection Failed
- Check IP whitelist in MongoDB Atlas (use `0.0.0.0/0`)
- Verify connection string format

### 401 Unauthorized
- Check JWT_SECRET is set correctly
- Clear browser localStorage and try again

### AI Features Not Working
- Verify GEMINI_API_KEY is valid
- Check browser console for API errors

### Build Failures
- Make sure `npm install` works locally
- Check TypeScript compiles: `cd backend && npm run build`

---

## 📁 File Structure After Deployment Setup

```
kinnected/
├── backend/
│   ├── .env                 # ⚠️ DO NOT COMMIT
│   ├── .env.example         # ✅ Safe to commit
│   └── server.ts            # ✅ Updated with dynamic CORS
├── frontend/
│   ├── .env                 # ⚠️ DO NOT COMMIT
│   ├── .env.example         # ✅ Safe to commit
│   └── src/
│       └── main.tsx         # ✅ Updated with dynamic API URL
├── render.yaml              # ✅ Render deployment config
└── DEPLOYMENT.md            # ✅ This file
```

---

## 🎯 Quick Reference

| Service | Purpose | Free Tier |
|---------|---------|-----------|
| MongoDB Atlas | Database | ✅ 512MB |
| Render | Backend API | ✅ Always on (with limitations) |
| Vercel | Frontend | ✅ Unlimited |
| Google AI | Gemini API | ✅ Generous free tier |

---

## 📝 Environment Variables Summary

### Backend
| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | ✅ |
| `JWT_SECRET` | Secret for JWT tokens | ✅ |
| `GEMINI_API_KEY` | Google AI API key | ✅ |
| `PORT` | Server port | ✅ |
| `NODE_ENV` | `production` or `development` | ✅ |
| `FRONTEND_URL` | Frontend URL for CORS | ✅ |

### Frontend
| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | ✅ |

---

**Good luck with your deployment! 🚀**
