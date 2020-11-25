const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);
pool.getConnection( (err,connection)=>{
if (err){
    if (err.code === 'PROTOCOL_CONNECTION_LOST'){
        console.error('Se ha perdido la coneccion a la BDD');
    }
    if (err.code === 'ER_CON_COUNT_ERROR'){
        console.error('Existen Demasiada conecciones con el servidor BDD');
    }
    if (err.code === 'ECONNREFUSED'){
        console.error('La coneccion con la BdD fue rechazada');
    }
}
if(connection) connection.release();
console.log('Se ha conectado a la BdD');
return;
});

pool.query = promisify (pool.query);
module.exports = pool;