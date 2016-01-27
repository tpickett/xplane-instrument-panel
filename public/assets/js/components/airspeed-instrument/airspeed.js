import 'reflect-metadata';
import {Component, OnInit, AfterViewInit} from 'angular2/core';
import {BaseGauge} from '../gauge/gauge';
const fs = require('fs');
import $ from 'jquery';
import * as d3 from 'd3/d3';
global.d3 = d3;

let needle = null;
const height = 200;

@Component({
  selector: 'airspeed-instrument',
  template: `${fs.readFileSync(__dirname + '/airspeed.html')}`,
  directives: [],
  providers:  []
})
export class AirspeedInstrument implements OnInit, AfterViewInit{
	constructor(){
		this.svg = null;
		this.width = 300;
		this.height = 300;
		// this.len = this.width / 3;
    this.radius = Math.min(this.width, this.height) / 10
	}
  tweenNeedle(d, i ,a){
  	return d3.interpolateString("rotate(360, 150, 130)", "rotate(270, 145, 155)");
  }
	ngOnInit() {
		return;
	}
	ngAfterViewInit(){
		this.svg = d3.select(".airspeed").append("svg").attr({"id":"d3svg", "width":this.width, "height": this.height});
		//Pattern injection
		this.defs = this.svg.append("defs")
		this.pattern = this.defs.append("pattern").attr({ id:"basicPattern", width:this.width, height:this.height, patternUnits:"userSpaceOnUse"});
		this.image = this.pattern.append("image").attr({'xlink:href':'http://localhost:8080/assets/img/airspeed/speed.png', width:this.width, height:this.height, x:"0", y:"0"})
    this.pattern2 = this.defs.append("pattern").attr({ id:"dialPattern", width:this.width, height:this.height, patternUnits:"userSpaceOnUse"});
    this.image2 = this.pattern2.append("image").attr({'xlink:href':'http://localhost:8080/assets/img/airspeed/speed-dial.png', width:this.width, height:this.height, x:"0", y:"0"})


		//Shape design
		this.base = this.svg.append("rect").attr({x:"0", y:"0", width:this.width, height:this.height,fill:"url(/panel#basicPattern)"})
    this.needle = this.svg.append("rect").attr({x:"0", y:"0", width:this.width, height:this.height,fill:"url(/panel#dialPattern)"})
		setTimeout(()=>{
			this.needle.transition()
				.duration(2000)
				.attrTween("transform", this.tweenNeedle)
		}, 2500)
	}
}