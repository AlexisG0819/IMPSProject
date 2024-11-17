const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

// En caso de que no exista una sesión, puede registrarse.
router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true // Para poder enviar mensajes flash a la vista
    })(req, res, next);
});

// Esta ruta permite limpiar la sesión
router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/signin');
    });
});

module.exports = router;