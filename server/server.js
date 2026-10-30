const express = require('express');
const cors = require('cors');
const path = require('path');

const impactRoutes = require('./routes/impact');
const partnersRoutes = require('./routes/partners');
const requestsRoutes = require('./routes/requests');
const collectionPointsRoutes = require('./routes/collectionPoints');
const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/impact', impactRoutes);
app.use('/api/partners', partnersRoutes);
app.use('/api/requests', requestsRoutes);
app.use('/api/collection-points', collectionPointsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Bottle Return Backend API',
    time: new Date().toISOString()
  });
});

// Serve frontend static build if available
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(clientDistPath, 'index.html');
  res.sendFile(indexPath, err => {
    if (err) {
      // If client not yet built, return helpful message
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head><title>Bottle Return API</title></head>
        <body style="font-family: sans-serif; padding: 40px; text-align: center; background: #f0fdf4;">
          <h1 style="color: #15803d;">🍾 Bottle Return API Server Running</h1>
          <p>API endpoints are live at <code>/api/...</code></p>
          <p>Run <code>npm run client</code> to launch the Vite development UI.</p>
        </body>
        </html>
      `);
    }
  });
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🌱 Bottle Return Server running on port ${PORT}`);
  console.log(`📡 API Health: http://localhost:${PORT}/api/health`);
  console.log(`===============================================`);
});
