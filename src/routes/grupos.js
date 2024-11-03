const express = require('express');
const router = express.Router();
const queries = require('../repositories/GrupoRepository');

// Endpoint para mostrar todos los grupos
router.get('/', async (request, response) => {
    const grupos = await queries.obtenerTodosLosGrupos();
    response.render('grupos/listado', { grupos }); // Mostramos el listado de grupos
});

// Endpoint que permite mostrar el formulario para agregar un nuevo grupo
router.get('/agregar', (request, response) => {
    response.render('grupos/agregar');
});

// Endpoint para agregar un grupo
router.post('/agregar', async (request, response) => {
    const { idgrupo, num_grupo, anio, ciclo, idmateria, idprofesor } = request.body;
    const nuevoGrupo = { idgrupo, num_grupo, anio, ciclo, idmateria, idprofesor };
    try {
        const resultado = await queries.insertarGrupo(nuevoGrupo);
        if (resultado) {
            request.flash('success', 'Registro insertado con éxito');
        } else {
            request.flash('error', 'Ocurrió un problema al guardar el registro');
        }
    } catch (error) {
        console.error('Error al insertar el grupo:', error);
        request.flash('error', 'Ocurrió un problema al guardar el registro');
    }
    response.redirect('/grupos');
});

// Endpoint que permite mostrar el formulario para editar un grupo
router.get('/editar/:idgrupo', async (request, response) => {
    const { idgrupo } = request.params;
    const grupo = await queries.obtenerGrupoPorId(idgrupo);
    response.render('grupos/editar', { grupo });
});

// Endpoint para actualizar un grupo
router.post('/editar/:idgrupo', async (request, response) => {
    const { idgrupo } = request.params;
    const { num_grupo, anio, ciclo, idmateria, idprofesor } = request.body;
    const grupoActualizado = { num_grupo, anio, ciclo, idmateria, idprofesor };
    try {
        const resultado = await queries.actualizarGrupo(idgrupo, grupoActualizado);
        if (resultado) {
            request.flash('success', 'Registro actualizado con éxito');
        } else {
            request.flash('error', 'Ocurrió un problema al actualizar el registro');
        }
        response.redirect('/grupos');
    } catch (error) {
        console.error('Error al actualizar el grupo:', error);
        request.flash('error', 'Ocurrió un problema al actualizar el registro');
        response.redirect('/grupos');
    }
});

// Endpoint para eliminar un grupo
router.get('/eliminar/:idgrupo', async (request, response) => {
    const { idgrupo } = request.params;
    const resultado = await queries.eliminarGrupo(idgrupo);
    if (resultado > 0) {
        request.flash('success', 'Eliminación correcta');
    } else {
        request.flash('error', 'Error al eliminar');
    }
    response.redirect('/grupos');
});

module.exports = router;