import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'auth-layout',
  standalone: true,
  imports: [MatCardModule, MatTabsModule, RouterModule, MatIconModule],
  template: `
    <mat-card appearance="raised">
      <h2 style="text-align: center; margin-top: 25px;">Get Started</h2>
      <mat-card-content>
        <nav
          style="margin: 10px 0px;"
          mat-tab-nav-bar
          mat-stretch-tabs
          [tabPanel]="tabPanel"
        >
          @for (link of authTabs; track link) {
          <a
            mat-tab-link
            [routerLink]="link.route"
            routerLinkActive
            #rla="routerLinkActive"
            [active]="rla.isActive"
          >
            <mat-icon>{{ link.icon }}</mat-icon>
            <span style="margin-left: 8px;">{{ link.label }}</span>
          </a>
          }
        </nav>
        <mat-tab-nav-panel #tabPanel> <router-outlet /></mat-tab-nav-panel>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      mat-card-content {
        margin-top: 20px;
      }

      mat-card {
        width: 600px;
        min-width: 400px;
        border-radius: 20px;
        margin: 5% auto;
        box-shadow: 0 0 10px 1px #00000030 !important;
      }
    `,
  ],
})
export default class AuthLayoutComponent {
  authTabs = [
    {
      icon: 'login',
      label: 'Sign In',
      route: 'signin',
    },
    {
      icon: 'person_add',
      label: 'Sign Up',
      route: 'signup',
    },
  ];
}
