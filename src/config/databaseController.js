const mysql = require('mysql2');
const { database } = require('./keys');

// Crear un pool de conexiones
const pool = mysql.createPool(database);

// Promisify pool query para usar async/await
const conexion = pool.promise();

// Ejemplo de una consulta
async function ejemploConsulta() {
    try {
        const [rows, fields] = await conexion.query('SELECT * FROM estudiantes');
        console.log(rows);
    } catch (error) {
        console.error('Error en la consulta:', error);
    }
}

ejemploConsulta();

module.exports = conexion;