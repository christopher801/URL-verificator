# 🔒 SiteGuard Verificator - Cyberpunk URL Security Scanner

![Cyberpunk Theme](https://img.shields.io/badge/Theme-Cyberpunk-00f3ff?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2-61dafb?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)
![License](https://img.shields.io/badge/License-MIT-bd00ff?style=for-the-badge)

A futuristic **full-stack web application** with a stunning **cyberpunk aesthetic** that allows users to verify the security status of any website URL using Google Safe Browsing API.

## 🎯 Features

### 🎨 Design
- **Cyberpunk/Hacker Aesthetic** with neon colors
- Dark backgrounds with glowing effects
- Animated loading states and transitions
- Matrix-style grid background
- Futuristic typography (Orbitron, Rajdhani, Share Tech Mono)
- Fully responsive design

### ⚡ Functionality
- Real-time URL security verification
- Integration with Google Safe Browsing API
- Three security status levels:
  - 🟢 **SAFE** - No threats detected
  - 🟡 **SUSPICIOUS** - Proceed with caution
  - 🔴 **MALICIOUS** - Dangerous website
- Client-side URL validation
- Error handling and user feedback
- Mock mode for testing without API key

## 🛠️ Tech Stack

### Frontend
- **React 18** (created with Vite)
- **Bootstrap 5** for responsive layout
- **Axios** for HTTP requests
- Custom cyberpunk CSS with animations

### Backend
- **Node.js** with Express.js
- **Google Safe Browsing API** integration
- **Express Validator** for input validation
- **CORS** enabled for cross-origin requests
- Environment variable configuration

## 📁 Project Structure

```
site-verificator/
│
├── backend/
│   ├── server.js              # Main server file
│   ├── routes/
│   │   └── verify.js          # API routes
│   ├── controllers/
│   │   └── verifyController.js # Request handlers
│   ├── services/
│   │   └── securityService.js  # Google Safe Browsing integration
│   ├── .env                    # Environment variables
│   ├── .env.example            # Environment template
│   ├── package.json
│   └── .gitignore
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx      # Navigation bar
    │   │   ├── UrlForm.jsx     # URL input form
    │   │   └── ResultCard.jsx  # Results display
    │   ├── styles/
    │   │   └── cyberpunk.css   # Custom cyberpunk styles
    │   ├── App.jsx             # Main app component
    │   └── main.jsx            # Entry point
    ├── index.html
    ├── vite.config.js
    ├── .env                    # Frontend environment
    ├── .env.example
    ├── package.json
    └── .gitignore
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Google Safe Browsing API Key** (optional for testing)

### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your Google Safe Browsing API key
# GOOGLE_SAFE_BROWSING_API_KEY=your_actual_api_key_here

# Start the backend server
npm start

# OR for development with auto-reload
npm run dev
```

Backend will run on **http://localhost:5000**

### 3️⃣ Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file (optional - defaults to localhost:5000)
cp .env.example .env

# Start the development server
npm run dev
```

Frontend will run on **http://localhost:5173**

### 4️⃣ Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 🔑 Getting Google Safe Browsing API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Safe Browsing API**
4. Go to **APIs & Services** → **Credentials**
5. Click **Create Credentials** → **API Key**
6. Copy the API key
7. Add it to `backend/.env`:
   ```
   GOOGLE_SAFE_BROWSING_API_KEY=your_api_key_here
   ```

**Note:** The app includes a **mock mode** that works without an API key for testing purposes.

## 🧪 Testing the Application

### Test URLs for Mock Mode

When running without a valid API key, try these URLs:

- **Safe URL:** `https://google.com`
- **Malicious URL:** `https://malware-test.com`
- **Suspicious URL:** `https://suspicious-site.test`

The mock mode uses simple heuristics based on URL content.

## 📡 API Endpoints

### Backend API

**Base URL:** `http://localhost:5000/api`

#### POST `/api/verify`
Verify a URL for security threats.

**Request:**
```json
{
  "url": "https://example.com"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "url": "https://example.com",
    "status": "SAFE",
    "details": "No security threats detected",
    "threatTypes": [],
    "timestamp": "2026-02-08T10:30:00.000Z"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid URL format",
  "details": "URL validation failed"
}
```

#### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "success": true,
  "message": "SiteGuard Verificator API is running",
  "version": "1.0.0",
  "timestamp": "2026-02-08T10:30:00.000Z"
}
```

## 🌐 Deployment

### Deploy Backend to Railway

1. **Sign up** at [Railway.app](https://railway.app/)

2. **Create a new project** and select **Deploy from GitHub**

3. **Select the backend directory**

4. **Add environment variables:**
   - `PORT` = 5000
   - `NODE_ENV` = production
   - `GOOGLE_SAFE_BROWSING_API_KEY` = your_api_key
   - `FRONTEND_URL` = https://your-vercel-app.vercel.app

5. **Deploy** and copy your Railway URL

### Deploy Frontend to Vercel

1. **Sign up** at [Vercel.com](https://vercel.com/)

2. **Import your repository**

3. **Configure project:**
   - Framework Preset: **Vite**
   - Root Directory: **frontend**
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add environment variable:**
   - `VITE_API_URL` = https://your-railway-url.railway.app

5. **Deploy**

### Update CORS

After deployment, update the backend `.env` on Railway:
```
FRONTEND_URL=https://your-vercel-app.vercel.app
```

## 🎨 Customization

### Modify Colors

Edit `frontend/src/styles/cyberpunk.css`:

```css
:root {
  --neon-blue: #00f3ff;
  --neon-purple: #bd00ff;
  --neon-green: #39ff14;
  --neon-red: #ff0040;
  /* Add your custom colors */
}
```

### Change Fonts

Update the Google Fonts import in `frontend/index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

## 🐛 Troubleshooting

### Backend won't start
- Ensure Node.js v18+ is installed
- Check if port 5000 is available
- Verify all dependencies are installed: `npm install`

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in `frontend/.env`
- Verify CORS is properly configured

### API Key Issues
- The app works in **mock mode** without an API key
- Verify your API key is valid
- Ensure Safe Browsing API is enabled in Google Cloud Console

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
GOOGLE_SAFE_BROWSING_API_KEY=your_key_here
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

## 🔒 Security Features

- Input validation and sanitization
- CORS protection
- Security headers (X-Frame-Options, X-Content-Type-Options)
- Environment variable protection
- No API key exposure to frontend
- Request timeout limits

## 📜 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- Google Safe Browsing API for threat detection
- Bootstrap for responsive framework
- Vite for blazing fast development
- The cyberpunk aesthetic community for inspiration

## 📧 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Built with ❤️ and lots of neon lights** 🌟

*Stay safe on the web with SiteGuard Verificator!* 🔒✨