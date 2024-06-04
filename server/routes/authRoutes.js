const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const Teacher = require('../models/teacherModel');

router.post('/signin', (req, res) => {
    const { signInType } = req.body;
    
    if (signInType === "admin") {
        authController.adminSignIn(req, res);
    } else if (signInType === "teacher") {
        authController.teacherSignIn(req, res);
    } else {
        res.status(400).json({ message: 'Invalid sign-in type' });
    }
});

// Route to fetch a specific teacher by ID
router.get('/fetchteachers/:teacherID', async (req, res) => {
    try {
        const { teacherID } = req.params;
        const teacher = await Teacher.findOne({ teacherID });

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        res.status(200).json({ teacher });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
