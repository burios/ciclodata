const LocalStrategy = require('passport-local').Strategy;
const { findUserByUsername, findUserById } = require('../models/userModel');
const bcrypt = require('bcryptjs');

module.exports = function(passport) {
    passport.use(new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
        try {
            const user = await findUserByUsername(username);
            if (!user) {
                return done(null, false, { message: 'Usuário não encontrado' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Senha incorreta' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await findUserById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};
