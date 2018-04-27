declare var fin: any;
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      const serviceApp = new fin.desktop.Application({
          name: 'openfin-service',
          uuid: 'openfin-service',
          url: `${window.location.origin}/#/service`,
          mainWindowOptions: {
              autoShow: false
          }
      }, () => {
          serviceApp.run();
      }, (e) => {
          console.log(`Error creating application: ${e}`);
      });
  }

}
