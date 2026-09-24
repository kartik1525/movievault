/**
 * Environment variable validation.
 * Called once at startup to fail fast if critical config is missing.
 */

const REQUIRED_VARS = ['MONGODB_URI'];

const OPTIONAL_VARS = [
  { name: 'PORT', default: '5000' },
  { name: 'FRONTEND_URL', default: 'http://localhost:5173' },
  { name: 'NODE_ENV', default: 'development' },
  { name: 'RATE_LIMIT_WINDOW_MS', default: '900000' },
  { name: 'RATE_LIMIT_MAX', default: '100' },
];

function validateEnv() {
  const missing = REQUIRED_VARS.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.warn(
      `[Env Warning] Missing required environment variables: ${missing.join(', ')}. ` +
        'Server will start but database features will be unavailable.'
    );
  }

  // Apply defaults for optional variables
  OPTIONAL_VARS.forEach(({ name, default: defaultValue }) => {
    if (!process.env[name]) {
      process.env[name] = defaultValue;
    }
  });

  console.log(`[Env] Environment: ${process.env.NODE_ENV}`);
}

module.exports = validateEnv;
