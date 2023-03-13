import { Component, OnInit } from '@angular/core';
import { FormBuilder, ValidatorFn, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  formAccount!: FormGroup;
  // notification empty
  isOk = -1;

  constructor(private svcApi: RestApiService, private fb: FormBuilder) { }

  ngOnInit(): void {

    // Init form
    this.formAccount = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.email, Validators.required] ],
      password: ['', Validators.required],
      repeatpwd: ['', Validators.required],
    } ,{ validators: this.checkPasswords });
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')!.value;
    let confirmPass = group.get('repeatpwd')!.value
    return pass === confirmPass ? null : { notSame: true }
  }

  submitForm() {
    
    if (this.formAccount.valid) {
      // request create
      this.svcApi.createUser(this.formAccount.value).subscribe(
        (response: any) => {
          // if created = 1 or If error error = 0
          this.isOk = response.code == 200 ? 1 : 0;
          if (this.isOk) {
            this.formAccount.reset(); // form.reset();
          }
        },
        error => console.log(`Error ${error}`)
      );
    }
  }

}
