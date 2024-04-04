import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink],
  template: `
    <mat-toolbar color="primary">
      <span>Auth Example</span>
      <span class="example-spacer"></span>
      <a mat-button routerLink="/signin">
        <span>Sign in</span>
        <mat-icon>login</mat-icon>
      </a>
    </mat-toolbar>
  `,
  styles: [
    `
      .example-spacer {
        flex: 1;
      }
    `,
  ],
})
export class NavbarComponent {}
