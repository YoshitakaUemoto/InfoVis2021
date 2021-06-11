let input_data;
let line_chart;
let bar_chart;
let filter = [];

d3.csv("https://yoshitakauemoto.github.io/InfoVis2021/Final/bookdata.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
	    //d.year = +d.year;
            d.book = +d.book;
            d.magazine = +d.magazine;
	    d.ebook = +d.ebook;
	    d.emagazine = +d.emagazine;
	    d.ecomic = +d.ecomic;
	    d.b_raito = +d.b_raito;
	    d.m_raito = +d.m_raito;
	    d.eb_raito = +d.eb_raito;
	    d.em_raito = +d.em_raito;
	    d.ec_raito = +d.ec_raito;
        });

        const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        color_scale.domain(['book','magazine','ebook','emagazine','ecomic']);

        line_chart = new LineChart( {
            parent: '#drawing_region_linechart',
            width: 400,
            height: 400,
            margin: {top:10, right:30, bottom:50, left:50},
            xlabel: '年度',
            ylabel: '年度別売上/2014年度売上',
            cscale: color_scale
        }, input_data );
        line_chart.update();

//        bar_chart = new BarChart( {
//            parent: '#drawing_region_barchart',
//            width: 256,
//            height: 256,
//            margin: {top:10, right:10, bottom:50, left:50},
//            xlabel: '年度',
//            cscale: color_scale
//        }, input_data );
//        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });

function Filter() {
//    if ( filter.length == 0 ) {
//        scatter_plot.data = input_data;
//    }
//    else {
//        scatter_plot.data = input_data.filter( d => filter.includes( d.species ) );
//    }
    line_chart.update();
}
