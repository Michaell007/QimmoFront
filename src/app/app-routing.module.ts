import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions  } from '@angular/router';
import { IndexComponent } from './layouts/index/index.component';
import { AccountComponent } from './views/account/account.component';
import { AccueilComponent } from './views/accueil/accueil.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { EnregistrerComponent } from './views/enregistrer/enregistrer.component';
import { LoginComponent } from './views/login/login.component';
import { PageIntrouvableComponent } from './views/page-introuvable/page-introuvable.component';
import { ProfilComponent } from './views/profil/profil.component';
import { RechercheComponent } from './views/recherche/recherche.component';

const options: ExtraOptions = {
  onSameUrlNavigation: 'reload'
}

const routes: Routes = [
  {
    path: 'accueil', component: AccueilComponent
  },
  {
    path: 'recherche', component: RechercheComponent
  },
  {
    path: 'nouveau-compte', component: EnregistrerComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'account', component: AccountComponent
  },
  {
    path: "dashboard", component: DashboardComponent,
    children: [
      { path: 'profil', component: ProfilComponent },
      { path: "", redirectTo: "profil", pathMatch: "full" },
    ],
  },
  { path: "", redirectTo: "accueil", pathMatch: "full" },
  { path: '**', pathMatch: 'full',  component: PageIntrouvableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, options )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
