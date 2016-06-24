'use strict'

const router = require('express').Router()
const Category = require('../../db').model('category')

module.exports = router;

router.param('categoryId', function(req, res, next, id) {
  Category.findById(id).then(function(category) {
    if (!category) res.sendStatus(404)
    req.category = category;
    next();
  }).catch(next)
})

router.get('/', function(req, res, next) {
  Category.getCategoryArr()
  .then(categories => res.send(categories))
  .catch(next);
});

router.post('/', function(req, res, next) {
  Category.create(req.body)
  .then(category => res.send(category))
  .catch(next);
});

router.get('/:categoryId', function(req, res) {
  res.json(req.category);
});


// ============================== ADMIN ROUTES ==============================

router.put('/:categoryId', function(req, res, next) {
  if(req.user.isAdmin){
    req.category.update(req.body).then(function(category){
      res.status(200).json(category);
    })
    .catch(next)
  }
  else {
    var err = new Error('You must be an admin to update a category');
    err.status = 401;
    throw err;
  }
});

router.delete('/:categoryId', function(req, res, next) {
  if(req.user.isAdmin){
    req.category.destroy().then(function(){
      res.sendStatus(204);
    })
    .catch(next)
  }
  else{
    var err = new Error('You must be an admin to delete a category');
    err.status = 401;
    throw err;
  }
});
