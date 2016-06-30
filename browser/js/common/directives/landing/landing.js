app.directive('landing', function(){

	return{
		restrict: 'E',
		templateUrl: 'js/common/directives/landing/landing.html',
		link: function(scope, TopicFactory){

			var sample_data = [
		    {"name": "alpha", "Resources": 10},
		    {"name": "beta", "Resources": 12},
		    {"name": "gamma", "Resources": 30},
		    {"name": "delta", "Resources": 26},
		    {"name": "epsilon", "Resources": 12},
		    {"name": "zeta", "Resources": 26},
		    {"name": "theta", "Resources": 11},
		    {"name": "eta", "Resources": 24}
		  ];

		  var positions = [
		    {"name": "alpha", "x": 10, "y": 15},
		    {"name": "beta", "x": 12, "y": 24},
		    {"name": "gamma", "x": 30, "y": 18},
		    {"name": "delta", "x": 26, "y": 21},
		    {"name": "epsilon", "x": 13, "y": 4},
		    {"name": "zeta", "x": 31, "y": 13},
		    {"name": "theta", "x": 19, "y": 8},
		    {"name": "eta", "x": 24, "y": 11},
		    {"name": "eta", "x": 21, "y": 3},
		    {"name": "eta", "x": 22, "y": 6},
		    {"name": "eta", "x": 23, "y": 7}
		  ];

		  var connections = [
		    {"source": "alpha", "target": "beta", "strength":5},
		    {"source": "alpha", "target": "gamma", "strength":10},
		    {"source": "beta", "target": "delta", "strength":7},
		    {"source": "beta", "target": "epsilon", "strength":12},
		    {"source": "zeta", "target": "gamma", "strength":3},
		    {"source": "theta", "target": "gamma", "strength":1},
		    {"source": "eta", "target": "gamma", "strength":20}
		  ];

		  var visualization = d3plus.viz()
		    .container("#viz")
		    .type("network")
		    .background('#000000')
		    .height({
		    	value: window.height
		    })
		    .width({
		    	value: window.width
		    })
		    .data(sample_data)
		    .nodes({
		        value: positions,
		        overlap: 0.5
		    })
		    .edges({
		        size: "strength",
		        value: connections
		    })
		    .edges({"arrows": false})
		    .size("Resources")
		    .id("name")
		    .draw()


		}
	}

})