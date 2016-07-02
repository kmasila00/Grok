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

			//Here we are mapping all resource lengths to node sizes:

			var nodeSize= d3.scale.linear();

			nodeSize.domain(d3.extent($scope.topics, function(d){ return d.resources.length}));
			nodeSize.range([15,50]);


			var force = d3.layout.force()
			    .charge(-120) //how far the nodes bounce around
			    .linkDistance(300) //distance between nodes
			    .size([width, height])//size of frame(need to make responsive);

			var svg = d3.select("#home").append("svg")
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
			          .call(force.drag) //lets you drag nodes around screen
			          .on('dblclick', connectedNodes); //event handler added for highlighting connected nodes

			     node.append("circle") //appending a circle to each group element
			     .attr("r", function(d){ return nodeSize(d.resources.length)})
			     .attr("id", function(d){ return d.title; })
			     .style("fill", function(d){ return color(d.title); })

			     node.append("text")//appending text to each group element
			     .attr("text-anchor", "middle")
			     .attr("x", function(d){ return d.x})
			     .attr("y", function(d){ return d.y})
			     .text(function(d) { return d.title; });




			  //------------Handle the tick/force-simulation event and update each nodes location---------//
			  force.on("tick", function() {

			    link
			    .attr("x1", function(d) { return d.source.x; })
			    .attr("y1", function(d) { return d.source.y; })
			    .attr("x2", function(d) { return d.target.x; })
			    .attr("y2", function(d) { return d.target.y; });


			    var circle= d3.selectAll("circle")
			    .attr("cx", function(d) { return d.x; })
			    .attr("cy", function(d) {return d.y; });


		        d3.selectAll("text")
		        .attr("x", function(d) { return d.x; })
		        .attr("y", function(d) { return d.y; });

			  });


			  //-----------------Highlighting connected nodes------------//

			  //Toggle stores whether the highlighting is on
			  var toggle = 0;

			  //Create an array logging what is connected to what
			  var linkedByIndex = {};
			  for ( var i = 0; i < $scope.topics.length; i++) {
			      linkedByIndex[i + "," + i] = 1;
			  };
			  dataLinks.forEach(function (d) {
			  	console.log("In data link for each: ", d);
			      linkedByIndex[d.source.index + "," + d.target.index] = 1;
			  });

			  console.log(linkedByIndex);
			  //This function looks up whether a pair are neighbours
			  function neighboring(a, b) {
			      return linkedByIndex[a.index + "," + b.index];
			  }

			  function connectedNodes() {

			      if (toggle == 0) {
			          //Reduce the opacity of all but the neighbouring nodes
			           var d = d3.select(this).node().__data__;
			          node.style("opacity", function (o) {
			              return neighboring(d, o) | neighboring(o, d) ? 1 : 0.1;
			          });

			          link.style("opacity", function (o) {
			              return d.index==o.source.index | d.index==o.target.index ? 1 : 0.1;
			          });

			          //Reduce the op

			          toggle = 1;
			      } else {
			          //Put them back to opacity=1
			          node.style("opacity", 1);
			          link.style("opacity", 1);
			          toggle = 0;
			      }

			  }





		}
	}

})