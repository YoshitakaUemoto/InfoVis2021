class LineChart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
            xlabel: config.xlabel || '',
            ylabel: config.ylabel || '',
            cscale: config.cscale
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
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleLinear()
            .range( [self.inner_height, 0] );

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(3)
            .tickSize(5)
            .tickPadding(5);

        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(3)
            .tickSize(5)
            .tickPadding(5);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

        self.yaxis_group = self.chart.append('g');

        const xlabel_space = 40;
        self.svg.append('text')
            .style('font-size', '12px')
            .attr('x', self.config.margin.left + self.inner_width / 2)
            .attr('y', self.inner_height + self.config.margin.top + xlabel_space)
            .attr('text-anchor', 'middle')
            .text( self.config.xlabel );

        const ylabel_space = 45;
        self.svg.append('text')
            .style('font-size', '12px')
            .attr('transform', `rotate(-90)`)
            .attr('y', self.config.margin.left - ylabel_space)
            .attr('x', -self.config.margin.top - self.inner_height / 2)
            .attr('text-anchor', 'middle')
            .attr('dy', '1em')
            .text( self.config.ylabel );
    }

    update() {
        let self = this;

        self.cvalue = d => d.species;
        self.xvalue = d => d.year;
//        self.yvalue = d => d.sepal_width;

        const xmin = d3.min( self.data, self.xvalue );
        const xmax = d3.max( self.data, self.xvalue );
        self.xscale.domain( [xmin, xmax] );

//        const ymin = d3.min( self.data, self.yvalue );
//        const ymax = d3.max( self.data, self.yvalue );
        self.yscale.domain( [0.5, 4] );

	self.lineb = d3.line()
	    .x(d => self.xscale(d.year))
	    .y(d => self.yscale(d.b_raito));
	self.linem = d3.line()
	    .x(d => self.xscale(d.year))
	    .y(d => self.yscale(d.m_raito));
	self.lineeb = d3.line()
	    .x(d => self.xscale(d.year))
	    .y(d => self.yscale(d.eb_raito));
	self.lineem = d3.line()
	    .x(d => self.xscale(d.year))
	    .y(d => self.yscale(d.em_raito));
	self.lineec = d3.line()
	    .x(d => self.xscale(d.year))
	    .y(d => self.yscale(d.ec_raito));
	
        self.render();
    }

    render() {
        let self = this;

        const line_width = 3;
	const circle_radius = 5;
//	var line_color;
	if(fillter.length ==0){
	    let lineb = self.chart.append("path")
		.attr('d',self.lineb(self.data))
		.attr('stroke','aqua')
		.attr('stroke-width',line_width)
		.attr('fill','none');
	    let linem = self.chart.append("path")
		.attr('d',self.linem(self.data))
		.attr('stroke','blue')
		.attr('stroke-width',line_width)
		.attr('fill','none');
	    let lineeb = self.chart.append("path")
		.attr('d',self.lineeb(self.data))
		.attr('stroke','red')
		.attr('stroke-width',line_width)
		.attr('fill','none');
	    let lineem = self.chart.append("path")
		.attr('d',self.lineem(self.data))
		.attr('stroke','purple')
		.attr('stroke-width',line_width)
		.attr('fill','none');
	    let lineec = self.chart.append("path")
		.attr('d',self.lineec(self.data))
		.attr('stroke','fuchsia')
		.attr('stroke-width',line_width)
		.attr('fill','none');
	}else{
	    if(fillter.include('book')){
		let lineb = self.chart.append("path")
		.attr('d',self.lineb(self.data))
		.attr('stroke','aqua')
		.attr('stroke-width',line_width)
		.attr('fill','none');
	    }
	    if(fillter.include('magazine')){
		let linem = self.chart.append("path")
		.attr('d',self.linem(self.data))
		.attr('stroke','blue')
		.attr('stroke-width',line_width)
		.attr('fill','none');
	    }
	    if(fillter.include('ebook')){
		let lineeb = self.chart.append("path")
		.attr('d',self.lineeb(self.data))
		.attr('stroke','red')
		.attr('stroke-width',line_width)
		.attr('fill','none');
	    }
	    if(fillter.include('emagazine')){
		let lineem = self.chart.append("path")
		.attr('d',self.lineem(self.data))
		.attr('stroke','purple')
		.attr('stroke-width',line_width)
		.attr('fill','none');
	    }
	    if(fillter.include('ecomic')){
		let lineec = self.chart.append("path")
		.attr('d',self.lineec(self.data))
		.attr('stroke','fuchsia')
		.attr('stroke-width',line_width)
		.attr('fill','none');
	    }
        self.xaxis_group
            .call( self.xaxis );

        self.yaxis_group
            .call( self.yaxis );
    }
}
