import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions  } from '@angular/router';
import { IndexComponent } from './layouts/index/index.component';
import { AccueilComponent } from './views/accueil/accueil.component';
import { EnregistrerComponent } from './views/enregistrer/enregistrer.component';
import { PageIntrouvableComponent } from './views/page-introuvable/page-introuvable.component';
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
  { path: "", redirectTo: "accueil", pathMatch: "full" },
  { path: '**', pathMatch: 'full',  component: PageIntrouvableComponent },

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
