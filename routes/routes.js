//import modules
const express=require('express');
const req = require('express/lib/request');
const path = require('path');

const Product= require('../models/product');

//create a router object
const router = express.Router();

//exports our router

module.exports= router;

//consulta de todos los datos
router.get('/api/product', (req,res) =>{

    Product.find({},(err,products) => {
        if(err) return res.status(500).send({
            message: `error al realizar la peticion ${err}`
        });
        if( products=='') return res.render('showProducts',{products})
        
        // res.status(404).send({
        //     message: 'No existen productos'
        // }) 

        // res.status(200).send({products})

        res.render('showProducts',{products})
    }).lean();

} );

// insertar un nuevo producto
router.get('/insertProduct', (req,res) =>{  //insertar un nuevo producto
    res.render('product')
});

//* omar reyes zamudio

//consulta por filtro
router.get('/api/product/:datoBusqueda', (req,res) =>{
    let datoBusqueda = req.params.datoBusqueda;
    Product.findById(datoBusqueda,(err,products) => {
        if(err) return res.status(500).send({
            message: `error al realizar la peticion ${err}`
        });
        if(!products) return res.status(404).send({
            message: 'el producto no existe'
        });
        //res.status(200).send({product:products})
        res.render('editar', {product:products})
    }).lean();
});

//midificar producto PUT
const putProduct = require('../controllers/putProduct');
router.put('/api/product/:productid', putProduct);


// insertar valores en la base de datos
router.post('/api/product', (req,res) => {
    let product = new Product();
    product.name=req.body.name;
    product.picture = req.body.picture;
    product.price=req.body.price;
    product.category = (req.body.category).toLowerCase();
    product.description= req.body.description;

    console.log(req.body);

    product.save((err,productStored) =>{
    
        if (err) return res.status(500).send ({
            message: `error al realizar la peticion ${err}`

        });
        // res.status(200).send({product});
        res.render('product')
    });

});
//Borrar un registro Delete

const delProduct = require('../controllers/delProduct');
router.delete('/api/product/:productid', delProduct);

router.get('/',(req,res)=>{
    // res.status(200).send('hola mundo soy home');
    res.render('home')
});

router.use((req,res)=>{
    // res.status(404).send('pagina no encontrada');
    res.render('notfound')
});