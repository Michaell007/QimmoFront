import { Component, OnInit } from '@angular/core';
import { AuthnService } from 'src/app/services/authn.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isConnected = false;

  constructor(private svcAuth: AuthnService, private router: Router) { }

  ngOnInit(): void {
    this.isConnected = this.svcAuth.getLocalStorage("token") != undefined;
  }

  logOut() {
    this.svcAuth.viderLocalStorage("token");
    this.svcAuth.viderLocalStorage("current_data");
    this.router.navigate(['login']);
  }

}
