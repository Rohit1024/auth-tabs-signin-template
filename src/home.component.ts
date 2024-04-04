import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatCardModule],
  template: `
    <section>
      <mat-card class="hero-card">
        <mat-card-header>
          <mat-card-title><h1>Hero Landing Page</h1></mat-card-title>
        </mat-card-header>
        <mat-card-content>
          Navigate to Auth Page ? <a routerLink="/signin"><b>Signin</b></a>
        </mat-card-content>
      </mat-card>
    </section>
  `,
  styles: [
    `
      .hero-card {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 300px;
        height: calc(100vh - 84px);
        margin: 10px;
      }
    `,
  ],
})
export class HomeComponent {}
