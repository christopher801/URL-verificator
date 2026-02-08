const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config();

// Import routes
const verifyRoutes = require('./routes/verify');

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});

// =============================================
// ULTRA SIMPLE CORS FIX
// =============================================

// OPTION 1: Allow ALL origins (for testing)
app.use(cors({
  origin: '*', // Allow all origins TEMPORARILY
  credentials: false,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// OPTION 2: Or use this manual middleware (comment out the cors() above if using this)
app.use((req, res, next) => {
  // Allow ALL origins - we'll restrict later
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'false');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// =============================================
// MIDDLEWARE
// =============================================

app.use(express.json());
app.use(limiter);

// Simple request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - Origin: ${req.headers.origin || 'none'}`);
  next();
});

// =============================================
// ROUTES
// =============================================

app.use('/api', verifyRoutes);

// =============================================
// HEALTH CHECK - WITH CORS INFO
// =============================================

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'SiteGuard Verificator API v3.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    cors: 'ALLOW_ALL (*)',
    requestOrigin: req.headers.origin || 'none'
  });
});

// Test endpoint with specific CORS response
app.get('/api/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is working!',
    corsEnabled: true,
    yourOrigin: req.headers.origin || 'Not provided',
    serverTime: new Date().toISOString()
  });
});

// Simple echo endpoint for debugging
app.post('/api/echo', (req, res) => {
  res.status(200).json({
    received: req.body,
    headers: req.headers,
    timestamp: new Date().toISOString()
  });
});

// =============================================
// ERROR HANDLING
// =============================================

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong',
    timestamp: new Date().toISOString()
  });
});

// =============================================
// START SERVER
// =============================================

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  =============================================
  🛡️  SiteGuard Verificator API v3.0
  =============================================
  🌐 Server: http://0.0.0.0:${PORT}
  📍 Health: /health
  🌍 CORS: ALLOW_ALL (*)
  🚀 Ready for production!
  =============================================
  `);
  
  // Log environment info
  console.log('Environment:', process.env.NODE_ENV || 'development');
  console.log('Google API Key:', process.env.GOOGLE_SAFE_BROWSING_API_KEY ? 'Set' : 'Not set');
});