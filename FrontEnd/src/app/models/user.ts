// user.model.ts

export class User {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirmPassword: string;
  
    constructor(first_name: string, last_name: string, email: string, password: string, confirmPassword: string) {
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email;
      this.password = password;
      this.confirmPassword = confirmPassword;
    }
  
    // Validation method to check if the password matches the confirm password
    validatePassword(): boolean {
      return this.password === this.confirmPassword;
    }
  }
  