d3.csv("https://yoshitakauemoto.github.io/InfoVis2021/W08/w08_task03.csv")
    .then(data =>{
	data.forEach( d => {d.value = +d.value;});

	var config = {
	    parent: '#drawing_region',
	    width:256,
	    height:256,
	    margin: {top:10, right:10, bottom:25, left:25}
	};

	const piechart = new PieChart(config, data);
	piechart.update();
    })
    .catch(error =>{
	console.log(error);
    });

class PieChart{

    constructor(config,data){
	this.config = {
	    parent:config.parent,
	    width:config.width ||256,
	    height:config.height ||256,
	    margin:config.margin || {top:10, right:10, bottom:25, left:25}
	}
	this.data = data;
	this.init();
    }
    
    init(){
	let self = this;
	
	self.radius = Math.min(self.config.width, self.config.height ) / 2;

	self.svg = d3.select(self.config.parent)
	    .attr('width', self.config.width)
	    .attr('height',self.config.height)
	    .append('g')
	    .attr('transform', `translate(${self.config.width/2}, ${self.config.height/2})`);

	self.chart = self.svg.append('g')
	    .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

	self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
	self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom; 
    }

    update(){
	let self = this;

	self.render();
    }

    render(){

	let self = this;

	var pie = d3.pie()
	    .value( d => d.value )
	    .sort(null);

	var arc = d3.arc()
	    .innerRadius(30)
	    .outerRadius(self.radius);

	var text_arc = d3.arc()
	    .innerRadius(self.radius-30)
	    .outerRadius(self.radius-30);

	var p = self.svg.selectAll('pie')
	    .data( pie(self.data) )
	    .enter()
	    .append('g')
	    .attr('class', 'pie');

	p.append('path')
	    .attr('d',arc)
	    .attr('fill', 'black')
	    .attr('stroke', 'white')
	    .style('stroke-width', '2px');

	p.append("text")
	    .attr("fill","white")
	    .attr("transform",function(d){ return "translate(" + text_arc.centroid(d) + ")";})
	    .attr("dy","5px")
	    .attr("font","10px")
	    .attr("text-anchor","middle")
	//.text(function(d){return d.label});
	    .text(d => d.data.label)
    }
}
