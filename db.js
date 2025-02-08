const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Use Render DB URL
    ssl: {
        rejectUnauthorized: false, // Required for Render PostgreSQL
    },
});

pool.connect()
    .then(() => console.log('Connected to PostgreSQL on Render!'))
    .catch(err => console.error('Database connection error:', err));

module.exports = pool;
