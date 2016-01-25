import 'reflect-metadata';
import {Component, OnInit, AfterViewInit} from 'angular2/core';
const fs = require('fs');
import $ from 'jquery';
global.$ = $;
global.jQuery = $;
import {Draggable} from 'jquery-ui';
import {gridster} from 'gridster/src/jquery.gridster.js';
// import d3 from 'd3-browserify';
import * as d3 from 'd3/d3';
global.d3 = d3;
// require('../d3-plugin/d3.chart.js')(d3)
@Component({
  template: `${fs.readFileSync(__dirname + '/widget-area.html')}`,
  directives: [],
  providers:  []
})
export class WidgetArea implements OnInit, AfterViewInit{
	constructor(){
		$(".gridster ul").gridster({
            widget_margins: [5, 5],
          widget_base_dimensions: [100, 55],
            shift_larger_widgets_down: false
        });
		
	}
	// ngOnInit() {
	//     console.log(`onInit`);
	//   }
	ngAfterViewInit(){
	    console.log("afterViewInit() called");
        let svg = d3.select("#test").append("svg"),
            max = { x: 230, y: 152},
		    imgUrl = "http://thedali.org/wp-content/uploads/2015/04/main_feature_image.png";


		svg.append("defs")
		    .append("pattern")
		    .attr("id", "venus")
		    .attr('patternUnits', 'userSpaceOnUse')
		    .attr("width", max.x)
		    .attr("height", max.y)
		    .append("image")
		    .attr("xlink:href", imgUrl)
		    .attr("width", max.x)
		    .attr("height", max.y);

		svg.append("rect")
		    .attr("x", "0")
		    .attr("y", "0")
		    .attr("width", max.x)
		    .attr("height", max.y)
		    .attr("fill", "url(#venus)");
	}
}