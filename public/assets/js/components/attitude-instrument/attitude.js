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
  selector: 'attitude-instrument',
  template: `${fs.readFileSync(__dirname + '/attitude.html')}`,
  directives: [],
  providers:  [XplaneData]
})
export class AttitudeInstrument implements OnInit, AfterViewInit{
  constructor(_xplane: XplaneData){
    this.svg = null;
    this.attitude = _xplane.server_data;
  }
  setupInstrument(){
    this.svg = d3.select(".attitude").append("svg").attr({"id":"attitudesvg", "width":width, "height": height});
    //Pattern injection
    this.defs = this.svg.append("defs")
    this.pattern = this.defs.append("pattern").attr({ id:"discPattern", width:width, height:height, patternUnits:"userSpaceOnUse"});
    this.image = this.pattern.append("image").attr({'xlink:href':'http://localhost:8080/assets/img/attitude/attitude_disc.png', width:width, height:height, x:"0", y:"0"})
    this.pattern2 = this.defs.append("pattern").attr({ id:"backplatePattern", width:width, height:height, patternUnits:"userSpaceOnUse"});
    this.image2 = this.pattern2.append("image").attr({'xlink:href':'http://localhost:8080/assets/img/attitude/attitude_backplate.png', width:width, height:height, x:"0", y:"0"})
    this.pattern3 = this.defs.append("pattern").attr({ id:"gearPattern", width:width, height:height, patternUnits:"userSpaceOnUse"});
    this.image3 = this.pattern3.append("image").attr({'xlink:href':'http://localhost:8080/assets/img/attitude/attitude_gear.png', width:width, height:height, x:"0", y:"0"})
    this.pattern4 = this.defs.append("pattern").attr({ id:"planeshapePattern", width:width, height:height, patternUnits:"userSpaceOnUse"});
    this.image4 = this.pattern4.append("image").attr({'xlink:href':'http://localhost:8080/assets/img/attitude/attitude_planeshape.png', width:width, height:height, x:"0", y:"0"})



    //Shape design
    this.backplate = this.svg.append("rect").attr({x:"0", y:"0", width:width, height:height,fill:"url(/panel#backplatePattern)"})
    this.disc = this.svg.append("rect").attr({x:"0", y:"0", width:width, height:height,fill:"url(/panel#discPattern)"})
    this.gear = this.svg.append("rect").attr({x:"0", y:"0", width:width, height:height,fill:"url(/panel#gearPattern)"})
    this.planeshape = this.svg.append("rect").attr({x:"0", y:"0", width:width, height:height,fill:"url(/panel#planeshapePattern)"})

  }
  ngOnInit() {
    setInterval(()=>{
      this.image.transition().attr("transform", "rotate("+this.attitude.attitude.status+", 150, 150)").attr("x", this.attitude.attitude.status + (4*this.attitude.attitude.status)).attr("y", this.attitude.attitude.status - (4*this.attitude.attitude.status))
      this.gear.transition().attr("transform", "rotate("+(this.attitude.attitude.status - (2*this.attitude.attitude.status))+", 150, 150)")
    }, 100)
    return;
  }
  ngAfterViewInit(){
    return this.setupInstrument();
  }
}