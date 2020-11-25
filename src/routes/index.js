const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const musuario = require('../models/usuario');
const crypto = require('crypto');

function sha256(string){
    return crypto.createHash('sha256').update(string).digest('hex');
}

router.get('/', (req,res) =>{
    res.render('index');
});

router.get('/foros', (req,res) =>{
    res.render('foros');
});

router.get('/login', (req,res) =>{
    res.render('login');
});

router.get('/registro', (req,res) =>{
    res.render('registro');
});

const storage = multer.diskStorage({
    destination: path.join(__dirname,'../public/fotos'),
    filename : (req,file,cb) =>{
        cb(null,Date.now()+'.'+path.extname(file.originalname));
    }
});

const uploadImage = multer({
    storage,
    limits : {fileSize : 1000000}
}).single('foto');

router.post('/registro2',uploadImage,(req,res)=>{  
    const usuario = req.body.username;
    const contra = sha256(req.body.password);
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const archivo = req.file;
    const nombrefoto = archivo.filename;
    musuario.registro(usuario,contra,nombre,correo,nombrefoto)
    .then(res.redirect('/'));
});

module.exports = router;