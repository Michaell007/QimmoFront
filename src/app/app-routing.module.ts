import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions  } from '@angular/router';
import { IndexComponent } from './layouts/index/index.component';
import { AccueilComponent } from './views/accueil/accueil.component';
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
    path: "", redirectTo: "accueil", pathMatch: "full"
  }

  // {
  //   path: "",
  //   component: IndexComponent,
  //   children: [
  //     { path: "accueil", component: AccueilComponent },
  //     { path: "recherche/:page", component: RechercheComponent },
  //     { path: "", redirectTo: "accueil", pathMatch: "full" },
  //   ],
  // },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, options )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
