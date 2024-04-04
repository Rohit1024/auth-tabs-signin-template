import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'auth-signin',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="signinForm" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="outline">
        <mat-label>Email</mat-label>
        <input
          matInput
          placeholder="Email"
          required
          name="email"
          formControlName="email"
        />
        <mat-icon matSuffix>email</mat-icon>
        @if(handleErrorLogin('email', 'required')) {
        <mat-error>Email is required </mat-error>
        } @if(handleErrorLogin('email', 'email')){
        <mat-error>Email should be of Valid Format</mat-error>
        }
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Password</mat-label>
        <input
          matInput
          placeholder="Password"
          [type]="passwordHide ? 'password' : 'text'"
          required
          minlength="6"
          formControlName="password"
        />
        <button
          mat-icon-button
          matSuffix
          type="button"
          (click)="passwordHide = !passwordHide"
          [attr.aria-label]="'Hide password'"
          [attr.aria-pressed]="passwordHide"
        >
          @if(passwordHide){
          <mat-icon matSuffix>visibility_off</mat-icon>
          } @if(!passwordHide) {
          <mat-icon matSuffix>visibility</mat-icon>
          }
        </button>
        @if(handleErrorLogin('password', 'required')) {
        <mat-error>Password is required</mat-error>
        }
      </mat-form-field>
      <button style="width: 100%;" mat-fab extended type="submit">
        <mat-icon>login</mat-icon>
        Sign In
      </button>

      <button
        mat-fab
        extended
        color="primary"
        type="button"
        style="width: 100%; margin-top: 5px;"
        (click)="signInWithGoogle()"
      >
        Sign in with Google
      </button>
    </form>
  `,
  styles: [
    `
      form {
        padding: 20px 30px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
    `,
  ],
})
export default class SigninComponent {
  fb = inject(NonNullableFormBuilder);
  router = inject(Router);
  toast = inject(HotToastService);
  passwordHide = true;

  signinForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    const { email, password } = this.signinForm.value;
    if (!this.signinForm.valid || !email || !password) {
      this.toast.error('Form has some errors');
      return;
    }
    console.table(this.signinForm.value);
    this.toast.success('Form Submitted successfully');
  }

  signInWithGoogle() {}

  /* Get errors */
  public handleErrorLogin(controlName: string, errorName: string) {
    return (
      this.signinForm.get(controlName)?.touched &&
      this.signinForm.get(controlName)?.errors &&
      this.signinForm.get(controlName)?.hasError(errorName)
    );
  }
}
