import 'reflect-metadata'
import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, Router} from 'angular2/router';
import {PanelComponent} from '../../states/panel/panel';
import {Websocket} from '../../injectables/websocket';
import {XplaneData} from '../../injectables/xplane-data';
var fs = require('fs');

@Component({
  selector: 'xplane-panel',
  template: `<router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES, RouterOutlet],
  providers: [Websocket]
})
@RouteConfig([
  {
  	path:'/panel/...',
  	name: 'Panel',
  	component: PanelComponent,
  	useAsDefault: true
  }
])

export class InstrumentPanel{
  constructor(_router: Router/*, _auth: AuthService*/, _websocket: Websocket){
    // this.isAuth = _auth.isAuth();
    this.router = _router;
    _websocket.connect();
    // if (this.isAuth) {
    //   this.router.navigate(['Panel']);
    // }else{
    //   this.router.navigate(['Login']);
    // }
  }
};