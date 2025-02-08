const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    database: 'ccpur_college',
    host: 'localhost',
    port: 5432,
    password: 'root'
});

const connectDB = async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Database connected successfully:', res.rows[0]); // Corrected typo
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1); // Exit on failure
    }
};

module.exports = pool; // Export only the pool for querying

// Call this function in `server.js` to verify the connection
connectDB();
