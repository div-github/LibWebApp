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
import { UserAccountComponent } from './user-account/user-account.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';


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
    MatToolbarModule,
    UserAccountComponent,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: []
})
export class AppModule { }
