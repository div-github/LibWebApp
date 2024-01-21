import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Quagga from 'quagga';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issue-book',
  templateUrl: './issue-book.component.html',
  styleUrl: './issue-book.component.css',
})
export class IssueBookComponent {
  errorMessage!: string;
  isbn_code!: string;
  constructor(private toastr: ToastrService,private IssueBook:BooksService
    ,private router:Router) {}
  ngOnInit() {
    Quagga.init(
      {
        inputStream: {
          constraints: {
            facingMode: 'environment', // restrict camera type
          },
          area: {
            // defines rectangle of the detection
            top: '40%', // top offset
            right: '0%', // right offset
            left: '0%', // left offset
            bottom: '40%', // bottom offset
          },
        },
        decoder: {
          readers: ['ean_reader'], // restrict code types
        },
      },
      (err: any) => {
        if (err) {
          this.errorMessage = `QuaggaJS could not be initialized, err: ${err}`;
        } else {
          Quagga.start();
          Quagga.onDetected((res: any) => {
            window.alert(`code: ${res.codeResult.code}`);
            this.isbn_code = res.codeResult.code;
          });

        }
      }
    );
  }
  showSuccess() {
    this.toastr.success('Sucess', 'Bar Code Captured',{positionClass: 'toast-bottom-center'});
  }
  issueBook()
  {
    const user_id=String(localStorage.getItem('trash'));
    this.IssueBook.issueBook(user_id,this.isbn_code).subscribe((res:any)=>{
      console.log(res);
      this.toastr.success('Sucess', 'Book Issued',{positionClass: 'toast-bottom-center',timeOut: 2000});
      this.router.navigate(['/dashboard/useraccount']);
    },
    (err:any)=>{
        console.log(err.error.message);
        this.toastr.info('Error', err.error.message,{positionClass: 'toast-bottom-center',timeOut: 2000});

    })

  }


}
