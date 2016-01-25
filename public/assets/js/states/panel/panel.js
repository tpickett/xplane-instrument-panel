import 'reflect-metadata';
import {Component}     from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import {WidgetArea} from '../../components/widget-area/widget-area.js'
var fs = require('fs');
@Component({
  template: /*`${fs.readFileSync(__dirname + '/panel.html')}`*/'<router-outlet></router-outlet>',
  directives: [RouterOutlet],
  providers:  []
})
@RouteConfig([
  {path:'/', name: 'InstrumentWidgetPanel', component: WidgetArea, useAsDefault: true},
  // {path:'/:id',      name: 'PanelWidgetDetail', component: WidgetDetailComponent}
])
export class PanelComponent { }