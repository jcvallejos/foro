const conexion = require('../database');
module.exports ={
    listapublica() {
        return new Promise ( (resolve, reject)=>{
            conexion.query(
            "select t.*, u2.apodo , u2.foto, (select count(*) from comentario c2 where c2.id_tema =t.id_tema ) as comentarios "+
            "from tema t "+
            "inner join usuario u2 on t.id_usuario =u2.id_usuario "+
            "where t.tipo=1 ",
            (err, temas)=>{
                if(err) reject(err);
                else resolve(temas)
            }
            )
        })
    },
    listatemas() {
        return new Promise ( (resolve, reject)=>{
            conexion.query(
            "select t.*, u2.apodo , u2.foto, (select count(*) from comentario c2 where c2.id_tema =t.id_tema ) as comentarios "+
            "from tema t "+
            "inner join usuario u2 on t.id_usuario =u2.id_usuario "+
            "order by t.fecha",
            (err, temas)=>{
                if(err) reject(err);
                else resolve(temas)
            }
            )
        })
    },
    listacomentarios( id_tema) {
        return new Promise ( (resolve, reject)=>{
            conexion.query(
                "select u.apodo , u.foto , c.* from comentario c " +
                "inner join usuario u on u.id_usuario =c.id_usuario " +
                "where c.id_tema= ? ",
            [id_tema],
            (err, comentarios)=>{
                if(err) reject(err);
                else resolve(comentarios)
            }
            )
        })
    },
    nuevavista(id_tema){
        return new Promise( (resolve,reject)=>{
            conexion.query ("update tema set vistas=vistas+1  "+
            "where id_tema= ?",
            [id_tema],
            (err)=>{
                if (err) reject(err);
                else resolve();
            }
            )
        })
    }

}