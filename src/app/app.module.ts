import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { NgZoneDemo } from './NgZone.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ NgZoneDemo, AppComponent, HelloComponent ],
  bootstrap:    [ NgZoneDemo ]
})
export class AppModule { }
