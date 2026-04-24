# 🔧 Fix Your Render Deployment

## Problem
Render is using **Node.js v25.9.0** which crashes with `jsonwebtoken`.

## Solution: Update Settings in Render Dashboard

### Step 1: Go to Your Service Settings
1. Open https://dashboard.render.com
2. Click your `kinnected-backend` service
3. Click the **"Settings"** tab (at the top)

### Step 2: Change Build Command
Find **"Build Command"** and change it to:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash && export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && nvm install 20 && nvm use 20 && node -v && cd backend && rm -f bun.lockb && npm install --include=dev && npm run build
```

### Step 3: Change Start Command
Find **"Start Command"** and change it to:
```bash
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && nvm use 20 && cd backend && node -v && npm start
```

### Step 4: Add Environment Variable
1. Scroll down to **"Environment Variables"**
2. Click **"Add Environment Variable"**
3. Add:
   - Key: `NODE_VERSION`
   - Value: `20.18.0`
4. Click **"Save Changes"**

### Step 5: Clear Build Cache & Redeploy
1. Click the **"Manual Deploy"** button
2. Select **"Clear build cache & deploy"**

### Step 6: Check Logs
After it starts deploying, click the **"Logs"** tab. You should see:
```
v20.18.0
```
(instead of `Node.js v25.9.0`)

---

## Alternative: Delete & Recreate (Faster)

If the above doesn't work, the fastest fix is to delete and recreate:

1. In your Render dashboard, click the 3 dots next to your service name
2. Click **"Delete Service"**
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repo again
5. Set these EXACT values:

| Setting | Value |
|---------|-------|
| **Name** | `kinnected-backend` |
| **Runtime** | `Node` |
| **Build Command** | `cd backend && npm install --include=dev && npm run build` |
| **Start Command** | `cd backend && npm start` |
| **Plan** | `Free` |

6. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = your MongoDB string
   - `JWT_SECRET` = your secret
   - `GEMINI_API_KEY` = your Gemini key

7. Click **"Create Web Service"**

This fresh start should pick up `Node 20` from `backend/package.json`.

