import 'reflect-metadata';
import {Component, OnInit, AfterViewInit} from 'angular2/core';
const fs = require('fs');
import $ from 'jquery';
global.$ = $;
global.jQuery = $;
import {Draggable} from 'jquery-ui';
import {gridster} from 'gridster/src/jquery.gridster.js';
import {AirspeedInstrument} from '../airspeed-instrument/airspeed';
import {TurnslipInstrument} from '../turnslip-instrument/turnslip';
import {VerticalspeedInstrument} from '../verticalspeed-instrument/verticalspeed';
import {AttitudeInstrument} from '../attitude-instrument/attitude';
import {AltitudeInstrument} from '../altitude-instrument/altitude';

@Component({
  template: `${fs.readFileSync(__dirname + '/widget-area.html')}`,
  directives: [AirspeedInstrument, TurnslipInstrument, VerticalspeedInstrument, AttitudeInstrument, AltitudeInstrument],
  providers:  []
})
export class WidgetArea implements OnInit, AfterViewInit{
	constructor(){}
	// ngOnInit() {
	//     console.log(`onInit`);
	//   }
	ngAfterViewInit(){
	    $(".gridster ul").gridster({
            widget_margins: [5, 5],
          	widget_base_dimensions: [100, 55],
            shift_larger_widgets_down: false
        });
	}
}