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
    var clockGroup, fields, formatHour, formatMinute, formatSecond, height, offSetX, offSetY, pi, render, scaleHours, scaleSecsMins, vis, width;

  formatSecond = d3.time.format("%S");

  formatMinute = d3.time.format("%M");

  formatHour = d3.time.format("%H");

  fields = function() {
    var d, data, hour, minute, second;
    d = new Date();
    second = d.getSeconds();
    minute = d.getMinutes();
    hour = d.getHours() + minute / 60;
    return data = [
      {
        "unit": "seconds",
        "text": formatSecond(d),
        "numeric": second
      }, {
        "unit": "minutes",
        "text": formatMinute(d),
        "numeric": minute
      }, {
        "unit": "hours",
        "text": formatHour(d),
        "numeric": hour
      }
    ];
  };

  width = 300;

  height = 300;

  offSetX = 150;

  offSetY = 150;

  pi = Math.PI;

  scaleSecsMins = d3.scale.linear().domain([0, 59 + 59 / 60]).range([0, 2 * pi]);

  scaleHours = d3.scale.linear().domain([0, 11 + 59 / 60]).range([0, 2 * pi]);

  vis = d3.selectAll(".altitude").append("svg:svg").attr("width", width).attr("height", height);
    let defs = vis.append("defs")
    let pattern5 = defs.append("svg:pattern").attr({ id:"hatchPattern", width:width, height:height, patternUnits:"userSpaceOnUse"});
    let image5 = pattern5.append("svg:image").attr({'xlink:href':'http://localhost:8080/assets/img/altitude/altitude_gear.png', width:width, height:height, x:"20", y:"20"})

  clockGroup = vis.append("svg:g").attr("transform", "translate(" + offSetX + "," + offSetY + ")");

  clockGroup.append("svg:circle").attr("r", 145)/*.attr("fill", "none")*/.attr("class", "clock outercircle").attr("fill","url(/panel#hatchPattern)");

  clockGroup.append("svg:circle").attr("r", 4).attr("fill", "black").attr("class", "clock innercircle");

  render = function(data) {
    var hourArc, minuteArc, secondArc;
    clockGroup.selectAll(".clockhand").remove();
    secondArc = d3.svg.arc().innerRadius(0).outerRadius(70).startAngle(function(d) {
      return scaleSecsMins(d.numeric);
    }).endAngle(function(d) {
      return scaleSecsMins(d.numeric);
    });
    minuteArc = d3.svg.arc().innerRadius(0).outerRadius(70).startAngle(function(d) {
      return scaleSecsMins(d.numeric);
    }).endAngle(function(d) {
      return scaleSecsMins(d.numeric);
    });
    hourArc = d3.svg.arc().innerRadius(0).outerRadius(50).startAngle(function(d) {
      return scaleHours(d.numeric % 12);
    }).endAngle(function(d) {
      return scaleHours(d.numeric % 12);
    });
    clockGroup.selectAll(".clockhand").data(data).enter().append("svg:path").attr("d", function(d) {
      if (d.unit === "seconds") {
        return secondArc(d);
      } else if (d.unit === "minutes") {
        return minuteArc(d);
      } else if (d.unit === "hours") {
        return hourArc(d);
      }
    }).attr("class", "clockhand").attr("stroke", "black").attr("stroke-width", function(d) {
      if (d.unit === "seconds") {
        return 2;
      } else if (d.unit === "minutes") {
        return 3;
      } else if (d.unit === "hours") {
        return 3;
      }
    }).attr("fill", "none");
  };

  setInterval(function() {
    var data;
    data = fields();
    return render(data);
  }, 1000);



    // this.svg = d3.select(".altitude").append("svg").attr({"id":"altitudesvg", "width":width, "height": height});
    // //Pattern injection
    
    // this.pattern = this.defs.append("pattern").attr({ id:"dial_100Pattern", width:width, height:height, patternUnits:"userSpaceOnUse"});
    // this.image = this.pattern.append("image").attr({'xlink:href':'http://localhost:8080/assets/img/altitude/altitude_dial_100.png', width:width, height:height, x:"0", y:"0"})
    // this.pattern2 = this.defs.append("pattern").attr({ id:"dial_1000Pattern", width:width, height:height, patternUnits:"userSpaceOnUse"});
    // this.image2 = this.pattern2.append("image").attr({'xlink:href':'http://localhost:8080/assets/img/altitude/altitude_dial_1000.png', width:width, height:height, x:"0", y:"0"})
    // this.pattern3 = this.defs.append("pattern").attr({ id:"dial_10000Pattern", width:width, height:height, patternUnits:"userSpaceOnUse"});
    // this.image3 = this.pattern3.append("image").attr({'xlink:href':'http://localhost:8080/assets/img/altitude/altitude_dial_10000.png', width:width, height:height, x:"0", y:"0"})
    // this.pattern4 = this.defs.append("pattern").attr({ id:"gearPattern", width:width, height:height, patternUnits:"userSpaceOnUse"});
    // this.image4 = this.pattern4.append("image").attr({'xlink:href':'http://localhost:8080/assets/img/altitude/altitude_gear.png', width:width, height:height, x:"0", y:"0"})



    // //Shape design
    // this.gear = this.svg.append("rect").attr({x:"0", y:"0", width:width, height:height,fill:"url(/panel#gearPattern)"})
    // this.hatch = this.svg.append("rect").attr({x:"0", y:"0", width:width, height:height,fill:"url(/panel#hatchPattern)"})
    // this.dial_10000 = this.svg.append("rect").attr({x:"0", y:"0", width:width, height:height,fill:"url(/panel#dial_10000Pattern)"})
    // this.dial_1000 = this.svg.append("rect").attr({x:"0", y:"0", width:width, height:height,fill:"url(/panel#dial_1000Pattern)"})
    // this.dial_100 = this.svg.append("rect").attr({x:"0", y:"0", width:width, height:height,fill:"url(/panel#dial_100Pattern)"})

  }
  ngOnInit() {
    return;
  }
  ngAfterViewInit(){
    return this.setupInstrument();
  }
}