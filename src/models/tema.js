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
    },
    nuevotema(tema, publico, id_usuario){
        return new Promise( (resolve,reject)=>{
            conexion.query ("insert into tema (tema, tipo, id_usuario) values ( ?, ?, ? ) ",
            [tema, publico, id_usuario],
            (err)=>{
                if (err) reject(err);
                else resolve();
            }
            )
        })
    },
    borrartema(id_tema){
        return new Promise( (resolve,reject)=>{
            conexion.query ("delete from tema where id_tema = ?",
            [id_tema],
            (err)=>{
                if (err) reject(err);
                else resolve();
            }
            )
        })
    },
    modificatema(id_tema, tema, id_usuario, publico){
        return new Promise( (resolve,reject)=>{
            conexion.query ("update tema set tema= ?, id_usuario= ?, tipo=? "+
            " where id_tema=?",
            [tema, id_usuario, publico, id_tema],
            (err)=>{
                if (err) reject(err);
                else resolve();
            }
            )
        })
    },
    listareporte() {
        return new Promise ( (resolve, reject)=>{
            conexion.query(
            "select t.tema, u2.apodo , (select count(*) from comentario c2 where c2.id_tema =t.id_tema ) as comentarios "+
            "from tema t "+
            "inner join usuario u2 on t.id_usuario =u2.id_usuario "+
            "order by -comentarios",
            (err, temas)=>{
                if(err) reject(err);
                else resolve(this.avector(temas))
            }
            )
        })
    },
    avector(listaobjetos)
    {
        var respuesta = [];
        listaobjetos.forEach(elemento => {
            respuesta.push (Object.values(elemento));
        });
        return respuesta;
    }
}