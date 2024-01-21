// user.model.ts

export class AccountData {
    user_name: string;
    book_name: string;
    issued_date: string;
    return_date: string;

    constructor(username: string, book_name: string, issued_date: string, return_date: string) {
        this.user_name = username
        this.book_name =book_name;
        this.issued_date = issued_date;
        this.return_date = return_date;
    }

  }
