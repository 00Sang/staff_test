const pool = require('../db');

const insertAttendance = async (attendance) => {
    try {
        const { name, roll_no, date, status } = attendance;

        const query = `INSERT INTO attendance (name, roll_no, date, status) 
                       VALUES ($1, $2, $3, $4) RETURNING *;`;

        const values = [name, roll_no, date, status];
        const result = await pool.query(query, values);

        return result.rows[0];  
    } catch (error) {
        console.error('Error inserting attendance data:', error.message);
        throw error;
    }
};
const teachingStaff = async () => {
    try {
        const result = await pool.query('SELECT * FROM faculty WHERE type = $1', ['teaching']);
        return result.rows;
        
    } catch (error) {
        console.error('Error fetching teaching staff:', error);
        throw error;
    }
};

const nonTeachingStaff = async () => {
    try {
        const result = await pool.query('SELECT * FROM faculty WHERE type = $1', ['non-teaching']);
        return result.rows;
    } catch (error) {
        console.error('Error fetching non-teaching staff:', error);
        throw error;
    }
};

module.exports = { teachingStaff, nonTeachingStaff };

module.exports = {
    insertAttendance,
    teachingStaff,
    nonTeachingStaff
}