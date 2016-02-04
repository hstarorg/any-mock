import {Component} from 'angular2/core';
import {Router, Route, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {bootstrap} from 'angular2/platform/browser';

import {Home} from './components/home/home';

@Component({
  selector: 'mockapi-app',
  providers: [],
  templateUrl: '/views/index.html',
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
@View({template: 'xxx'})
@RouteConfig([
  new Route({
    path: '/',
    component: Home,
    name: 'Home',
    useAsDefault: true
  }),
  new Route({
    path: '',
    component: '',
    name: ''
  })
])
class MockapiApp{
  constructor(){
    
  }
}

bootstrap(MockapiApp);