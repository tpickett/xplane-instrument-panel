import 'reflect-metadata';
import {Component, OnInit, AfterViewInit} from 'angular2/core';
import $ from 'jquery';
import * as d3 from 'd3/d3';
global.d3 = d3;
const width = 300;
const height = 300;
let fs = require('fs');


@Component({
  selector: 'verticalspeed-instrument',
  template: `${fs.readFileSync(__dirname + '/verticalspeed.html')}`,
  directives: [],
  providers:  []
})
export class VerticalspeedInstrument implements OnInit, AfterViewInit{
	constructor(){
		this.svg = null;
	}
  setupInstrument(){
    this.svg = d3.select(".verticalspeed").append("svg").attr({"id":"verticalspeedsvg", "width":width, "height": height});
    //Pattern injection
    this.defs = this.svg.append("defs")
    this.pattern = this.defs.append("pattern").attr({ id:"verticalspeedPattern", width:width, height:height, patternUnits:"userSpaceOnUse"});
    this.image = this.pattern.append("image").attr({'xlink:href':'http://localhost:8080/assets/img/verticalspeed/verticalspeed.png', width:width, height:height, x:"0", y:"0"})
    this.pattern2 = this.defs.append("pattern").attr({ id:"verticalspeedDialPattern", width:width, height:height, patternUnits:"userSpaceOnUse"});
    this.image = this.pattern2.append("image").attr({'xlink:href':'http://localhost:8080/assets/img/verticalspeed/verticalspeed-dial.png', width:width, height:height, x:"0", y:"0"})

    //Shape design
    this.verticalspeed = this.svg.append("rect").attr({x:"0", y:"0", width:width, height:height,fill:"url(/panel#verticalspeedPattern)"})
    this.verticalspeedDial = this.svg.append("rect").attr({x:"0", y:"0", width:width, height:height,fill:"url(/panel#verticalspeedDialPattern)"})

  }
  tweenNeedle(d, i ,a){
    // d3.interpolateString("rotate(270, 120, 130)", "rotate(360, 120, 130)");
    return d3.interpolateString("rotate(360, 150, 130)", "rotate(270, 145, 155)");
  }
	ngOnInit() {
		return;
	}
	ngAfterViewInit(){
    setTimeout(()=>{
      this.verticalspeedDial.transition()
        .duration(2000)
        .attrTween("transform", this.tweenNeedle)
    }, 2500)
		return this.setupInstrument();
	}
}