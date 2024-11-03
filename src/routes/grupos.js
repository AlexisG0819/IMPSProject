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
    await queries.insertarGrupo(nuevoGrupo);
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
    await queries.actualizarGrupo(idgrupo, grupoActualizado);
    response.redirect('/grupos');
});

// Endpoint para eliminar un grupo
router.get('/eliminar/:idgrupo', async (request, response) => {
    const { idgrupo } = request.params;
    const resultado = await queries.eliminarGrupo(idgrupo);
    if (resultado > 0) {
        console.log('Eliminado con éxito');
    }
    response.redirect('/grupos');
});

// Endpoint para asignar estudiantes a un grupo
router.get('/asignargrupo/:idgrupo', async (request, response) => {
    const { idgrupo } = request.params;
    const estudiantes = await queries.obtenerEstudiantesSinGrupo();
    response.render('grupos/asignar', { idgrupo, estudiantes });
});

router.post('/asignargrupo/:idgrupo', async (request, response) => {
    const { idgrupo } = request.params;
    const data = request.body;
    const processedData = processDataFromForm(data);
    let resultado = false;
    for (const tmp of processedData.grupo_estudiantes) {
        resultado = await queries.asignarGrupo(tmp);
    }
    if (resultado) {
        request.flash('success', 'Asignación de grupo realizada con éxito');
    } else {
        request.flash('error', 'Ocurrió un problema al realizar la asignación');
    }
    response.redirect('/grupos');
});

// Función para procesar los datos del formulario
function processDataFromForm(data) {
    const result = {
        grupo_estudiantes: []
    };
    for (const key in data) {
        if (key.startsWith('grupo_estudiantes[')) {
            const match = key.match(/\[(\d+)\]\[(\w+)\]/);
            if (match) {
                const index = parseInt(match[1]);
                const property = match[2];
                if (!result.grupo_estudiantes[index]) {
                    result.grupo_estudiantes[index] = {};
                }
                result.grupo_estudiantes[index][property] = data[key];
            }
        } else {
            result[key] = data[key];
        }
    }
    return result;
}

module.exports = router;