import 'reflect-metadata';
import {Component, OnInit, AfterViewInit} from 'angular2/core';
import {XplaneData} from '../../injectables/xplane-data'
import $ from 'jquery';
import * as d3 from 'd3/d3';
global.d3 = d3;
const width = 300;
const height = 300;
let fs = require('fs');
let _ = require('lodash');


@Component({
  selector: 'turnslip-instrument',
  template: `${fs.readFileSync(__dirname + '/turnslip.html')}`,
  directives: [],
  providers:  [XplaneData]
})
export class TurnslipInstrument implements OnInit, AfterViewInit{
	constructor(_xplane: XplaneData){
		this.svg = null;
    this.turnslip = _xplane.server_data.turnslip;
	}
  tiltAirPlane(start, end){
    return new Promise((resolve, reject)=>{
          this.image3.transition()
              .duration(2500)
              .each(move);

          function move() {
            return d3.select(this)
                      .attr("transform", "rotate("+start+")")
                      .each("end", resolve);
          }
      })
  }
  moveBall(position){
      return new Promise((resolve, reject)=>{
          this.image4.transition()
              .duration(2500)
              .each(move);

          function move() {
            return d3.select(this)
                    .transition()
                      .attr("x", position)
                      .each("end", resolve);
          }
      })
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
    this.pattern4 = this.defs.append("pattern").attr({ id:"slipPlaneBallPattern", width:width, height:height, patternUnits:"userSpaceOnUse"});
    this.image4 = this.pattern4.append("image").attr({'xlink:href':'http://localhost:8080/assets/img/turnslip/turnslip_ball.png', width:width, height:height, x:"0", y:"0"})


    //Shape design
    this.gear = this.svg.append("rect").attr({x:"0", y:"0", width:width, height:height,fill:"url(/panel#slipDiskPattern)"})
    this.ball = this.svg.append("rect").attr({x:"0", y:"0", width:width, height:height,fill:"url(/panel#slipPlaneBallPattern)"})
    this.base = this.svg.append("rect").attr({x:"0", y:"0", width:width, height:height,fill:"url(/panel#slipGearPattern)"})
    this.plane = this.svg.append("rect").attr({x:"0", y:"0", width:width, height:height,fill:"url(/panel#slipPlanePattern)"})
  }
	ngOnInit() {
    setInterval(()=>{
      this.image3.transition()
        .attr("transform", "rotate("+this.turnslip.rotation+", 150, 130)");
      this.image4.transition()
        .attr("x", this.turnslip.pitch);
    }, 100)
	}
	ngAfterViewInit(){
		return this.setupInstrument();
	}
}