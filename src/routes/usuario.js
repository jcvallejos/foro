const express = require('express');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const mtema = require('../models/tema');
const mcomentario = require('../models/comentario');


function estalogueado(req, res, next){
    if(req.user) {next();} else {res.redirect('/');}
};

function esusuario(req, res, next ){
    if(session.usuario.tipo==1) next(); else res.redirect('/');
};

router.get('/', estalogueado, esusuario, (req,res) =>{
    res.render('usuario/index');
});

router.get('/foros', estalogueado, esusuario, (req,res) =>{
    mtema.listatemas()
    .then(temas =>{
        res.render('usuario/foros',{temas});
    })
});

router.get('/comentarios/:id', estalogueado, esusuario, (req,res)=>{
    id = req.params.id;
    id_usuario_session = session.usuario.id_usuario; 
    mtema.nuevavista(id)
    .then(
        mtema.listacomentarios(id)
        .then(comentarios =>{
            res.render('usuario/comentarios',{comentarios, idtema:id, id_usuario_session})
        })
    )
});
router.post('/comentar', estalogueado, esusuario, (req,res)=>{
    comen= req.body.comentario;
    id_tema = req.body.id_tema;
    id_usuario = session.usuario.id_usuario;
    mcomentario.agregarcomentario(id_tema,comen, id_usuario)
    .then(res.redirect('/usuario/comentarios/'+id_tema));

});
router.get('/borrar/:idcomen/:idtema', estalogueado, esusuario, (req,res)=>{
   id_comentario = req.params.idcomen;
   id_tema = req.params.idtema;
   mcomentario.borrarcomentario(id_comentario)
   .then(res.redirect('/usuario/comentarios/'+id_tema))
});

router.post('/modificar', estalogueado, esusuario, (req,res)=>{
    comentario = req.body.comentario2;
    id_tema = req.body.id_tema2;
    id_comentario = req.body.id_comentario2;
    mcomentario.modificarcomentario(id_comentario, comentario)
    .then(res.redirect('/usuario/comentarios/'+id_tema))
});

module.exports = router;