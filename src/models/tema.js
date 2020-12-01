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
    }
}