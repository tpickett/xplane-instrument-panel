import {Injectable} from 'angular2/core';
import {Websocket} from './websocket';

let _ = require('lodash');

@Injectable()
export class XplaneData {
	constructor(_websocket: Websocket){
		this.socket = _websocket;
		this.socket.ws.onmessage = (evt) => this.parseMessage(evt.data);
		this.server_data = {
			airspeed: {
				status:0
			},
			altitude: {
				status:0
			},
			attitude: {
				status:0
			},
			turnslip: {
				rotation:0,
				pitch: 0
			},
			vertical_speed: {
				status:0
			}
		}
		setInterval(()=>{
			this.server_data.airspeed.status = _.random(40, 200);
			this.server_data.turnslip.rotation = _.random(345, 390);
			this.server_data.turnslip.pitch = _.random(-100, 100);
			this.server_data.vertical_speed.status = _.random(-200, 360);
			this.server_data.attitude.status = _.random(-20, 20);
			this.server_data.altitude.status = _.random(0, 9999);
		}, 100)
	}
	parseMessage(data){
		console.log("Xplane GoT Data")
	}
}