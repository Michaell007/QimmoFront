import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { Options, LabelType } from "@angular-slider/ngx-slider";
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
  annonces: any;
  formSearch!: FormGroup;
  maxPages = 0;

  constructor(private svcApi: RestApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // Init form
    this.formSearch = this.fb.group({
      keyword: [''],
      localite: [''],
      type: [''],
      price: [''],
      surface: [''],
      douche: [''],
      chambre: [''],
    });
  }

  submitForm() {
    // init data search
    let datas = this.formSearch.value;
    // check if price empty
    datas.price = datas.price == "" ? 2000000 : Number(datas.price);
    // check if surface empty
    datas.surface = datas.surface == "" ? 2000 : Number(datas.surface);
    // check if douche empty
    datas.douche = datas.douche == "" ? 50 : Number(datas.douche);
    // check if chambre empty
    datas.chambre = datas.chambre == "" ? 50 : Number(datas.chambre);

    // call api search
    this.svcApi.getSearchAnnonces(datas).subscribe(
      (response: any) => {
        this.annonces = response.data;
        this.maxPages = response.maxPages;
      },
      error => console.log(`Error ${error}`)
    );

  }

}
