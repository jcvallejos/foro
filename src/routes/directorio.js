const express = require('express');
const router = express.Router();

router.get('/', (req,res) =>{
    res.send ('Esta dentro del /directorio ');
});

router.get('/tres', (req,res) =>{
    res.send ('Esta es la solicitud 3');
});

router.get('/cuatro', (req,res) =>{
    res.send ('Esta es la 4ta solicitud');
});

router.get('/cinco', (req,res) =>{
    res.send ('Esta es la quinta  solicitud de ');
});

module.exports = router;