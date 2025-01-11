const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');

const connection = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes'); 
const isAuthenticated = require('./middleware/auth');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Passport
require('./config/passport')(passport);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/produtos', produtoRoutes);
app.use('/categorias', categoriaRoutes);


app.use(session({
    secret: 'seuSegredoAqui',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/', dashboardRoutes); 

app.use('/users', isAuthenticated, userRoutes);
app.use('/produtos', isAuthenticated, produtoRoutes);
app.use('/categorias', isAuthenticated, categoriaRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
