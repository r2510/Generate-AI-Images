const express = require('express');
const { generateImage } = require('../controllers/openaiControllers');//destructor
const router = express.Router();
router.post('/generateimage', generateImage);
module.exports = router;