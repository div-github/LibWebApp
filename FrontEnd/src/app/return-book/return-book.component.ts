import { Component } from '@angular/core';
import { BooksService } from '../services/books.service';
import { AccountData } from '../models/accountData';
import { Router } from '@angular/router';
import {  ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrl: './return-book.component.css'
})
export class ReturnBookComponent {
  accountData=new AccountData("","","","");
  constructor(private accountInfo:BooksService,private router:Router
    ,private toastr:ToastrService) { }
  ngOnInit(): void {
    const user_id=String(localStorage.getItem('trash'));
    this.accountInfo.getAccountInfo(user_id).subscribe((res:any)=>{
      this.accountData=res;
    })
  }
  confirmReturn() {
    // Add logic to handle the confirmation and send email to admin
    const user_id=String(localStorage.getItem('trash'));
    this.accountInfo.returnBook(user_id).subscribe((res:any)=>{
      console.log(res);
      this.router.navigate(['/dashboard']);
      this.toastr.success('Sucess', 'Book Returned!',{positionClass: 'toast-bottom-center',timeOut: 1000});
    })
  }
  
}
