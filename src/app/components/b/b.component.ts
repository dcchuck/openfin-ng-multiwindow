declare var ng: any;
declare var fin: any; // We do have typedefs available
declare var getAllAngularRootElements: any;

import { Component, OnInit } from '@angular/core';
import { StoreService } from 'app/svc/store.service';
import { Utils } from 'app/app.util';

@Component({
  selector: 'app-component-b',
  templateUrl: './b.component.html',
  styleUrls: ['./b.component.css']
})
export class BComponent implements OnInit {

  message: string;
  popedOut = false;
  windowMode = false;

  constructor(private storeService: StoreService) { }

  triggerRedraw() {
    ng.probe(getAllAngularRootElements()[0]).injector.get(ng.coreTokens.ApplicationRef).tick();
  }

  ngOnInit() {
    this.windowMode = Utils.isInOwnWidgetWindow();

    if (this.inParentWindow()) {
        this.storeService.currentMessage.subscribe(message => {
            this.message = message;
        });
        fin.desktop.InterApplicationBus.subscribe('*', 'toggler', () => {
            this.popedOut = false;
            this.triggerRedraw();
        });
    }

    if (!this.inParentWindow()) {
        fin.desktop.InterApplicationBus.subscribe('*', 'childmessage', (m) => {
            this.updateMessage(m);
            this.triggerRedraw();
        });
    }
  }

  updateMessage(m) {
      this.message = m;
  }

  popout() {
    if (this.inParentWindow()) {
        const thisApp = fin.desktop.Application.getCurrent();
        const childWindow = fin.desktop.Window.wrap(thisApp.uuid, 'created');
        childWindow.show();
    }
    this.popedOut = true;
    this.triggerRedraw();
  }

  popin() {
    if (!this.inParentWindow()) {
        const thisWindow = fin.desktop.Window.getCurrent().hide();
        fin.desktop.InterApplicationBus.publish('toggler');
    }
  }

  inParentWindow() {
        // Any check to know you're in the child will do here
        return window.name !== 'created';
  }

}
