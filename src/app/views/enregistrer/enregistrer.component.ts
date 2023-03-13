import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ValidatorFn, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-enregistrer',
  templateUrl: './enregistrer.component.html',
  styleUrls: ['./enregistrer.component.css']
})
export class EnregistrerComponent implements OnInit {
  formRegister!: FormGroup;
  // notification empty
  isOk = -1;

  constructor(private svcApi: RestApiService, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {

    // Init form
    this.formRegister = this.fb.group({
      nom: [''],
      prenom: [''],
      email: ['', [Validators.email, Validators.required] ],
      // password: ['', Validators.required],
      // repeatpwd: ['', Validators.required],
      type: ['', Validators.required],
      price: [25000, [Validators.required, Validators.min(25000)] ],
      surface: [4, [Validators.required, Validators.min(4)] ],
      douche: [1, [Validators.required, Validators.min(1)] ],
      chambre: [1, [Validators.required, Validators.min(1)] ],
    }
      // ,{ validators: this.checkPasswords }
    );
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')!.value;
    let confirmPass = group.get('repeatpwd')!.value
    return pass === confirmPass ? null : { notSame: true }
  }

  submitForm() {

    console.log( this.formRegister, this.formRegister.value );
    
    if (this.formRegister.valid) {
      // request create
      this.svcApi.createSouscripteur(this.formRegister.value).subscribe(
        (response: any) => {
          // if created = 1 or If error error = 0
          this.isOk = response.code == 200 ? 1 : 0;
          if (this.isOk) {
            this.formRegister.reset(); // form.reset();
          }
        },
        error => console.log(`Error ${error}`)
      );
    }

  }

}
