'use strict'


/*
 * 
 * omar reyes zamudio
 * 
 */
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const hbs = require('express-handlebars');
const req = require('express/lib/request');
const router = require('./routes/routes');


const app=express();

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//body parser
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//recursos static / public
// app.use('/static',express.static ('public'))
app.use(express.static('public'));
app.use('/',router);

//motor de vistas
app.engine('.hbs', hbs.engine({
    defaltLayout: 'index',
    extname: '.hbs'
}))

app.set('view engine','.hbs')




//conexicon a BD
mongoose.connect(config.db,config.urlParser, (err,res)=>{

    if(err){
        return console.log(`error al conectar a la db ${err}`)
    }

    console.log('conexion exitosa');

    app.listen(config.port, ()=>{
        console.log(`Ejecutando en http://localhost:${config.port}`);
    })
});
