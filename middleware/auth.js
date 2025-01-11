// middleware/auth.js
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // Usuário está autenticado, continue
    }
    res.redirect('/auth/login'); // Redireciona para a página de login se não estiver autenticado
}

module.exports = isAuthenticated;
