import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login-model';
import { User } from 'src/app/models/user';
import { AutorizationService } from 'src/app/services/autorization.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(private userService: UserService, 
    private formBuilder: FormBuilder, 
    private autorizationService: AutorizationService,
    private snackBar: MatSnackBar,
    private router: Router) {
      console.log("here");  
    // this.autorizationService.setUser(undefined);
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [
        Validators.required
      ]]
    });

  }

  loginForm: FormGroup;
  loginMode: boolean = true;
  username: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  loginValid: string | undefined;
  passwordsDontMatch: boolean | undefined = false;

  onSubmit() {
    if (this.loginMode == true) { //login
      let loginModel: LoginModel = new LoginModel(this.username!, this.password!);
      this.userService.login(loginModel).subscribe((user: User) => {
        this.autorizationService.setUser(user.email);
        if (user.isAdmin)
        {
          this.router.navigateByUrl('/locatii');
          this.autorizationService.changeAdminRights('admin');
        }
        else {
          this.router.navigateByUrl('/home');
          this.autorizationService.changeAdminRights('user');
        }
      },
      (error) => {
        this.snackBar.open("Date de login incorecte!");
        console.error(error);
      });

    }
    else if (this.password == this.confirmPassword) { //register and passwords match
      let registerModel: User = new User(this.username!, this.password!, true)

      this.userService.register(registerModel).subscribe(
        (result: User) => {
          this.snackBar,open("Inregistrarea s-a realizat cu succes!");
        },
        (error) => {
          this.snackBar,open("A aparut o eroare la inregistrare!");
          console.error(error);
        });
      this.loginMode = true;
    }
    else { //register and passwords don't match
      this.passwordsDontMatch = true;
    }
  }

  toggleLoginRegister() {
    this.loginMode = !this.loginMode;
  }

  confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password && confirmPassword && password.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  };

  confirmedValidator(control: FormGroup) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    // Check if passwords match
    return password === confirmPassword ? null : { 'confirmedValidator': true };
  }

  // Method to check passwords match when confirmPassword field is updated
  checkPasswordsMatch() {
    // Set errors for the custom validator
    this.loginForm.controls['confirmPassword'].setErrors(this.confirmedValidator(this.loginForm));

    // Check if the passwords match and update the flag accordingly
    this.passwordsDontMatch = this.loginForm.hasError('confirmedValidator') && this.loginForm.get('confirmPassword')?.touched;
  }

  // onKeyPress(event: KeyboardEvent) {
  //   console.log(this.password);
  //   console.log(this.confirmPassword)
  //   if (this.password != this.confirmPassword)
  //     this.passwordsDontMatch = true;
  //   else
  //     this.passwordsDontMatch = false;

  //     console.log(this.passwordsDontMatch)
  // }

  onKeyPress(event: KeyboardEvent): void {
    // Add your custom logic here based on the pressed key
    this.checkPasswordsMatch();
  }

  // checkPasswordsMatch(): void {
  //   this.loginForm.controls['confirmPassord'].setErrors({ confirmedValidator: true });
  //   // Check if the passwords match and update the flag accordingly
  //   this.passwordsDontMatch = this.password !== this.confirmPassword;
  // }
}
