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
},
borrarcomentario (id_comentario) {
    return new Promise((resolve,reject)=>{
        conexion.query('delete from comentario where id_comentario= ?',
        [id_comentario]),
        (err) => {
            if (err) reject(err);
            else resolve();
        }      
    })
},
modificarcomentario (id_comentario,comentario ) {
    return new Promise( (resolve,reject) =>{
        conexion.query ('update comentario set comentario= ? where id_comentario= ?',
        [comentario, id_comentario]),
        (err) => {
            if(err) reject(err);
            else resolve();
        }
    } )
}

}