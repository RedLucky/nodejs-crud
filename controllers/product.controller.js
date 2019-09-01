const Product = require('../models/product.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.create = function (req, res) {
  let product = new Product(
      {
          name: req.body.name,
          price: req.body.price
      }
  );

  product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Product."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  Product.find()
  .then(notes => {
      res.send(notes);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving Products."
      });
  });
};

// Find a single note with a productId
exports.findOne = (req, res) => {
  Product.findById(req.params.productId)
  .then(product => {
      if(!product) {
          return res.status(404).send({
              message: "product not found with id " + req.params.productId
          });            
      }
      res.send(product);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "product not found with id " + req.params.productId
          });                
      }
      return res.status(500).send({
          message: "Error retrieving product with id " + req.params.productId
      });
  });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  // Validate Request
  if(!req.body.name) {
      return res.status(400).send({
          message: "Product content can not be empty"
      });
  }

  // Find note and update it with the request body
  Product.findByIdAndUpdate(req.params.productId, {
    name: req.body.name || "Untitled Product",
    price: req.body.price
  }, {new: true})
  .then(product => {
      if(!product) {
          return res.status(404).send({
              message: "product not found with id " + req.params.productId
          });
      }
      res.send(product);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "product not found with id " + req.params.productId
          });                
      }
      return res.status(500).send({
          message: "Error updating product with id " + req.params.productId
      });
  });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Product.findByIdAndRemove(req.params.productId)
  .then(product => {
      if(!product) {
          return res.status(404).send({
              message: "product not found with id " + req.params.productId
          });
      }
      res.send({message: "product deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "product not found with id " + req.params.productId
          });                
      }
      return res.status(500).send({
          message: "Could not delete product with id " + req.params.productId
      });
  });
};