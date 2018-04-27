declare var fin: any;
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-openfin-service',
  templateUrl: './openfin-service.component.html',
  styleUrls: ['./openfin-service.component.css']
})



export class OpenfinServiceComponent implements OnInit {

    connections = [];

  constructor() { }

  getListenerByName(name) {
    const filteredArray = this.connections.filter(el => el.name === name);
    return filteredArray[0];
  }

  ngOnInit() {
    async function createService() {
        const textService = await fin.desktop.Service.register();
        return textService;
    }

    function closeServiceApp() {
        fin.desktop.Application.getCurrent().close();
    }

    function updateChildWindow() {
        //
    }

    let serviceString = '';
    createService().then(service => {
        service.register('update', (payload) => {
            serviceString = payload;
            const childWindowName = 'component-b-child-window';
            const childWindowId = this.getListenerByName(childWindowName);
            if (childWindowId) {
                service.dispatch(childWindowId, 'update', serviceString);
            }

            return serviceString;
        });

        service.register('getValue', () => {
            console.log('BOYSES');
            console.log(serviceString);
            return serviceString;
        });

        service.register('toggle-popout', () => {
            const mainComponentB = this.getListenerByName('OpenfinPOC-ng-multiwindow');
            service.dispatch(mainComponentB, 'toggle-popout');
        });

        // Close the service when the parent app is closed
        service.onConnection(id => {
            this.connections.push(id);
            if (id.uuid === 'OpenfinPOC-ng-multiwindow' && id.name === id.uuid) {
                const parentApp = fin.desktop.Application.wrap(id.uuid);
                parentApp.addEventListener('closed', closeServiceApp);
                parentApp.addEventListener('crashed', closeServiceApp);
            }
        });
    });
  }

}

/*

shape

entityType
:
"unknown"
name
:
"component-b-child-window"
parentFrame
:
"component-b-child-window"
uuid
:
"OpenfinPOC-ng-multiwindow"

*/
