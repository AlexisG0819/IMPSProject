const express = require('express');
const router = express.Router();
const queries = require('../repositories/MateriaRepository');

// Endpoint para mostrar todas las materias
router.get('/', async (request, response) => {
    const materias = await queries.obtenerTodasLasMaterias();
    response.render('materias/listado', { materias }); // Mostramos el listado de materias
});

// Endpoint que permite mostrar el formulario para agregar una nueva materia
router.get('/agregar', (request, response) => {
    response.render('materias/agregar');
});

// Endpoint para agregar una materia
router.post('/agregar', async (request, response) => {
    const { idmateria, materia } = request.body;
    const nuevaMateria = { idmateria, materia };
    try {
        const resultado = await queries.insertarMateria(nuevaMateria);
        if (resultado) {
            request.flash('success', 'Registro insertado con éxito');
        } else {
            request.flash('error', 'Ocurrió un problema al guardar el registro');
        }
    } catch (error) {
        console.error('Error al insertar la materia:', error);
        request.flash('error', 'Ocurrió un problema al guardar el registro');
    }
    response.redirect('/materias');
});

// Endpoint que permite mostrar el formulario para editar una materia
router.get('/editar/:idmateria', async (request, response) => {
    const { idmateria } = request.params;
    const materia = await queries.obtenerMateriaPorId(idmateria);
    response.render('materias/editar', { materia });
});

// Endpoint para actualizar una materia
router.post('/editar/:idmateria', async (request, response) => {
    const { idmateria } = request.params;
    const { materia } = request.body;
    const materiaActualizada = { materia };
    try {
        const resultado = await queries.actualizarMateria(idmateria, materiaActualizada);
        if (resultado) {
            request.flash('success', 'Registro actualizado con éxito');
        } else {
            request.flash('error', 'Ocurrió un problema al actualizar el registro');
        }
        response.redirect('/materias');
    } catch (error) {
        console.error('Error al actualizar la materia:', error);
        request.flash('error', 'Ocurrió un problema al actualizar el registro');
        response.redirect('/materias');
    }
});

// Endpoint para eliminar una materia
router.get('/eliminar/:idmateria', async (request, response) => {
    const { idmateria } = request.params;
    const resultado = await queries.eliminarMateria(idmateria);
    if (resultado > 0) {
        request.flash('success', 'Eliminación correcta');
    } else {
        request.flash('error', 'Error al eliminar');
    }
    response.redirect('/materias');
});

module.exports = router;