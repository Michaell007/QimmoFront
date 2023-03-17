import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { RestApiService } from 'src/app/services/rest-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
  annonces: any[] = [];
  dataSearch: {} = {};
  formSearch!: FormGroup;
  maxPages = 0;
  page = 1;
  apiURL = 'localhost:8000/uploads/';

  constructor(private svcApi: RestApiService, private fb: FormBuilder, private route: ActivatedRoute) { }

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

    // if go from home page
    let gotoHome = this.route.snapshot.queryParams['keyword'] ?? false;
    if ( !(typeof gotoHome == "boolean") ) {
      this.formSearch.controls["keyword"].setValue( this.route.snapshot.queryParams['keyword'] );
      this.formSearch.controls["localite"].setValue( this.route.snapshot.queryParams['localite'] );
      this.formSearch.controls["type"].setValue( this.route.snapshot.queryParams['type'] );
      this.formSearch.controls["price"].setValue( this.route.snapshot.queryParams['price'] );
      this.formSearch.controls["surface"].setValue( this.route.snapshot.queryParams['surface'] );
      this.formSearch.controls["douche"].setValue( this.route.snapshot.queryParams['douche'] );
      this.formSearch.controls["chambre"].setValue( this.route.snapshot.queryParams['chambre'] );
      // submit form
      this.submitForm();
    }

    // init data // call api search
    this.svcApi.getAllAnnonces(this.page).subscribe(
      (response: any) => {
        this.annonces = response.data;
        this.maxPages = response.maxPages;
      },
      error => console.log(`Error ${error}`)
    );

  }

  submitForm() {
    // init data search
    this.page = 1;
    let datas = this.formSearch.value;
    // check if price empty
    datas.price = datas.price == "" ? 1000000000 : Number(datas.price);
    // check if surface empty
    datas.surface = datas.surface == "" ? 2000 : Number(datas.surface);
    // check if douche empty
    datas.douche = datas.douche == "" ? 50 : Number(datas.douche);
    // check if chambre empty
    datas.chambre = datas.chambre == "" ? 50 : Number(datas.chambre);
    // check if type empty
    datas.type = datas.type == "" ? 'Location' : datas.type;

    this.dataSearch = datas;

    // call api search
    this.svcApi.getSearchAnnonces(this.dataSearch, this.page = 1).subscribe(
      (response: any) => {
        this.annonces = response.data;
        this.maxPages = response.maxPages;
      },
      error => console.log(`Error ${error}`)
    );

  }

  isEmptyObject(obj: any) {
    return (obj && (Object.keys(obj).length === 0));
  }

  changePage(numberPage: number) {

    this.page = numberPage;
    if (this.isEmptyObject(this.dataSearch)) {
      // load new data
      this.svcApi.getAllAnnonces(this.page).subscribe(
        (response: any) => {
          this.annonces = response.data;
          this.maxPages = response.maxPages;
        },
        error => console.log(`Error ${error}`)
      );
      return;
    }

    this.svcApi.getSearchAnnonces(this.dataSearch, this.page).subscribe(
      (response: any) => {
        this.annonces = response.data;
        this.maxPages = response.maxPages;
      },
      error => console.log(`Error ${error}`)
    );

  }

  nextPage() {

    this.page++;
    if (this.page > this.maxPages) {
      this.page = 1;
      this.changePage(this.page);
    } else {
      this.changePage(this.page);
    }
  }

  prevPage() {

    this.page--;
    if (this.page <= 0) {
      this.page = 1;
      this.changePage(this.page);
    } else {
      this.changePage(this.page);
    }
  }


}
