const express = require('express');
const router = express.Router();
const queries = require('../repositories/CarreraRepository');

// Endpoint para mostrar todas las carreras
router.get('/', async (request, response) => {
    const carreras = await queries.obtenerTodasLasCarreras();
    response.render('carreras/listado', { carreras }); // Mostramos el listado de carreras
});

// Endpoint que permite mostrar el formulario para agregar una nueva carrera
router.get('/agregar', (request, response) => {
    response.render('carreras/agregar');
});

// Endpoint para agregar una carrera
router.post('/agregar', async (request, response) => {
    const { idcarrera, carrera } = request.body;
    const nuevaCarrera = { idcarrera, carrera };
    try {
        const resultado = await queries.insertarCarrera(nuevaCarrera);
        if (resultado) {
            request.flash('success', 'Registro insertado con éxito');
        } else {
            request.flash('error', 'Ocurrió un problema al guardar el registro');
        }
    } catch (error) {
        console.error('Error al insertar la carrera:', error);
        request.flash('error', 'Ocurrió un problema al guardar el registro');
    }
    response.redirect('/carreras');
});

// Endpoint que permite mostrar el formulario para editar una carrera
router.get('/editar/:idcarrera', async (request, response) => {
    const { idcarrera } = request.params;
    const carrera = await queries.obtenerCarreraPorId(idcarrera);
    response.render('carreras/editar', { carrera });
});

// Endpoint para actualizar una carrera
router.post('/editar/:idcarrera', async (request, response) => {
    const { idcarrera } = request.params;
    const { carrera } = request.body;
    const carreraActualizada = { carrera };
    try {
        const resultado = await queries.actualizarCarrera(idcarrera, carreraActualizada);
        if (resultado) {
            request.flash('success', 'Registro actualizado con éxito');
        } else {
            request.flash('error', 'Ocurrió un problema al actualizar el registro');
        }
        response.redirect('/carreras');
    } catch (error) {
        console.error('Error al actualizar la carrera:', error);
        request.flash('error', 'Ocurrió un problema al actualizar el registro');
        response.redirect('/carreras');
    }
});

// Endpoint para eliminar una carrera
router.get('/eliminar/:idcarrera', async (request, response) => {
    const { idcarrera } = request.params;
    const resultado = await queries.eliminarCarrera(idcarrera);
    if (resultado > 0) {
        request.flash('success', 'Eliminación correcta');
    } else {
        request.flash('error', 'Error al eliminar');
    }
    response.redirect('/carreras');
});

module.exports = router;