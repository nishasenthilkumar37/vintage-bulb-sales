# 🚀 Deployment Guide for VOLTA & CO. Vintage Bulbs

This guide provides step-by-step instructions for deploying the **VOLTA & CO.** full-stack application to any popular hosting platform.

---

## ⚡ Option 1: Deploy to Render (Recommended Full-Stack Free)

Render allows you to deploy the complete Node.js + React + MongoDB application on their free tier in 2 minutes:

1. Push this repository to **GitHub**.
2. Go to [Render.com](https://render.com) and create a free account.
3. Click **"New +"** -> **"Web Service"** -> Connect your GitHub repository.
4. Set the following build settings:
   - **Environment:** `Node`
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
5. (Optional) Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection URI (or leave blank to use the built-in resilient in-memory database automatically).
6. Click **"Deploy Web Service"**.

Your live URL will be generated (e.g. `https://volta-vintage-bulbs.onrender.com`).

---

## ⚡ Option 2: Deploy to Vercel (1-Click Frontend & Serverless)

The project includes a ready-to-go `vercel.json` configuration:

1. Install the Vercel CLI (or connect via GitHub on [vercel.com](https://vercel.com)):
   ```bash
   npx vercel
   ```
2. Follow the prompt to deploy.
3. Vercel will automatically build the React frontend and deploy the Express API routes as serverless functions.

---

## ⚡ Option 3: Deploy with Docker & Docker Compose (1-Command)

If you have Docker installed on your machine or VPS (DigitalOcean, AWS, Linode):

```bash
# Build and run the app + MongoDB containers in background
docker compose up -d --build
```

- **Live Storefront & API:** `http://localhost:5000`
- **MongoDB Database:** `localhost:27017`

To stop the containers:
```bash
docker compose down
```

---

## ⚡ Option 4: Deploy to Railway

1. Go to [Railway.app](https://railway.app) and sign in with GitHub.
2. Click **"New Project"** -> **"Deploy from GitHub repo"**.
3. Railway will auto-detect the root `package.json`, install dependencies, run `npm run build`, and launch the web server.
4. Click **"Add a Service"** -> **"Database"** -> **"MongoDB"** to attach a live persistent MongoDB database.

---

## ⚡ Option 5: Deploy Frontend to Netlify

The project includes `netlify.toml` for zero-configuration Netlify deployments:

1. Drag-and-drop the `client/dist` folder to [Netlify Drop](https://app.netlify.com/drop), OR
2. Connect your GitHub repository with:
   - **Base directory:** `client`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

---

## 🔑 Environment Variables Reference

| Variable | Description | Default / Example |
|---|---|---|
| `PORT` | Server listening port | `5000` |
| `NODE_ENV` | Runtime environment | `production` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/vintage_bulb_db` |
| `VITE_API_URL` | Frontend API base URL | `""` (relative `/api` in production) |

---

## ✅ Verifying Production Health

Once deployed, you can verify your service status anytime by visiting:
`https://your-domain.com/api/health`
