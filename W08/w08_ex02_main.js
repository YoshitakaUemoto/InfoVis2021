d3.csv("https://yoshitakauemoto.github.io/InfoVis2021/W08/w08_task2.csv")
    .then(data =>{
	data.forEach( d => {d.label = d.label; d.width = +d.width;});

	var config = {
	    parent: '#drawing_region',
	    width:256,
	    height:256,
	    margin: {top:10, right:10, bottom:25, left:25}
	};


var width = 256;
var height = 128;

var svg = d3.select('#drawing_region')
    .attr('width', width)
    .attr('height', height);

const line = d3.line()
      .x( d => d.x )
      .y( d => d.y );

svg.append('path')
    .attr('d', line(data))
    .attr('stroke', 'black')
    .attr('fill', 'none');
