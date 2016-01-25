import 'zone.js/lib/browser/zone-microtask';
import 'reflect-metadata';
import 'babel-polyfill';
import { provide } from 'angular2/core';
import {ROUTER_PROVIDERS} from 'angular2/router';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import {bootstrap} from 'angular2/platform/browser';
import {InstrumentPanel} from './components/instrument-panel/instrument-panel.js';

bootstrap(InstrumentPanel,[
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS
]);