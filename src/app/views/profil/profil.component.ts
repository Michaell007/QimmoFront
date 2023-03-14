import { Component, OnInit } from '@angular/core';
import { FormBuilder, ValidatorFn, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RestApiService } from 'src/app/services/rest-api.service';
import { AuthnService } from 'src/app/services/authn.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  userInfo: any;
  formUpdate!: FormGroup;
  isUpdated = -1;

  constructor(private svcAuth: AuthnService, private fb: FormBuilder, private svcApi: RestApiService) { }

  ngOnInit(): void {

    this.userInfo = this.svcAuth.getLocalStorage("current_data").data;
    // Init form
    this.formUpdate = this.fb.group({
      nom: [this.userInfo.nom, Validators.required],
      prenom: [this.userInfo.prenom, Validators.required],
      email: [this.userInfo.email, [Validators.email, Validators.required]],
    });
  }

  submitForm() {
    
    if (this.formUpdate.valid) {
      // request login
      this.svcApi.updateUser(this.formUpdate.value).subscribe(
        (response: any) => {
          this.svcAuth.setLocalStorage("current_data", JSON.stringify(response));
          this.isUpdated = 1;
        },
        error => {
          this.isUpdated = 0;
          console.log(`Error ${error}`)
        }
      );
    }
  }

}
