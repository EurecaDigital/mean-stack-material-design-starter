import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ApiService } from './shared';

import '../style/app.scss';

declare var window: any;

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  url = 'https://github.com/preboot/angular2-webpack';
  title: string;

  constructor(private api: ApiService) {
    this.title = this.api.title;
  }

  ngOnInit() {
    setInterval(() => {
      window.componentHandler.upgradeAllRegistered();
    }, 500);
  }
}
