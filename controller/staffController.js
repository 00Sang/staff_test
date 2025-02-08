const { teachingStaff, nonTeachingStaff, insertAttendance } = require('../models/staffModels');

// Fetch Teaching Staff
const getTeachingStaff = async (req, res) => {
    try {
        const staffList = await teachingStaff();

        if (!staffList || staffList.length === 0) {
            return res.status(404).json({ message: "No teaching staff found" });
        }

        return res.status(200).json({ success: true, data: staffList});
    } catch (error) {
        console.error('Error fetching teaching staff:', error.message);
        return res.status(500).json({ success: false, message: 'An error occurred while fetching teaching staff' });
    }
};

// Fetch Non-Teaching Staff
const getNonTeachingStaff = async (req, res) => {
    try {
        const staffList = await nonTeachingStaff();

        if (!staffList || staffList.length === 0) {
            return res.status(404).json({ message: "No non-teaching staff found" });
        }

        return res.status(200).json({ success: true, data: staffList });
    } catch (error) {
        console.error('Error fetching non-teaching staff:', error.message);
        return res.status(500).json({ success: false, message: 'An error occurred while fetching non-teaching staff' });
    }
};

// update Attendance
const updateAttendance = async (req, res) => {
    try {
        const { name, roll_no, date, status } = req.body;

        // Validate input fields
        if (!name || !roll_no || !date || !status) {
            return res.status(400).json({ success: false, message: "Please provide all fields." });
        }

        // Call the service function to insert attendance
        const attendanceRecord = await insertAttendance({ name, roll_no, date, status });

        return res.status(201).json({ success: true, data: attendanceRecord });
    } catch (error) {
        console.error('Error updating attendance:', error.message);
        return res.status(500).json({ success: false, message: 'An error occurred while updating attendance' });
    }
};

const viewProfile = async (req, res) => {
    try {
        const facultyId = req.user.id; // Get faculty ID from JWT token
        const role = req.user.role; 

        let query = '';
        let values = [facultyId];

        if (role === 'admin') {
            // Admin can access all faculty profiles
            query = `SELECT faculty_id, name, department, role, profile_picture, designation, type, nature_of_appointment FROM faculty`;
            values = []; // No need for filtering
        } else if (role === 'staff') {
            // Staff can only access their own profile
            query = `SELECT faculty_id, name, department, role, profile_picture, designation, 
            type, nature_of_appointment FROM faculty WHERE faculty_id = $1`;
        } else {
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }

        return res.status(200).json({ success: true, data: role === 'admin' ? result.rows : result.rows[0] });

    } catch (error) {
        console.error("Error fetching profile:", error.message);
        return res.status(500).json({ success: false, message: "An error occurred while fetching profile" });
    }
};

module.exports = { getTeachingStaff, getNonTeachingStaff, updateAttendance, viewProfile};
