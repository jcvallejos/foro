const express = require('express');
const app =express();
const path = require('path');
const bodyParser =require('body-parser');
const session = require('express-session');
const passport = require('passport');

app.use(bodyParser.urlencoded({extended:false}));
app.set(bodyParser.json());

app.use(session({
    secret : 'secreto',
    resave : true,
    saveUninitialized :false
}));

app.set('port', 3000);
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views') );
app.use(express.static(path.join(__dirname,'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use(require('./routes/index'));
app.use('/directorio', require('./routes/directorio'));

app.listen(app.get('port'), ()=>{
    console.log("El servidor esta funcionando!!");
})