import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderWithLogoComponent } from './header-with-logo/header-with-logo.component';
import { FooterWithCopywriteAndContactComponent } from './footer-with-copywrite-and-contact/footer-with-copywrite-and-contact.component';
import { SignInLoggingInComponent } from './sign-in-logging-in/sign-in-logging-in.component';
import { SignUpRegistrationComponent } from './sign-up-registration/sign-up-registration.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { AdminAccountComponent } from './admin-account/admin-account.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { IssueBookComponent } from './issue-book/issue-book.component';
import { ReturnBookComponent } from './return-book/return-book.component';
import { IssueBookChildScannerComponent } from './issue-book-child-scanner/issue-book-child-scanner.component';
import { BookInventoryComponent } from './book-inventory/book-inventory.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      //{ path: '', component: HeaderWithLogoComponent },

      {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
          { path: '', component: BookInventoryComponent },
          { path: 'signin', component: SignInLoggingInComponent },
          { path: 'signup', component: SignUpRegistrationComponent },
          {
            path: 'issuebook',
            component: IssueBookComponent,
            children: [
              { path: 'scanner', component: IssueBookChildScannerComponent },
            ],
          },
          { path: 'returnbook', component: ReturnBookComponent },
          { path: 'adminaccount', component: AdminAccountComponent },
          { path: 'useraccount', component: UserAccountComponent },
        ],
      },
      { path: 'footer', component: FooterWithCopywriteAndContactComponent },
    ],
  },
];
