import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { match } from './validator';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'auth-signup',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="outline">
      <mat-label>Display Name</mat-label>
        <input
          matInput
          placeholder="Display Name"
          required="true"
          type="text"
          name="name"
          formControlName="displayName"
        />
        <mat-icon matSuffix>account_box</mat-icon>
        @if(handleErrorRegister('displayName', 'required')){
        <mat-error>Display Name is required</mat-error>
        } @if(handleErrorRegister('displayName', 'minlength')) {
        <mat-error
          ><small
            >Display Name must be of length atleast 3 characters long</small
          ></mat-error
        >
        }
      </mat-form-field>
      <mat-form-field appearance="outline">
      <mat-label>Email</mat-label>
        <input
          matInput
          placeholder="Email"
          required="true"
          name="email"
          formControlName="email"
        />
        <mat-icon matSuffix>email</mat-icon>
        @if(handleErrorRegister('email', 'required')){
        <mat-error>Email is required</mat-error>
        } @if(handleErrorRegister('email', 'email')){
        <mat-error>Email should be of Valid Format</mat-error>
        }
      </mat-form-field>
      <mat-form-field appearance="outline">
      <mat-label>Password</mat-label>
        <input
          matInput
          placeholder="Password"
          [type]="passwordHide ? 'password' : 'text'"
          required="true"
          minlength="6"
          name="password"
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
          } @else{
          <mat-icon matSuffix>visibility</mat-icon>
          }
        </button>
        @if(handleErrorRegister('password', 'required')){
        <mat-error>Password is required</mat-error>
        } @if(handleErrorRegister('password', 'minlength')){
        <mat-error>Password must be of length 6</mat-error
        >}
      </mat-form-field>
      <mat-form-field appearance="outline">
      <mat-label>Confirm Password</mat-label>
        <input
          matInput
          placeholder="Confirm Password"
          [type]="confirmPasswordHide ? 'password' : 'text'"
          required="true"
          name="repassword"
          formControlName="confirmPassword"
        />
        <button
          mat-icon-button
          matSuffix
          type="button"
          (click)="confirmPasswordHide = !confirmPasswordHide"
          [attr.aria-label]="'Hide password'"
          [attr.aria-pressed]="confirmPasswordHide"
        >
          @if(confirmPasswordHide){
          <mat-icon matSuffix>visibility_off</mat-icon>
          } @else{
          <mat-icon matSuffix>visibility</mat-icon>
          }
        </button>
        @if(handleErrorRegister('confirmPassword', 'required')){
        <mat-error>Confirm Password is required</mat-error>
        } @if(handleErrorRegister('confirmPassword', 'matching')){
        <mat-error>Passwords should match</mat-error>
        }
      </mat-form-field>
      <button mat-fab extended style="width : 100%;">
        <mat-icon>person_add</mat-icon>Create Account
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
export default class SignUpComponent {
  fb = inject(NonNullableFormBuilder);
  toast = inject(HotToastService);
  router = inject(Router);

  passwordHide = true;
  confirmPasswordHide = true;

  registerForm = this.fb.group(
    {
      displayName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: match('password', 'confirmPassword'),
    }
  );

  onSubmit() {
    const { displayName, email, password } = this.registerForm.value;
    if (!this.registerForm.valid || !displayName || !email || !password) {
      this.toast.error('Form has some errors');
      return;
    }
    console.table(this.registerForm.value);
    this.toast.success('Form Submitted successfully');
  }

  /* Get errors */
  public handleErrorRegister(controlName: string, errorName: string) {
    return (
      this.registerForm.get(controlName)?.touched &&
      this.registerForm.get(controlName)?.errors &&
      this.registerForm.get(controlName)?.hasError(errorName)
    );
  }
}
