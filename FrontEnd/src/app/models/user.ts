// user.model.ts

export class User {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
  
    constructor(firstname: string, lastname: string, email: string, password: string, confirmPassword: string) {
      this.firstname = firstname;
      this.lastname = lastname;
      this.email = email;
      this.password = password;
      this.confirmPassword = confirmPassword;
    }
  
    // Validation method to check if the password matches the confirm password
    validatePassword(): boolean {
      return this.password === this.confirmPassword;
    }
  }
  