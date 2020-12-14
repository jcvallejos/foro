const express = require('express');
const router = express.Router();
const session = require('express-session');
const mtema = require('../models/tema');
const mcomentario = require('../models/comentario');
const PDFDocument = require('./pdfkit-tables');
const path = require('path');

function estalogueado(req, res, next) {
    if (req.user) { next(); } else { res.redirect('/'); }
};

function esadmin(req, res, next) {
    if (session.usuario.tipo == 2) next(); else res.redirect('/');
};

router.get('/', estalogueado, esadmin, (req, res) => {
    res.render('admin/index');
});

router.get('/foros', estalogueado, esadmin, (req, res) => {
    mtema.listatemas()
        .then(temas => {
            res.render('admin/foros', { temas });
        })
});

router.post('/nuevotema', estalogueado, esadmin, (req, res) => {
    tema = req.body.tema;
    publico = req.body.publico == 'on' ? 1 : 0;
    id_usuario = session.usuario.id_usuario;
    mtema.nuevotema(tema, publico, id_usuario)
        .then(res.redirect('/administrador/foros'));

});
router.get('/borrartema/:id', estalogueado, esadmin, (req, res) => {
    id_tema = req.params.id;
    mtema.borrartema(id_tema)
        .then(res.redirect('/administrador/foros'));
});
router.post('/modificatema', estalogueado, esadmin, (req, res) => {
    tema = req.body.tema2;
    publico = req.body.publico2 == 'on' ? 1 : 0;
    id_tema = req.body.idtema2
    id_usuario = session.usuario.id_usuario;
    mtema.modificatema(id_tema, tema, id_usuario, publico)
        .then(res.redirect('/administrador/foros'));

});

router.get('/comentarios/:id', estalogueado, esadmin, (req, res) => {
    id = req.params.id;
    id_usuario_session = session.usuario.id_usuario;
    mtema.nuevavista(id)
        .then(
            mtema.listacomentarios(id)
                .then(comentarios => {
                    res.render('admin/comentarios', { comentarios, idtema: id, id_usuario_session })
                })
        )
});

router.get('/reporte', estalogueado, esadmin, async (req, res, next) => {
    mtema.listareporte()
        .then(temas => {
            const tabla = {
                headers: ['Tema', 'Creador', 'Comentarios'],
                rows: temas
            };
            var myDoc = new PDFDocument({ bufferPages: true });
            let buffers = [];
            myDoc.on('data', buffers.push.bind(buffers));
            myDoc.on('end', () => {
                let pdfData = Buffer.concat(buffers);
                res.writeHead(200, {
                    'Content-Length': Buffer.byteLength(pdfData),
                    'Content-Type': 'application/pdf'
                })
                    .end(pdfData);
            });
            myDoc.image(path.resolve(__dirname + '/../public/imgs/foro2.png'), 15, 25, { width: 100 })
                .text('El Foro de la verdad', 125, 35);
            myDoc.font('Helvetica-Bold')
                .fontSize(25)
                .text('Listado de temas mas vistos', 135, 85);
            myDoc.table(tabla, {
                prepareHeader: () => myDoc.fontSize(13),
                prepareRow: (row, i) => myDoc.fontSize(12)
            });
            myDoc.end();
        })
});

module.exports = router;