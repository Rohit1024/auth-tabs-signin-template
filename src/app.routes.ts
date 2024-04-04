import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import AuthLayoutComponent from './auth/auth.component';
import SigninComponent from './auth/components/signin.component';
import SignUpComponent from './auth/components/signup.component';

export const App_Routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent,
      },
      {
        path: 'signup',
        component: SignUpComponent,
      },
    ],
  },
  { path: '**', redirectTo: '/home' },
];
