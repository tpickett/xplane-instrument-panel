import 'reflect-metadata';
import {Component, OnInit, AfterViewInit} from 'angular2/core';
import {XplaneData} from '../../injectables/xplane-data';
const fs = require('fs');
import $ from 'jquery';
import * as d3 from 'd3/d3';
global.d3 = d3;

const width = 300;
const height = 300;

@Component({
  selector: 'airspeed-instrument',
  template: `${fs.readFileSync(__dirname + '/airspeed.html')}`,
  directives: [],
  providers:  [XplaneData]
})
export class AirspeedInstrument implements OnInit, AfterViewInit{
  constructor(_xplane: XplaneData){
    this.svg = null;
		this.airspeed = _xplane.server_data;
	}
  setupInstrument(){
    this.svg = d3.select(".airspeed").append("svg").attr({"id":"d3svg", "width":width, "height": height});
    //Pattern injection
    this.defs = this.svg.append("defs")
    this.pattern = this.defs.append("pattern").attr({ id:"basicPattern", width:width, height:height, patternUnits:"userSpaceOnUse"});
    this.image = this.pattern.append("image").attr({'xlink:href':'http://localhost:8080/assets/img/airspeed/speed.png', width:width, height:height, x:"0", y:"0"})
    this.pattern2 = this.defs.append("pattern").attr({ id:"dialPattern", width:width, height:height, patternUnits:"userSpaceOnUse"});
    this.image2 = this.pattern2.append("image").attr({'xlink:href':'http://localhost:8080/assets/img/airspeed/speed-dial.png', width:width, height:height, x:"0", y:"0"})
    //Shape design
    this.base = this.svg.append("rect").attr({x:"0", y:"0", width:width, height:height,fill:"url(/panel#basicPattern)"})
    this.needle = this.svg.append("rect").attr({x:"0", y:"0", width:width, height:height,fill:"url(/panel#dialPattern)"})
  }
	ngOnInit() {
		setInterval(()=>{
      return this.needle.transition().attr("transform", "rotate("+this.airspeed.airspeed.status+", 150, 130)")
    }, 100)
	}
	ngAfterViewInit(){
    return this.setupInstrument();
	}
}