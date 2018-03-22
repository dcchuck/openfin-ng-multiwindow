import { Component, OnInit } from '@angular/core';

declare var fin: any; // We do have typedefs available

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      const childWindow = new fin.desktop.Window({
          name: 'created',
          url: '/#/window/comp-b',
          autoShow: false
      });
  }

}
