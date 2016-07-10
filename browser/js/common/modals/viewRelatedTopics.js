app.controller('RelatedTopicModalCtrl', function ($scope, $uibModalInstance, topic, type, PrereqFactory) {

  $scope.topic= topic;

  function assignRelatedTopics(){
    console.log("I am in relatedTopics")
    if(type==="prereq"){
     $scope.relatedTopics= topic.prereqTopics;
     $scope.heading= "Prerequisite Topics"
   }
    else {
      $scope.relatedTopics= topic.subseqTopics;
      $scope.heading= "Subsequent Topics"
    }
  }
  assignRelatedTopics();

  $scope.deleteRelation= function(relationTopic){

    var removeArgObj;
    if(type === "prereq"){
        removeArgObj= {topicId: $scope.topic.id, prerequisiteId: relationTopic.prerequisiteId};
    }
    else removeArgObj={topicId: relationTopic.topicId, prerequisiteId: $scope.topic.id};

    PrereqFactory.removeRelationship(removeArgObj, type)
    .then(() => {
      console.log("I am here");
      assignRelatedTopics();

    });


  }

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
