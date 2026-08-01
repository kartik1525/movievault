require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

// Initialize Database and Start HTTP Listener
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`[CineVault API] Server listening on port ${PORT}`);
  });
});
