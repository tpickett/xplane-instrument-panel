import 'reflect-metadata';
import {Component, OnInit, AfterViewInit} from 'angular2/core';
import {XplaneData} from '../../injectables/xplane-data';
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
  providers:  [XplaneData]
})
export class VerticalspeedInstrument implements OnInit, AfterViewInit{
	constructor(_xplane: XplaneData){
		this.svg = null;
    this.vspeed = _xplane.server_data;
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
	ngOnInit() {
		setInterval(()=>{
      this.verticalspeedDial.transition().attr("transform", "rotate("+this.vspeed.vertical_speed.status+", 125, 135)")
    }, 100)
	}
	ngAfterViewInit(){
		return this.setupInstrument();
	}
}