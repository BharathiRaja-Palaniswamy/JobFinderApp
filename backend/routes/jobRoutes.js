const express = require('express');
const { addJob, getJobs,applyJob} = require('../controllers/jobsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/postJob', authMiddleware, addJob);
router.post('/applyJob', applyJob);

try {
router.get('/getJobs', authMiddleware, getJobs);
} catch (e) {
    console.log('Error occured', e);
}
    

module.exports = router;