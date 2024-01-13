// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for handling forms
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './sign-in-logging-in/sign-in-logging-in.component';
import {  RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReturnBookComponent } from './return-book/return-book.component';
import { MatIconModule } from '@angular/material/icon';

import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    ReturnBookComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule,
    CommonModule,
    RouterModule.forRoot(routes),
    FontAwesomeModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
