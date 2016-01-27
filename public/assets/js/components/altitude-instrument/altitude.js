import 'reflect-metadata';
import {Component, OnInit, AfterViewInit} from 'angular2/core';
import $ from 'jquery';
import * as d3 from 'd3/d3';
global.d3 = d3;
const width = 300;
const height = 300;
let fs = require('fs');


@Component({
  selector: 'altitude-instrument',
  template: `${fs.readFileSync(__dirname + '/altitude.html')}`,
  directives: [],
  providers:  []
})
export class AltitudeInstrument implements OnInit, AfterViewInit{
  constructor(){
    this.svg = null;
  }
  setupInstrument(){
    this.svg = d3.select(".altitude").append("svg").attr({"id":"altitudesvg", "width":width, "height": height});
    //Pattern injection
    this.defs = this.svg.append("defs")
    this.pattern = this.defs.append("pattern").attr({ id:"dial_100Pattern", width:width, height:height, patternUnits:"userSpaceOnUse"});
    this.image = this.pattern.append("image").attr({'xlink:href':'http://localhost:8080/assets/img/altitude/altitude_dial_100.png', width:width, height:height, x:"0", y:"0"})
    this.pattern2 = this.defs.append("pattern").attr({ id:"dial_1000Pattern", width:width, height:height, patternUnits:"userSpaceOnUse"});
    this.image2 = this.pattern2.append("image").attr({'xlink:href':'http://localhost:8080/assets/img/altitude/altitude_dial_1000.png', width:width, height:height, x:"0", y:"0"})
    this.pattern3 = this.defs.append("pattern").attr({ id:"dial_10000Pattern", width:width, height:height, patternUnits:"userSpaceOnUse"});
    this.image3 = this.pattern3.append("image").attr({'xlink:href':'http://localhost:8080/assets/img/altitude/altitude_dial_10000.png', width:width, height:height, x:"0", y:"0"})
    this.pattern4 = this.defs.append("pattern").attr({ id:"gearPattern", width:width, height:height, patternUnits:"userSpaceOnUse"});
    this.image4 = this.pattern4.append("image").attr({'xlink:href':'http://localhost:8080/assets/img/altitude/altitude_gear.png', width:width, height:height, x:"0", y:"0"})
    this.pattern5 = this.defs.append("pattern").attr({ id:"hatchPattern", width:width, height:height, patternUnits:"userSpaceOnUse"});
    this.image5 = this.pattern5.append("image").attr({'xlink:href':'http://localhost:8080/assets/img/altitude/altitude_hatch.png', width:width, height:height, x:"0", y:"0"})



    //Shape design
    this.gear = this.svg.append("rect").attr({x:"0", y:"0", width:width, height:height,fill:"url(/panel#gearPattern)"})
    this.hatch = this.svg.append("rect").attr({x:"0", y:"0", width:width, height:height,fill:"url(/panel#hatchPattern)"})
    this.dial_10000 = this.svg.append("rect").attr({x:"0", y:"0", width:width, height:height,fill:"url(/panel#dial_10000Pattern)"})
    this.dial_1000 = this.svg.append("rect").attr({x:"0", y:"0", width:width, height:height,fill:"url(/panel#dial_1000Pattern)"})
    this.dial_100 = this.svg.append("rect").attr({x:"0", y:"0", width:width, height:height,fill:"url(/panel#dial_100Pattern)"})

  }
  ngOnInit() {
    return;
  }
  ngAfterViewInit(){
    return this.setupInstrument();
  }
}