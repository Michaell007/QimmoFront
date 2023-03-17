import { Component, OnInit } from '@angular/core';
import { FormBuilder, ValidatorFn, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthnService } from 'src/app/services/authn.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  isLoginError = false;

  constructor(private svcAuth: AuthnService, private fb: FormBuilder, public router: Router) { }

  ngOnInit(): void {

    // Init form
    this.formLogin = this.fb.group({
      username: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  submitForm() {
    
    if (this.formLogin.valid) {
      // request login
      this.svcAuth.postLogin(this.formLogin.value).subscribe(
        (response: any) => {
          this.svcAuth.setLocalStorage("token", JSON.stringify(response.token));
          this.svcAuth.setLocalStorage("current_data", JSON.stringify(response.data));
          this.router.navigate(['dashboard/profil']);
        },
        error => {
          this.isLoginError = true;
          console.log(`Error ${error}`)
        }
      );
    }
  }

}
