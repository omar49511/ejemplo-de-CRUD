const product = require('../models/product');

module.exports=(req, res)=>{
    let datoModificar = req.params.productid;
    let update = req.body;
    console.log(datoModificar);
    console.log(update);

    product.findOneAndUpdate({_id:datoModificar}, update, (err, products)=>{
        
        if(err) return res.status(500).send({
            message: `error al actualizar el producto ${err}`
        });
        if(!products) return res.status(404).send({
            message: 'El producto no existen'
        })
        //res.status(200).send({product:products})
        res.redirect('/api/product');
    });
};