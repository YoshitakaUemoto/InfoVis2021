d3.csv("https://yoshitakauemoto.github.io/InfoVis2021/W04/W04/w04_task2.csv")
    .then(data =>{
	data.forEach( d => { d.width = +d.width;});

	var config = {
	    parent: '#drawing_region',
	    width:256,
	    height:256,
	    margin: {top:10, right:10, bottom:25, left:25}
	};

	const barchart = new BarChart(config, data);
	barchart.update();
    })
    .catch(error =>{
	console.log(error);
    });

class BarChart{

    constructor (config,data){
	this.config = {
	    parent: config.parent,
	    width:config.width ||256,
	    height:config.height || 256,
	    margin: config.margin || {top:10, right:10, bottom:25, left:25}
	}
	this.data = data;
	this.init();
    }
    init(){
	let self = this;

	self.svg = d3.select(self.config.parent)
	    .attr('width', self.config.width)
	    .attr('height', self.config.height);

	self.chart = self.svg.append('g')
	    .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);
	self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
	self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

	// Initialize axis scales
	self.xscale = d3.scaleLinear()
	    .domain([0, d3.max(self.data, d => d.width)])
	    .range([0, self.inner_width]);
	
	self.yscale = d3.scaleBand()
	    .domain(self.data.map(d => d.label))
	    .range([0, self.inner_height])
	    .paddingInner(0.1);

	// Initialize axes
	self.xaxis = d3.axisBottom(self. xscale )
	    .ticks(5)
	    .tickSizeOuter(0);

	self.yaxis = d3.axisLeft( self.yscale )
	    .tickSizeOuter(0);

	// Draw the axis
	self.xaxis_group = self.chart.append('g')
	    .attr('transform', `translate(0, ${self.inner_height})`)
	    //.call( xaxis );

	self.yaxis_group = self.chart.append('g')
	//.call( yaxis );

	self.oridata = Array.from(self.data);
	
    }
     update(){
	let self = this;
	const xmin = d3.min(self.data,d => d.width);
	const xmax = d3.max(self.data,d => d.width);
	self.xscale.domain([0,xmax]);
	self.yscale.domain(self.data.map(d => d.label));
	self.render();
     }
    render(){
	let self = this;
	//const oridata = Array.from(self.data);
	self.chart.selectAll("rect")
	    .data(self.data)
	    .join("rect")
	    .transition().duration(1000)
	    .attr("x", 0)
	    .attr("y", d => self.yscale(d.label))
	    .attr("width", d => self.xscale(d.width))
	    .attr("height", self.yscale.bandwidth());

	self.xaxis_group
	    .call(self.xaxis);
	self.yaxis_group
	    .call(self.yaxis);

	d3.select('#reverse')
	    .on('click', d => {
		self.data.reverse();
		self.update();
	    });

	d3.select('#descend')
	    .on('click', d => {
		self.data.sort(dessort);
		self.update();
	    });
	function dessort(a,b){
	    return b.width-a.width;
	}
	d3.select('#ascend')
	    .on('click', d => {
		self.data.sort(ascsort);
		self.update();
	    });
	function ascsort(a,b){
	    return a.width-b.width;
	}
	d3.select('#reset')
	    .on('click',d => {
		self.data = Array.from(self.oridata);
		self.update();
	    });
    }
}  
