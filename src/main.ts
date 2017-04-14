let isProd:boolean;
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';
import {enableProdMode} from '@angular/core';

//import "./styles.scss";

const platform = platformBrowserDynamic();

if (process.env.ENV === 'production') {
  enableProdMode(); 
}
platform.bootstrapModule(AppModule);