import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderWithLogoComponent } from './header-with-logo/header-with-logo.component';
import { FooterWithCopywriteAndContactComponent } from './footer-with-copywrite-and-contact/footer-with-copywrite-and-contact.component';
import { SigninComponent } from './sign-in-logging-in/sign-in-logging-in.component';
import { SignupComponent } from './signup/signup.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { AdminAccountComponent } from './admin-account/admin-account.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { IssueBookComponent } from './issue-book/issue-book.component';
import { ReturnBookComponent } from './return-book/return-book.component';
import { BookInventoryComponent } from './book-inventory/book-inventory.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
          { path: '', component: BookInventoryComponent },
          {path: 'issuebook', component: IssueBookComponent},
          { path: 'returnbook', component: ReturnBookComponent },
          { path: 'adminaccount', component: AdminAccountComponent },
          { path: 'useraccount', component: UserAccountComponent },
        ],
      },
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
    ],
  },
];
