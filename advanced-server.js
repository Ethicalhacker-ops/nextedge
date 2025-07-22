const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const morgan = require('morgan');
const fs = require('fs');
const https = require('https');
const http = require('http');
const socketio = require('socket.io');
const csrf = require('csurf');
const session = require('express-session');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');

// Configurations
const config = require('./config/config');
const logger = require('./utils/logger');
const connectDB = require('./config/database');

// Initialize Express
const app = express();

// ========== SECURITY MIDDLEWARE ==========
app.use(helmet());
app.use(cors({
  origin: config.cors.origins,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Body parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Session configuration
app.use(session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: config.env === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// CSRF protection
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// ========== DATABASE CONNECTION ==========
connectDB();

// ========== ROUTES ==========
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const contactRoutes = require('./routes/contact');
const serviceRoutes = require('./routes/services');
const blogRoutes = require('./routes/blog');
const userRoutes = require('./routes/users');

app.use('/api/v1', apiRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/blog', blogRoutes);
app.use('/api/v1/users', userRoutes);

// ========== ERROR HANDLING ==========
app.use(require('./middleware/error'));

// ========== SERVER SETUP ==========
let server;
if (config.env === 'production' && config.https.enabled) {
  const sslOptions = {
    key: fs.readFileSync(config.https.keyPath),
    cert: fs.readFileSync(config.https.certPath)
  };
  server = https.createServer(sslOptions, app);
} else {
  server = http.createServer(app);
}

// Socket.io setup
const io = socketio(server, {
  cors: {
    origin: config.cors.origins,
    methods: ["GET", "POST"]
  }
});

require('./sockets')(io);

// Start server
server.listen(config.port, () => {
  logger.info(`Server running in ${config.env} mode on port ${config.port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
  });
});
