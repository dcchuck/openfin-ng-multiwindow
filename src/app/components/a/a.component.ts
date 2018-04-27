declare var fin: any;
import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from '../../svc/store.service';

@Component({
  selector: 'app-component-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.css']
})
export class AComponent implements OnInit {

  sourceMsg: string;
  ofService: any;

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    async function connectToService() {
        const serviceConnection = await fin.desktop.Service.connect({ uuid: 'openfin-service' });
        return serviceConnection;
    }

    connectToService().then(service => this.ofService = service);
  }

  updateStore() {
    this.storeService.changeMessage(this.sourceMsg);
    this.ofService.dispatch('update', this.sourceMsg);
  }

}
