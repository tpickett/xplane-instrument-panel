import 'reflect-metadata'
import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, Router} from 'angular2/router';
import {PanelComponent} from '../../states/panel/panel';
var fs = require('fs');

@Component({
  selector: 'xplane-panel',
  template: `<router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES, RouterOutlet],
  providers: []
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
  constructor(_router: Router/*, _auth: AuthService*/){
    // this.isAuth = _auth.isAuth();
    this.router = _router;

    // if (this.isAuth) {
    //   this.router.navigate(['Panel']);
    // }else{
    //   this.router.navigate(['Login']);
    // }
  }
};