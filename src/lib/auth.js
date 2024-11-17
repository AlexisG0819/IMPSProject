module.exports = {
    // Verifica si existe sesión
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) { // Método de passport devuelve un boolean, el cual indica si existe usuario autenticado
            return next();
        }
        return res.redirect('/signin'); // Caso contrario redireccionar a la pantalla de logueo
    },
    // Verifica si no existe sesión
    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) { // Método de passport devuelve un boolean
            return next();
        }
        return res.redirect('/');
    }
}