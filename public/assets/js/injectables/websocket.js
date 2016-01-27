export class Websocket {
	constructor(){
		this.connected = false;
		this.messageCount = 0;
		this.ws = null;
	}
	connect(){
        this.ws = new WebSocket('ws://echo.websocket.org');
        this.ws.onerror = (evt) => this.disconnect(evt);
        // this.ws.onmessage = (evt) => this.receiveMessage(evt.data);
        this.ws.onclose = (evt) => this.disconnect(evt);
        this.ws.onopen = (evt) => this.startup(evt);
	}
	startup(data){
		if(data.type == "open") this.connected = true;
		console.log("Xplane Communicating with server.");
	}
	disconnect(){
		console.error('Xplane Communication Lost...');
        setTimeout(()=>{
        	console.log('Trying to connect to Xplane...');
        	this.webSocketConnect();
        }, 5000);  // 5 seconds timeout
	}
	receiveMessage(data){
        setTimeout(()=>{
            this.ws.send(`${ this.messageCount }`);
            this.messageCount += 1;
        }, 2000);  // 2 seconds timeout
	}
}