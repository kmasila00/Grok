app.directive('landing', function(){

	return{
		restrict: 'E',
		templateUrl: 'js/common/directives/landing/landing.html',
		scope:{
			topics: "=",
			prereqs: "="
		},
		controller: function($scope, TopicFactory){

			var width = 1400,
			    height = 800;

			var color = d3.scale.category20();

			var force = d3.layout.force()
			    .charge(-120) //how far the nodes bounce around
			    .linkDistance(300) //distance between nodes
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
			      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

			  // var node = svg.selectAll(".node")
			  //     .data($scope.topics)
			  //   .enter().append("circle") //shape of nodes
			  //     .attr("class", "node")
			  //     .attr("r", 10) //radius of nodes (modified depending on #of resources on topic)
			  //     .attr("id", function(d){ return d.title })
			  //     .style("fill", function(d) { return color(d.title); }) //color of nodes
			  //     .call(force.drag); //lets you drag nodes around screen

			  var node = svg.selectAll("g.node")
			          .data($scope.topics)
			        .enter().append("g") //svg group element that will contain circle and text elements
			          .attr("class", "node")// give it a class of node
			          .call(force.drag); //lets you drag nodes around screen

			     node.append("circle") //appending a circle to each group element
			     .attr("r", 15)
			     .attr("id", function(d){ return d.title; })
			     .style("fill", function(d){ return color(d.title); })

			     node.append("text")//appending text to each group element
			     .attr("text-anchor", "middle")
			     .attr("x", function(d){ return d.x})
			     .attr("y", function(d){ return d.y})
			     .text(function(d) { return d.title; });




			  //what makes the nodes move on the page
			  force.on("tick", function() {
			    link.attr("x1", function(d) { return d.source.x; })
			        .attr("y1", function(d) { return d.source.y; })
			        .attr("x2", function(d) { return d.target.x; })
			        .attr("y2", function(d) { return d.target.y; });

			    // node.attr("x", function(d) { return d.x; })
			    //     .attr("y", function(d) { return d.y; });
			    d3.selectAll("circle").attr("cx", function(d) {
			          return d.x;
			        })
			        .attr("cy", function(d) {
			          return d.y;
			        });

			      d3.selectAll("text").attr("x", function(d) {
			          return d.x;
			        })
			        .attr("y", function(d) {
			          return d.y;
			        });
			  });


		}
	}

})