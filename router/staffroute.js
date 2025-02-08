const express = require('express');
const cors = require('cors')
const { getTeachingStaff, getNonTeachingStaff, updateAttendance } = require('../controller/staffController');

const router = express.Router();


router.get('/teaching-staff', getTeachingStaff);
router.get('/non-teaching-staff', getNonTeachingStaff);
router.post('/updateAttendance', updateAttendance)

module.exports = router;
