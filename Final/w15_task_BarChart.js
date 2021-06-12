class BarChart {
    constructor (config, data) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
            xlabel: config.xlabel || '',
            ylabel: config.ylabel || '',
            cscale: config.cscale
        };
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select(self.config.parent)
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleBand()
            .range([0, self.inner_width])
            .paddingInner(0.2)
            .paddingOuter(0.1);

        self.yscale = d3.scaleLinear()
            .range([self.inner_height,0]);

        self.xaxis = d3.axisBottom(self.xscale)
            .ticks(['2014','2015','2016','2017','2018','2019','2020'])
            .tickSizeOuter(0);

        self.yaxis = d3.axisLeft(self.yscale)
            .ticks(5)
            .tickSizeOuter(0);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

        self.yaxis_group = self.chart.append('g');

        const xlabel_space = 40;
        self.svg.append('text')
            .style('font-size', '12px')
            .attr('x', self.config.width / 2)
            .attr('y', self.inner_height + self.config.margin.top + xlabel_space)
            .text( self.config.xlabel );

        const ylabel_space = 50;
        self.svg.append('text')
            .style('font-size', '12px')
            .attr('transform', `rotate(-90)`)
            .attr('y', self.config.margin.left - ylabel_space)
            .attr('x', -(self.config.height / 2))
            .attr('text-anchor', 'middle')
            .attr('dy', '1em')
            .text( self.config.ylabel );
    }

    update() {
        let self = this;

//        const data_map = d3.rollup( self.data, v => v.length, d => d.species );
//        self.aggregated_data = Array.from( data_map, ([key,count]) => ({key,count}) );

//        self.cvalue = d => d.key;
//        self.xvalue = d => d.key;
//        self.yvalue = d => d.count;

//        const items = self.aggregated_data.map( self.xvalue );
        self.xscale.domain(self.data.map(d => d.year));

//        const ymin = 0;
//        const ymax = d3.max( self.aggregated_data, self.yvalue );
	self.yscale = d3.scaleLinear()
	    .domain([0,20000])
	    .range([0,self.inner_height]);

//	self.yscale.domain([0,20000]);

        self.render();
    }

    render() {
        let self = this;

        let book = self.chart.append("g")
	    .selectAll(".bar")
            .data(self.data)
            .join("rect")
            .attr("class", "bar")
            .attr("x", d => self.xscale(d.year) )
            .attr("y",d => self.inner_height-self.yscale(d.book))
            .attr("width", self.xscale.bandwidth())
            .attr("height", d => self.yscale(d.book))
            .attr("fill","aqua")
            .on('click', function(ev,d) {
                const is_active = filter.includes('book');
                if ( is_active ) {
                    filter = filter.filter( f => f !== d.key );
                }
                else {
                    filter.push('book' );
                }
                Filter();
                d3.select(this).classed('active', !is_active);
            });

	let magazine = self.chart.append("g")
	    .selectAll(".bar")
            .data(self.data)
            .join("rect")
            .attr("class", "bar")
            .attr("x", d => self.xscale(d.year) )
            .attr("y",d => self.inner_height-self.yscale(d.magazine)-self.yscale(d.book))
            .attr("width", self.xscale.bandwidth())
            .attr("height", d => self.yscale(d.magazine))
            .attr("fill","blue")
            .on('click', function(ev,d) {
                const is_active = filter.includes('magazine');
                if ( is_active ) {
                    filter = filter.filter( f => f !== d.key );
                }
                else {
                    filter.push('magazine' );
                }
                Filter();
                d3.select(this).classed('active', !is_active);
            });

	let ebook = self.chart.append("g")
	    .selectAll(".bar")
            .data(self.data)
            .join("rect")
            .attr("class", "bar")
            .attr("x", d => self.xscale(d.year) )
            .attr("y",d => self.inner_height-self.yscale(d.magazine)-self.yscale(d.book)-self.yscale(d.ebook))
            .attr("width", self.xscale.bandwidth())
            .attr("height", d => self.yscale(d.ebook))
            .attr("fill","red")
            .on('click', function(ev,d) {
                const is_active = filter.includes('ebook');
                if ( is_active ) {
                    filter = filter.filter( f => f !== d.key );
                }
                else {
                    filter.push('ebook' );
                }
                Filter();
                d3.select(this).classed('active', !is_active);
            });

	let emagazine = self.chart.append("g")
	    .selectAll(".bar")
            .data(self.data)
            .join("rect")
            .attr("class", "bar")
            .attr("x", d => self.xscale(d.year) )
            .attr("y",d => self.inner_height-self.yscale(d.magazine)-self.yscale(d.book)-self.yscale(d.ebook)-self.yscale(d.emagazine))
            .attr("width", self.xscale.bandwidth())
            .attr("height", d => self.yscale(d.emagazine))
            .attr("fill","purple")
            .on('click', function(ev,d) {
                const is_active = filter.includes('emagazine');
                if ( is_active ) {
                    filter = filter.filter( f => f !== d.key );
                }
                else {
                    filter.push('emagazine' );
                }
                Filter();
                d3.select(this).classed('active', !is_active);
            });

	console.log(self.data,d => d.ecomic);
	let ecomic = self.chart.append("g")
	    .selectAll(".bar")
            .data(self.data)
            .join("rect")
            .attr("class", "bar")
            .attr("x", d => self.xscale(d.year) )
            .attr("y",d => self.inner_height-self.yscale(d.magazine)-self.yscale(d.book)-self.yscale(d.ebook)-self.yscale(d.emagazine)-self.yscale(d.ecomic))
            .attr("width", self.xscale.bandwidth())
            .attr("height", d => self.yscale(d.ecomic))
	    .attr("fill","fuchsia")
            .on('click', function(ev,d) {
                const is_active = filter.includes('ecomic');
                if ( is_active ) {
                    filter = filter.filter( f => f !== d.key );
                }
                else {
                    filter.push('ecomic' );
                }
                Filter();
                d3.select(this).classed('active', !is_active);
            });

        self.xaxis_group
            .call(self.xaxis);

        self.yaxis_group
            .call(self.yaxis);
    }
}
