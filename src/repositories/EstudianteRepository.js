const pool = require('../config/databaseController');

module.exports = {

    //Consulta para obtener todos los estudiantes
    obtenerTodosLosEstudiantes: async() =>{
        try{
            const result = await pool.query('SELECT * FROM estudiante');
            return result;
        }catch(error){
            console.error('Ocurrio un problma al consultar la lista de Estudiantes', error);
        }
    }
}