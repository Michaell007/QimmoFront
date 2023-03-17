import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, ValidatorFn, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.component.html',
  styleUrls: ['./add-annonce.component.css']
})
export class AddAnnonceComponent implements OnInit {
  formAnnonce!: FormGroup;
  isUpdated = -1;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private fb: FormBuilder, private svcApi: RestApiService) { }

  ngOnInit(): void {

    // Init form
    this.formAnnonce = this.fb.group({
      titre: [''],
      description: ['', Validators.required],
      montant: [25000, [Validators.required, Validators.min(25000)] ],
      lieu: ['', Validators.required],
      nbLit: [1, [Validators.required, Validators.min(1)] ],
      nbDouche: [1, [Validators.required, Validators.min(1)] ],
      dimension: [4, [Validators.required, Validators.min(4)] ],
      type: ['', Validators.required],
      image: null
    });
  }

  submitForm() {
    // const formModel = this.prepareSave();
    console.log('formModel', this.formAnnonce.value );

    // save annonce
    this.svcApi.addAnnonce( this.formAnnonce.value ).subscribe(
      (response: any) => {
        this.isUpdated = response.code == 200 ? 1 : 0;
        if (this.isUpdated) {
          this.formAnnonce.reset(); // form.reset();
          this.clearFile();
        }
      },
      error => {
        console.log(`Error ${error}`)
      }
    );
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if(target.files && target.files.length > 0) {
      let file = target.files[0];
      console.log('file', JSON.stringify(file) );
      this.formAnnonce.get(["image"])!.setValue(file);
      console.log('formAnn', this.formAnnonce.value);
    }
  }

  prepareSave() {

    let formAds = new FormData();
    console.log( this.formAnnonce.get('image')!.value );
     
    formAds.append('titre', this.formAnnonce.get('titre')!.value);
    formAds.append('montant', this.formAnnonce.get('montant')!.value);
    formAds.append('lieu', this.formAnnonce.get('lieu')!.value);
    formAds.append('nbLit', this.formAnnonce.get('nbLit')!.value);
    formAds.append('nbDouche', this.formAnnonce.get('nbDouche')!.value);
    formAds.append('dimension', this.formAnnonce.get('dimension')!.value);
    formAds.append('type', this.formAnnonce.get('type')!.value);
    formAds.append('image', this.formAnnonce.get('image')!.value);

    console.log(formAds.get('titre'));
    return formAds;
  }

  clearFile() {
    this.formAnnonce.get('image')!.setValue(null);
    this.fileInput.nativeElement.value = '';
  }

  onFileChangetest(event: Event) {
    let reader = new FileReader();
    const target = event.target as HTMLInputElement;
    if(target.files && target.files.length > 0) {
      let file = target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formAnnonce.get(["image"])!.setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1]
        })
      };
    }
  }


}
