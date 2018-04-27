import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { routingModule } from './app.routing';
import { ParentComponent } from './components/parent/parent.component';
import { AComponent } from './components/a/a.component';
import { BComponent } from './components/b/b.component';
import { StoreService } from './svc/store.service';
import { OpenfinServiceComponent } from './components/openfin-service/openfin-service.component';


@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    AComponent,
    BComponent,
    OpenfinServiceComponent
  ],
  imports: [
    routingModule,
    BrowserModule,
    FormsModule
  ],
  providers: [StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
