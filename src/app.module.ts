import {NgModule}      from                         '@angular/core';


import {AppComponent} from                           "./app";

//router config module
  import {routing} from                             './app.routing';


//Module Imports  (update systemjs.config.js as needed)
  import { BrowserModule } from                     '@angular/platform-browser';
  import { FormsModule, ReactiveFormsModule } from  '@angular/forms';
  import { HttpModule } from                        '@angular/http';

import {MainView} from                                 "./view/component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        
        routing
    ],
    declarations: [
        AppComponent,
        MainView
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}