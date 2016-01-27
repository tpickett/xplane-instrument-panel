import 'reflect-metadata';
import {Component, OnInit, AfterViewInit, ElementRef} from 'angular2/core';
import * as browser from 'angular2/platform/browser';
import {Ruler, Rectangle} from 'angular2/src/platform/browser/ruler';
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
  providers:  [ElementRef]
})
export class AirspeedInstrument implements OnInit, AfterViewInit{
	constructor(element: ElementRef){
		this.element = element;
		this.ruler = new Ruler(new browser.BrowserDomAdapter());
		this.svg = null;
		this.width = 300;
		this.height = 300;
		// this.len = this.width / 3;
      	this.radius = Math.min(this.width, this.height) / 10
	}



    // moveTo(perc) {
    //   var self,
    //       oldValue = this.perc || 0;

    //   this.perc = perc;
    //   self = this;

    //   // Reset pointer position
    //   this.el.transition().delay(100).ease('quad').duration(200).select('.needle').tween('reset-progress', function() {
    //     return function(percentOfPercent) {
    //       var progress = (1 - percentOfPercent) * oldValue;
          
    //       repaintGauge(progress);
    //       return d3.select(this).attr('d', recalcPointerPos.call(self, progress));
    //     };
    //   });

    //   this.el.transition().delay(300).ease('bounce').duration(1500).select('.needle').tween('progress', function() {
    //     return function(percentOfPercent) {
    //       var progress = percentOfPercent * perc;
          
    //       repaintGauge(progress);
    //       return d3.select(this).attr('d', recalcPointerPos.call(self, progress));
    //     };
    //   });

    // }
    percToDeg(perc) {
	    return perc * 360;
	}
    percToRad(perc) {
	    return this.degToRad(this.percToDeg(perc));
	}
	degToRad(deg) {
	    return deg * Math.PI / 180;
	}
    /** 
      * Helper function that returns the `d` value
      * for moving the needle
    **/
    recalcPointerPos(perc) {
      var centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY;
      thetaRad = this.percToRad(perc / 2);
      centerX = 0;
      centerY = 0;
	  topX = centerX - 70 * Math.cos(thetaRad)
	  topY = centerY - 70 * Math.sin(thetaRad)
  
	  leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2)
	  leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2)
  
	  rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2)
	  rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2)
      // return "M " + this.width/2 + " " + this.height/2 + " L " + topX + " " + topY + " L " + rightX + " " + rightY;
      // return `M ${leftX} ${leftY} L ${topX} ${topY} L ${rightX} ${rightY}`
      return "M" + (300/2 + 2) + " " + (150 + 10) + " L" + 300/2 + " 0 L" + (300/2 - 3) + " " + (150 + 10) + " C" + (300/2 - 3) + " " + (150 + 20) + " " + (300/2 + 3) + " " + (150 + 20) + " " + (300/2 + 3) + " " + (150 + 10) + " Z"
    }
    renderNeedle() {
      this.svg.append('circle').attr({'class':'needle-center', 'cx': 150, 'cy': 150, 'r': 8/*, height: 5, width:5, fill: "#000"*/});
      return this.needlePoint = this.svg.append('path').attr({'class':'needle', 'd': this.recalcPointerPos.call(this, 2)});
    }
    tweenNeedle(d, i ,a){
    	return d3.interpolateString("rotate(-60, 150, 130)", "rotate(60, 150, 130)");
    }
	ngOnInit() {
		return;
	}
	ngAfterViewInit(){
	    let measure = this.ruler.measure(this.element);
	    measure.then(function (rect) {
	        console.log('Rect', rect);
	    });
		this.svg = d3.select(".airspeed").append("svg").attr({"id":"d3svg", "width":this.width, "height": this.height});
		//Pattern injection
		this.defs = this.svg.append("defs")
		this.pattern = this.defs.append("pattern").attr({ id:"basicPattern", width:this.width, height:this.height, patternUnits:"userSpaceOnUse"});
		this.image = this.pattern.append("image").attr({'xlink:href':'http://localhost:8080/assets/img/airspeed/speed.png', width:this.width, height:this.height, x:"0", y:"0"})

		//Shape design
		this.base = this.svg.append("rect").attr({x:"0", y:"0", width:this.width, height:this.height,fill:"url(/panel#basicPattern)"})
		this.renderNeedle();
		setTimeout(()=>{
			this.needlePoint.transition()
				.duration(2000)
				.attrTween("transform", this.tweenNeedle)
		}, 2500)
		// svg.append("g").appe``nd("path").attr({"class":"arc", d: arc, fill: "#000", transform: "translate(50,50)"})
	}
}