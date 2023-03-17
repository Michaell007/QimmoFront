import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-details-annonce',
  templateUrl: './details-annonce.component.html',
  styleUrls: ['./details-annonce.component.css']
})
export class DetailsAnnonceComponent implements OnInit {
  annonce!: any;
  apiURL = 'localhost:8000/uploads/';

  constructor(private route: ActivatedRoute, private svcApi: RestApiService) { }

  ngOnInit(): void {
    let idAnnonce = Number( this.route.snapshot.paramMap.get('id') );

    // api get annonce
    this.svcApi.getAnnonceById(idAnnonce).subscribe(
      (response: any) => {
        this.annonce = response.data;
      },
      error => console.log(`Error ${error}`)
    );
  }

}
