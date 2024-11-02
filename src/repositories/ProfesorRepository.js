const pool = require('../config/databaseController');
const moment = require('moment');

module.exports = {
    obtenerTodosLosProfesores: async () => {
        try {
            const result = await pool.query('SELECT * FROM profesores');
            // Formatear la fecha de nacimiento
            result.forEach(profesor => {
                profesor.fecha_nacimiento = moment(profesor.fecha_nacimiento).format('YYYY-MM-DD');
            });
            return result;
        } catch (error) {
            console.error('Ocurrió un problema al consultar la lista de profesores: ', error);
            throw error;
        }
    },
    obtenerProfesorPorId: async (idprofesor) => {
        try {
            const [result] = await pool.query('SELECT * FROM profesores WHERE idprofesor = ?', [idprofesor]);
            return result;
        } catch (error) {
            console.error('Ocurrió un problema al consultar el profesor: ', error);
            throw error;
        }
    },


    eliminarProfesor: async (idprofesor) => {
        try {
            const result = await pool.query('DELETE FROM profesores WHERE idprofesor = ?', [idprofesor]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar el profesor', error);
            throw error;
        }
    },

    insertarProfesor: async (profesor) => {
        try {
            const result = await pool.query('INSERT INTO profesores SET ?', [profesor]);
            return result.insertId;
        } catch (error) {
            console.error('Error al insertar el profesor', error);
            throw error;
        }
    },

    actualizarProfesor: async (idprofesor, profesor) => {
        try {
            const result = await pool.query('UPDATE profesores SET ? WHERE idprofesor = ?', [profesor, idprofesor]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar el profesor', error);
            throw error;
        }
    }
};