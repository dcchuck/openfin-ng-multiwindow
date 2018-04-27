declare var fin: any;

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StoreService } from '../../svc/store.service';
import { Utils } from '../../../app/app.util';

@Component({
  selector: 'app-component-b',
  templateUrl: './b.component.html',
  styleUrls: ['./b.component.css']
})
export class BComponent implements OnInit {

  message: string;
  popedOut = false;
  windowMode = false;
  childWindow: any;
  openFinService: any;

  constructor(private storeService: StoreService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    async function connectToService() {
        const serviceConnection = await fin.desktop.Service.connect({ uuid: 'openfin-service' });
        return serviceConnection;
    }

    this.windowMode = Utils.isInOwnWidgetWindow();

    connectToService().then(service => {
        this.openFinService = service;
        if (this.windowMode) {
            this.openFinService.dispatch('getValue').then((val) => {
                console.log('dispatched!');
                this.message = val;
                this.cd.detectChanges();
            });

            this.openFinService.register('update', (m) => {
                console.log(m);
                this.message = m;
                this.cd.detectChanges();
            });
        } else {
            this.storeService.currentMessage.subscribe(message => this.message = message);
            this.openFinService.register('toggle-popout', () => {
                this.popedOut = false;
                this.cd.detectChanges();
            });
        }
    });
  }

  popout() {
    const childWindow = new fin.desktop.Window({
        name: 'component-b-child-window',
        url: '/#/window/comp-b',
        autoShow: true
    }, () => {
        this.childWindow = childWindow;
    });

    this.popedOut = true;
  }

  popin() {
    // window.opener.location.reload();
    this.openFinService.dispatch('toggle-popout').then(() => {
        fin.desktop.Window.getCurrent().close();
    });
  }

}
