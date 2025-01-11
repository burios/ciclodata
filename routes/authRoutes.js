const express = require('express');
const passport = require('passport');
const { createUser } = require('../models/userModel');
const router = express.Router();

// Rota para exibir a página de login
router.get('/login', (req, res) => {
    const messages = req.flash('error');
    res.render('login', { messages });
});

// Rota de login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/', // Redireciona para a tela inicial após o login bem-sucedido
    failureRedirect: '/auth/login', // Redireciona para a página de login em caso de falha
    failureFlash: true // Habilita flash messages para erros
}));

// Rota para exibir a página de registro
router.get('/register', (req, res) => {
    const messages = req.flash('error');
    res.render('register', { messages });
});

// Rota de registro
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        await createUser(username, password);
        req.flash('success', 'Usuário criado com sucesso!');
        res.redirect('/auth/login');
    } catch (err) {
        req.flash('error', 'Erro ao criar usuário: ' + err.message);
        res.redirect('/auth/register');
    }
});

// Rota de logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

module.exports = router;
