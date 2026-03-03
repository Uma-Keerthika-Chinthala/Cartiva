import { Component, inject} from '@angular/core';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { Store } from '@ngxs/store';
import { LoginAction } from '@store/auth/state/auth.action';
import { AuthenticationRequest } from '@store/auth/state/auth.model';
import { AuthState } from '@store/auth/state/auth.state';
import { Router } from '@angular/router';
import { AuthService } from '@store/auth/service/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // public loginFormFg: FormGroup | undefined;
  private formBuilder =  inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(){
  }

  public loginFormFg = this.formBuilder.group({
    username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_-]{3,16}$')]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  // public onClickLogin(): void {
  //   console.log("Login button clicked");
  //   if (this.loginFormFg.invalid) return;

  //   const payload: AuthenticationRequest = {
  //     username: this.loginFormFg.value.username,
  //     password: this.loginFormFg.value.password
  //   };
  //   console.log(payload);
  //   this.store.dispatch(new LoginAction(payload))
  //     .subscribe(() => {
  //       console.log(localStorage.getItem('token'))
  //       const isAuthenticated =
  //         this.store.selectSnapshot(AuthState.isAuthenicater);
  //       console.log('isAuthenticated:', isAuthenticated);
  //       if (isAuthenticated) {
  //         this.router.navigate(['/home']);
  //       }

  //     });
  // }

  public onClickLogin(): void {
    console.log("Login button clicked");

    if (this.loginFormFg.valid){
      const username = this.loginFormFg.value.username; 
      const password = this.loginFormFg.value.password; 

      const payload: AuthenticationRequest = {
        username: username,
        password: password
      }
      console.log('Login payload:', payload);
      this.router.navigate(['/home']);
      // this.authService.login(payload).subscribe({
      //   next: (response) => {
      //     if (response.ok){
      //       console.log('Login successful:', response);
      //       console.log('Token:', response.jwt_token);
      //       // Handle successful login, e.g., navigate to home
      //     }
      //   },
      //   error: (error) => {
      //     console.error('Login failed:', error);
      //     // Handle login error
      //   }
      // });
    }
  }

}
