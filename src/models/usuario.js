const { render } = require('ejs');
const conexion = require('../database');
module.exports ={
registro (usuario, contra, nombre, correo, foto) {
    return new Promise( (resolve,reject) =>{
        conexion.query ('insert into usuario ( apodo, contra, foto, nombre, correo) values ( ? , ? , ? , ? , ?)',
        [usuario, contra, foto, nombre, correo]),
        (err) => {
            if(err) reject(err);
            else resolve();
        }
    } )
},
verificar (usuario, contra) {
    return new Promise ((resolve,reject)=>{
        conexion.query('select * from usuario where apodo=? and contra= ?',
        [usuario,contra],
        (err, usuario)=>{
            if(err) reject(err)
            else
            if(usuario.length >=1) resolve(usuario[0]);
            else resolve(false);
        } )
    })
}
}