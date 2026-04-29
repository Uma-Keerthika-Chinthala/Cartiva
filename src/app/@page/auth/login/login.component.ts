import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { AuthService } from '@store/auth/service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  // private authService = inject(AuthService);

  public loginFormFg = this.formBuilder.group({
    username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_-]{3,16}$')]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  public onClickLogin(): void {
    console.log("Login button clicked");

    if (this.loginFormFg.valid) {
      const username = this.loginFormFg.value.username;
      const password = this.loginFormFg.value.password;
      console.log('Login payload:', { username, password });
      this.router.navigate(['/home']);
    }
  }
}