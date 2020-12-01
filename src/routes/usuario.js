const express = require('express');
const router = express.Router();

router.get('/', (req,res) =>{
    res.send ('Esta dentro del Usuario ');
});

module.exports = router;