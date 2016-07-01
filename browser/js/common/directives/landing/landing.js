app.directive('landing', function(){

	return{
		restrict: 'E',
		templateUrl: 'js/common/directives/landing/landing.html',
		scope:{
			topics: "=",
			prereqs: "="
		},
		controller: function($scope, TopicFactory){

			var width = 960,
			    height = 500;

			var color = d3.scale.category20();

			var force = d3.layout.force()
			    .charge(-120) //how far the nodes bounce around
			    .linkDistance(100) //distance between nodes
			    .size([width, height])//size of frame(need to make responsive);

			var svg = d3.select("body").append("svg")
			    .attr("width", width)
			    .attr("height", height);


			  var data = {}; //used to reference the topics
			  var dataLinks = []; //to store links("relationships")

			  //creating key value pairs where the key is topic id, value is the whole topic object
			  $scope.topics.forEach(function(elem){
			  	data[elem.id] = elem;
			  })

			  //creating the array of links by pushing objects with a source, target and value(weight of lines)
			  $scope.prereqs.forEach(function(elem){
			  	dataLinks.push({source: data[elem.topicId], target: data[elem.prerequisiteId], value:1});
			  })

			  force
			      .nodes($scope.topics) //setting nodes as topics
			      .links(dataLinks) //setting relationh
			      .start();

			  var link = svg.selectAll(".link")
			      .data(dataLinks)
			    .enter().append("line") // creates lines
			      .attr("class", "link") //gives links class so it can be selected
			      .style("stroke", "#000000") //stroke color
			      //thickness of links                        //scales line-widths
			      .style("stroke-width", function(d) { return Math.sqrt(d.value)/2; });

			  var node = svg.selectAll(".node")
			      .data($scope.topics)
			    .enter().append("circle") //shape of nodes
			      .attr("class", "node")
			      .attr("r", 5) //radius of nodes (modified depending on #of resources on topic)
			      .attr("id", function(d){ return d.title })
			      .style("fill", function(d) { return color(d.title); }) //color of nodes
			      .call(force.drag); //lets you drag nodes around screen

			  node.append("title")
			      .text(function(d) { return d.name; });

			  //what makes the nodes move on the page
			  force.on("tick", function() {
			    link.attr("x1", function(d) { return d.source.x; })
			        .attr("y1", function(d) { return d.source.y; })
			        .attr("x2", function(d) { return d.target.x; })
			        .attr("y2", function(d) { return d.target.y; });

			    node.attr("cx", function(d) { return d.x; })
			        .attr("cy", function(d) { return d.y; });
			  });


		}
	}

})