import {Routes, RouterModule, CanActivate} from   "@angular/router";
import {ModuleWithProviders} from                 "@angular/core";


import {MainView} from                                 "./view/component";

let useHash:boolean = false;

export const appRoutes: Routes = [
//    {path: '', redirectTo: 'home'},
    {path: 'home', component: MainView},
    {path: '**', redirectTo: 'home'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: useHash });
