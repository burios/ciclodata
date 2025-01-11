function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // O usuário está autenticado, prossegue para a próxima função
    }
    res.redirect('/login'); // Se não estiver autenticado, redireciona para a página de login
}

module.exports = ensureAuthenticated;
