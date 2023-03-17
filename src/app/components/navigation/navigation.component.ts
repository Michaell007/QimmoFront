import { Component, OnInit } from '@angular/core';
import { AuthnService } from 'src/app/services/authn.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isConnected = false;

  constructor(private svcAuth: AuthnService) { }

  ngOnInit(): void {
    this.isConnected = this.svcAuth.getLocalStorage("token") != undefined;
  }

}
