d3.csv("https://yoshitakauemoto.github.io/InfoVis2021/W04/W04/w04_task1.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 400,
            height: 400,
            margin: {top:40, right:10, bottom:50, left:50}
        };

        const scatter_plot = new ScatterPlot( config, data );
        scatter_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class ScatterPlot {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10}
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleLinear()
            .range( [20, self.inner_width-20] );

        self.yscale = d3.scaleLinear()
            .range( [20, self.inner_height-20] );

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(8).tickPadding([10]);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

	self.yaxis = d3.axisRight( self.yscale)
	    .ticks(6);

	self.yaxis_group = self.chart.append('g')
	    .attr('transform', `translate(-15,0)`);

	self.title = self.chart.append('text')
	    .attr("x",(self.inner_width-40)/2)
	    .attr("y",-10)
	    .attr("text-anchor","middle")
	    .attr("font-size","20pt")
	    .attr("font-weight","bold")
	    .text("Sample Data");

	self.xlabel = self.chart.append('text')
	    .attr("x",(self.inner_width-40)/2)
	    .attr("y",self.inner_height+40)
	    .attr("text-anchor","middle")
	    .attr("font-size","10pt")
	    .attr("font-weight","bold")
	    .text("X-label");

	self.ylabel = self.chart.append('text')
	    .attr("x",-self.inner_height/2+20)
	    .attr("y",-30)
	    .attr("transform","rotate(-90)")
	    .attr("text-anchor","middle")
	    .attr("font-size","10pt")
	    .attr("font-weight","bold")
	    .text("Y-label");
	
    }

    update() {
        let self = this;

        const xmin = d3.min( self.data, d => d.x );
        const xmax = d3.max( self.data, d => d.x );
        self.xscale.domain( [xmin, xmax] );

        const ymin = d3.min( self.data, d => d.y );
        const ymax = d3.max( self.data, d => d.y );
        self.yscale.domain( [ymax, ymin] );

        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr("cx", d => self.xscale( d.x ) )
            .attr("cy", d => self.yscale( d.y ) )
            .attr("r", d => d.r );

        self.xaxis_group
            .call( self.xaxis );

	self.yaxis_group
	    .call(self.yaxis);
	
    }
}
