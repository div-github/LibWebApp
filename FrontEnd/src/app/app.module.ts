// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for handling forms
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './sign-in-logging-in/sign-in-logging-in.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Include FormsModule in the imports array
    NgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
