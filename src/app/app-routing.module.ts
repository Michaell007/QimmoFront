import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './layouts/index/index.component';
import { AccueilComponent } from './views/accueil/accueil.component';
import { RechercheComponent } from './views/recherche/recherche.component';

const routes: Routes = [
  {
    path: "",
    component: IndexComponent,
    children: [
      { path: "accueil", component: AccueilComponent },
      { path: "recherche/:page", component: RechercheComponent },
      { path: "", redirectTo: "accueil", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
