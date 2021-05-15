d3.csv("https://yoshitakauemoto.github.io/InfoVis2021/W08/w08_task2.csv")
    .then(data =>{
	data.forEach( d => {d.x = +d.x; d.y = +d.y;});

	var config = {
	    parent: '#drawing_region',
	    width:256,
	    height:256,
	    margin: {top:10, right:10, bottom:25, left:25}
	};

	const linechart = new LineChart(config,data);
	linechart.update();
    })
    .catch(error =>{
	console.log(error);
    });

class LineChart{

    constuctor (config,data){
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
//	    .domain([0, d3.max(self.data, d => d.width)])
	    .range([0, self.inner_width]);
	
	self.yscale = d3.scaleLinear()
//	    .domain(self.data.map(d => d.label))
	    .range([0, self.inner_height])
	    .paddingInner(0.1);

	self.xaxis = d3.axisBottom(self.xscale)
	    .ticks(3)
	    .tickSize(5)
	    .tickPadding(5);

	self.yaxis = d3.axisLeft(self.yscale)
	    .ticks(3)
	    .tickSize(5)
	    .tickPadding(5);

	self.xaxis_group = self.chart.append('g')
	    .attr('transform',`translate(0, ${self.inner_height})`);

	self.yaxis_group = self.chart.append('g');
    }

    update(){
	let self = this;

	const space = 10;
	const xmin = d3.min(self.data, d => d.x) - space;
	const xmax = d3.max(self.data, d => d.x) + space;
	self.xscale.domain([xmin,xmax]);

	const ymin = d3.min(self.data, d => d.y) - space;
	const ymax = d3.max(self.data, d => d.y) + space;
	self.yscale.domain([ymin,ymax]);

	self.render();
    }

    render(){

	self.line = d3.line()
	    .x( d => self.xscale(d.x))
	    .y( d => self.yscale(d.y) );

	self.svg.append('path')
	    .attr('d', line(data))
	    .attr('stroke', 'black')
	    .attr('fill', 'none');

	self.xaxis_group
	    .call(self.xaxis);

	self.yaxis_group
	    .call(self.yaxis);
    }
}
