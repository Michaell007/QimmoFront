import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { Options, LabelType } from "@angular-slider/ngx-slider";
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  annonces: any;
  formSearch!: FormGroup;
  price = 0;
  surface = 0;
  douche = 0;
  chambre = 0;
  
  // Option prix
  minValue: number = 25000;
  maxValue: number = 2000000;
  options: Options = {
    floor: 25000,
    ceil: 2000000,
    translate: (value: number, label: LabelType): string => {
      this.price = value;
      switch (label) {
        case LabelType.Low:
          return `${value} Fcfa`;
        case LabelType.High:
          return `${value} Fcfa`;
        default:
          return `${value} Fcfa`;
      }
    }
  };

  // Option surface
  minValue2: number = 4;
  maxValue2: number = 2000;
  options2: Options = {
    floor: 10,
    ceil: 2000,
    translate: (value: number, label: LabelType): string => {
      this.surface = value;
      switch (label) {
        case LabelType.Low:
          return `${value}  (m2)`;
        case LabelType.High:
          return `${value}  (m2)`;
        default:
          return `${value}  (m2)`;
      }
    }
  };

  // Option douche
  minValue3: number = 1;
  maxValue3: number = 50;
  options3: Options = {
    floor: 1,
    ceil: 50,
    translate: (value: number, label: LabelType): string => {
      this.douche = value;
      switch (label) {
        case LabelType.Low:
          return `${value}  douche(s)`;
        case LabelType.High:
          return `${value} douche(s)`;
        default:
          return `${value} douche(s)`;
      }
    }
  };

  // Option chambre
  minValue4: number = 1;
  maxValue4: number = 50;
  options4: Options = {
    floor: 1,
    ceil: 50,
    translate: (value: number, label: LabelType): string => {
      this.chambre = value;
      switch (label) {
        case LabelType.Low:
          return `${value}  chambre(s)`;
        case LabelType.High:
          return `${value} chambre(s)`;
        default:
          return `${value} chambre(s)`;
      }
    }
  };

  constructor(private svcApi: RestApiService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    // api get annonce
    this.svcApi.getLatestAnnonces().subscribe(
      (response: any) => {
        this.annonces = response.data;
      },
      error => console.log(`Error ${error}`)
    );

    // Init form
    this.formSearch = this.fb.group({
      keyword: ['', [Validators.required, Validators.minLength(5)]],
      localite: [''],
      type: [''],
    });
  }

  submitForm() {
    // set data search
    let adDatas = { 'price': this.price, 'surface': this.surface, 'douche': this.douche, 'chambre': this.chambre  }
    let datas = { ...this.formSearch.value, ...adDatas }

    // goto reseach page
    this.router.navigate(['/recherche'], { queryParams: datas });
  }

  doSomething() {
    console.log(this.price);
  }

}
