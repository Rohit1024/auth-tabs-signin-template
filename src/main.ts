import { Component } from '@angular/core';
import {
  bootstrapApplication,
  provideClientHydration,
} from '@angular/platform-browser';
import 'zone.js';
import { RouterOutlet, provideRouter } from '@angular/router';
import { NavbarComponent } from './auth/components/navbar.component';
import { App_Routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHotToastConfig } from '@ngneat/hot-toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `<app-navbar /> <router-outlet />`,
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideRouter(App_Routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHotToastConfig(),
  ],
});
