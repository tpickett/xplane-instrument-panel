import {Injectable} from 'angular2/core';
import {Websocket} from './websocket';

@Injectable()
export class XplaneData {
	constructor(_websocket: Websocket){
		this.socket = _websocket;
		this.socket.ws.onmessage = (evt) => this.parseMessage(evt.data);
		this.server_data = {
			airspeed: {},
			altitude: {},
			attitude: {},
			turnslip: {},
			vertical_speed: {}
		}
		setTimeout(()=>{
			this.server_data.turnslip.boom = "blast";
		}, 5000)
	}
	parseMessage(data){
		console.log("Xplane GoT Data")
	}
}