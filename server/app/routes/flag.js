var express = require('express');
var router = express.Router();
var db= require('../../db/');
var FlaggedTopic= db.model('flaggedTopic');

var FlaggedResource= db.model('flaggedResource');

module.exports = router;


//***********Topic flags******************//
router.get('/topic/:topicId', function(req, res, next){
  FlaggedTopic.findAll({
    where: {
      topicId: req.params.topicId
    }
  })
  .then(flaggedTopics => {
    res.status(200).send(flaggedTopics)
  })
  .catch(next);

});

router.post('/topic/:topicId', function(req, res, next){
  req.body.userId= req.user.dataValues.id;
  req.body.topicId= req.params.topicId
  FlaggedTopic.create(req.body)
  .then(function(flaggedTopic){
    res.status(200).send(flaggedTopic);
  })
  .catch(next);

});

router.delete('/topic/:flagId', function(req, res, next){
  FlaggedTopic.destroy({
    where:{
      id: req.params.flagId
    }
  })
  .then( () => res.sendStatus(204))
  .catch(next);
})



// //***********Resource flags******************//


router.get('/resource/:resourceId', function(req, res, next){
  FlaggedResource.findAll({
    where: {
      resourceId: req.params.resourceId
    }
  })
  .then(flaggedResource => res.status(200).send(flaggedResource))
  .catch(next);

});

router.post('/resource/:resourceId', function(req, res, next){
  req.body.userId= req.user.dataValues.id;
  req.body.resourceId= req.params.resourceId
  FlaggedResource.create(req.body)
  .then(function(flaggedResource){
    res.status(200).send(flaggedResource);
  })
  .catch(next);

});

router.delete('/resource/:flagId', function(req, res, next){
  FlaggedResource.destroy({
    where:{
      id: req.params.flagId
    }
  })
  .then( () => res.sendStatus(204))
  .catch(next);
})
