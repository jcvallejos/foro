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
}
}