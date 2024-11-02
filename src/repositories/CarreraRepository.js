const pool = require('../config/databaseController');

module.exports = {
    obtenerTodasLasCarreras: async () => {
        try {
            const result = await pool.query('SELECT * FROM carreras');
            return result;
        } catch (error) {
            console.error('Ocurrió un problema al consultar la lista de carreras: ', error);
            throw error;
        }
    },

    eliminarCarrera: async (idcarrera) => {
        try {
            const result = await pool.query('DELETE FROM carreras WHERE idcarrera = ?', [idcarrera]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar la carrera', error);
            throw error;
        }
    },

    insertarCarrera: async (carrera) => {
        try {
            const result = await pool.query('INSERT INTO carreras SET ?', [carrera]);
            return result.insertId;
        } catch (error) {
            console.error('Error al insertar la carrera', error);
            throw error;
        }
    },

    actualizarCarrera: async (idcarrera, carrera) => {
        try {
            const result = await pool.query('UPDATE carreras SET ? WHERE idcarrera = ?', [carrera, idcarrera]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar la carrera', error);
            throw error;
        }
    }
};