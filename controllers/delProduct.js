const product = require("../models/product");

module.exports = (req, res) => {
  let datoBusqueda = req.params.productid;
  product.findById(datoBusqueda, (err, product) => {
    if (err)
      return res.status(500).send({
        message: `error al realizar la peticion ${err}`,
      });
    product.remove((err) => {
      if (err)
        return res.status(500).send({
          message: `error al eliminar el producto ${err}`,
        });
      // res.status(200).send({ message: "el producto ha sido eliminado" });
      res.redirect("/api/product");
    });
  });
};
