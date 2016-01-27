import 'reflect-metadata';
import {Component, OnInit, AfterViewInit} from 'angular2/core';
import {XplaneData} from '../../injectables/xplane-data'
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
  providers:  [XplaneData]
})
export class TurnslipInstrument implements OnInit, AfterViewInit{
	constructor(_xplane: XplaneData){
		this.svg = null;
    this.turnslip = _xplane.server_data.turnslip;
    // console.log(_xplane.server_data)
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
		setTimeout(()=>{
      return this.moveBall(100)
      // .then(()=>{
      //     return this.moveBall(0);
      //   })
      //   .then(()=>{
      //     return this.moveBall(-100);
      //   })
      //   .then(()=>{
      //     return this.moveBall(0);
      //   })
        .then(()=>{
          // this.image3.attr("transform", "rotate(360, 150, 130)")
          let prop = d3.transform(this.image3.attr("transform"));
          this.image3.attr("transform", "rotate("+prop.rotate+", 150, 130), rotate("+(prop.rotate + 50)+", 145, 155)")
          console.log( d3.transform(this.image3.attr("transform")))
          setTimeout(()=>{this.image3.attr("transform", "rotate("+d3.transform(this.image3.attr("transform")).rotate+", 150, 150), rotate("+(d3.transform(this.image3.attr("transform")).rotate - 80)+", 150, 150)")}, 500)
          // return this.tiltAirPlane(360, 340);
        })
        // .then(()=>{
        //   return this.tiltAirPlane(340, 360);
        // })
        // .then(()=>{
        //   return this.tiltAirPlane(360, 380);
        // })
        // .then(()=>{
        //   return this.tiltAirPlane(380, 360);
        // })
        .then(()=>{
          console.log('complete anitmation')
        })
    }, 2500)
	}
	ngAfterViewInit(){
		return this.setupInstrument();
	}
}