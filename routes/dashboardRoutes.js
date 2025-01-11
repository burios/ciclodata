const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth'); // Importando o middleware de autenticação

// Rota para exibir o dashboard
router.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.user });
});

module.exports = router;
