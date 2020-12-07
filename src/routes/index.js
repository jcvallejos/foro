const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const musuario = require('../models/usuario');
const crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const { disconnect } = require('process');
const mtema = require('../models/tema');

function sha256(string){
    return crypto.createHash('sha256').update(string).digest('hex');
}

passport.serializeUser( function(user, done){
    done(null,user);
});

passport.deserializeUser (function(user,done) {
    done(null,user);
});

passport.use (new LocalStrategy ( (username, password,done)=>{
    musuario.verificar(username, sha256(password))
    .then( usuario =>{
        if(usuario) {
            session.usuario= usuario;
            done (null,usuario);
        }
        else{
            done(null, false);
        }
    })
}));

router.get('/', (req,res) =>{
    res.render('index');
});

router.get('/foros', (req,res) =>{
    mtema.listapublica()
    .then(temas =>{
        res.render('foros',{temas});
    })
    
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

router.post('/login2', passport.authenticate('local', {failureRedirect:'/login'}),
function (req,res){
    if (session.usuario.tipo==1) res.redirect('/usuario/');
    else res.redirect('/administrador/');
    
});

router.get('/logout', (req,res)=>{
    req.logOut();
    res.redirect('/');
});
module.exports = router;