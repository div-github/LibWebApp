import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountData } from '../models/accountData';
import { UserService } from '../user.service';
import { BooksService } from '../services/books.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.css'
})
export class UserAccountComponent {
  accountData=new AccountData("","","","");
  constructor(private router:Router,private accountInfo:BooksService) { }

  ngOnInit(): void {
    const user_id=String(localStorage.getItem('trash'));
    this.accountInfo.getAccountInfo(user_id).subscribe((res:any)=>{
      console.log(res);
      this.accountData=res;
    })
  }

  logout() {
    // Implement logout logic here
    console.log('Logout clicked');
    this.router.navigate(['/signin']);
  }

}
