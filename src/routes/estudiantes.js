const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');
const carrerasQuery = require('../repositories/CarreraRepository');
const { isLoggedIn } = require('../lib/auth');

// Endpoint para mostrar todos los estudiantes
router.get('/', isLoggedIn, async (request, response) => {
    const estudiantes = await queries.obtenerTodosLosEstudiantes();
    response.render('estudiantes/listado', { estudiantes }); // Mostramos el listado de estudiantes
});

// Endpoint que permite mostrar el formulario para agregar un nuevo estudiante
router.get('/agregar', isLoggedIn, async (request, response) => {
    const lstCarreras = await carrerasQuery.obtenerTodasLasCarreras();
    // Renderizamos el formulario
    response.render('estudiantes/agregar', { lstCarreras });
});

// Endpoint para agregar un estudiante
router.post('/agregar', isLoggedIn, async (request, response) => {
    const { idestudiante, nombre, apellido, email, idcarrera, usuario } = request.body;
    const nuevoEstudiante = { idestudiante, nombre, apellido, email, idcarrera, usuario };
    try {
        const resultado = await queries.insertarEstudiante(nuevoEstudiante);
        if (resultado) {
            request.flash('success', 'Registro insertado con éxito');
        } else {
            request.flash('error', 'Ocurrió un problema al guardar el registro');
        }
    } catch (error) {
        console.error('Error al insertar el estudiante:', error);
        request.flash('error', 'Ocurrió un problema al guardar el registro');
    }
    response.redirect('/estudiantes');
});

// Endpoint que permite mostrar el formulario para modificar un estudiante
router.get('/editar/:idestudiante', isLoggedIn, async (request, response) => {
    const { idestudiante } = request.params;
    const lstCarreras = await carrerasQuery.obtenerTodasLasCarreras();
    // Aca es de obtener el objeto del estudiante
    const estudiante = await queries.obtenerEstudiantePorId(idestudiante);
    response.render('estudiantes/editar', { lstCarreras, estudiante });
});

// Endpoint que permite actualizar un estudiante
router.post('/editar/:id', isLoggedIn, async (request, response) => {
    const { id } = request.params;
    const { nombre, apellido, email, idcarrera, usuario } = request.body;
    const nuevoEstudiante = { nombre, apellido, email, idcarrera, usuario };
    try {
        const actualizacion = await queries.actualizarEstudiante(id, nuevoEstudiante);
        if (actualizacion) {
            request.flash('success', 'Registro actualizado con éxito');
        } else {
            request.flash('error', 'Ocurrió un problema al actualizar el registro');
        }
    } catch (error) {
        console.error('Error al actualizar el estudiante:', error);
        request.flash('error', 'Ocurrió un problema al actualizar el registro');
    }
    response.redirect('/estudiantes');
});

// Endpoint que permite eliminar un estudiante
router.get('/eliminar/:idestudiante', isLoggedIn, async (request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idestudiante
    const { idestudiante } = request.params;
    try {
        const resultado = await queries.eliminarEstudiante(idestudiante);
        if (resultado) {
            request.flash('success', 'Eliminado con éxito');
        } else {
            request.flash('error', 'Error al eliminar');
        }
    } catch (error) {
        console.error('Error al eliminar el estudiante:', error);
        request.flash('error', 'Ocurrió un problema al eliminar el registro');
    }
    response.redirect('/estudiantes');
});

module.exports = router;