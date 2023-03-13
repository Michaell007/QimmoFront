import { Component, OnInit } from '@angular/core';
import { FormBuilder, ValidatorFn, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthnService } from 'src/app/services/authn.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  isLoginError = false;

  constructor(private svcAuth: AuthnService, private fb: FormBuilder) { }

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
          this.svcAuth.setLocalStorage("current", JSON.stringify(response));
          this.isLoginError = false;
        },
        error => {
          this.isLoginError = true;
          console.log(`Error ${error}`)
        }
      );
    }
  }

}
