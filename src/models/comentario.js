const conexion = require('../database');
module.exports ={
agregarcomentario (id_tema, comentario,id_usuario ) {
    return new Promise( (resolve,reject) =>{
        conexion.query ('insert into comentario (id_usuario, comentario, id_tema) values ( ? , ? , ?)',
        [id_usuario, comentario, id_tema]),
        (err) => {
            if(err) reject(err);
            else resolve();
        }
    } )
}
}