import 'reflect-metadata';
import {Component, OnInit, AfterViewInit} from 'angular2/core';
import $ from 'jquery';
import * as d3 from 'd3/d3';
global.d3 = d3;
const width = 300;
const height = 300;
let fs = require('fs');


@Component({
  selector: 'turnslip-instrument',
  template: `${fs.readFileSync(__dirname + '/turnslip.html')}`,
  directives: [],
  providers:  []
})
export class TurnslipInstrument implements OnInit, AfterViewInit{
	constructor(){
		this.svg = null;
	}
  setupInstrument(){
    this.svg = d3.select(".turnslip").append("svg").attr({"id":"turnslipsvg", "width":width, "height": height});
    //Pattern injection
    this.defs = this.svg.append("defs")
    this.pattern = this.defs.append("pattern").attr({ id:"slipGearPattern", width:width, height:height, patternUnits:"userSpaceOnUse"});
    this.image = this.pattern.append("image").attr({'xlink:href':'http://localhost:8080/assets/img/turnslip/turnslip_gear.png', width:width, height:height, x:"0", y:"0"})

    this.pattern2 = this.defs.append("pattern").attr({ id:"slipDiskPattern", width:width, height:height, patternUnits:"userSpaceOnUse"});
    this.image2 = this.pattern2.append("image").attr({'xlink:href':'http://localhost:8080/assets/img/turnslip/turnslip_disc.png', width:width, height:height, x:"0", y:"0"})

    this.pattern3 = this.defs.append("pattern").attr({ id:"slipPlanePattern", width:width, height:height, patternUnits:"userSpaceOnUse"});
    this.image3 = this.pattern3.append("image").attr({'xlink:href':'http://localhost:8080/assets/img/turnslip/turnslip_planeshape.png', width:width, height:height, x:"0", y:"0"})


    //Shape design
    this.gear = this.svg.append("rect").attr({x:"0", y:"0", width:width, height:height,fill:"url(/panel#slipDiskPattern)"})
    this.base = this.svg.append("rect").attr({x:"0", y:"0", width:width, height:height,fill:"url(/panel#slipGearPattern)"})
    this.plane = this.svg.append("rect").attr({x:"0", y:"0", width:width, height:height,fill:"url(/panel#slipPlanePattern)"})
  }
	ngOnInit() {
		return;
	}
	ngAfterViewInit(){
		return this.setupInstrument();
	}
}