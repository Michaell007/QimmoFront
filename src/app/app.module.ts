import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './views/accueil/accueil.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FooterComponent } from './components/footer/footer.component';
import { IndexComponent } from './layouts/index/index.component';
import { CardComponent } from './components/card/card.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { RechercheComponent } from './views/recherche/recherche.component';
import { PageIntrouvableComponent } from './views/page-introuvable/page-introuvable.component';
import { EnregistrerComponent } from './views/enregistrer/enregistrer.component';
import { AccountComponent } from './views/account/account.component';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ProfilComponent } from './views/profil/profil.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    HeaderComponent,
    NavigationComponent,
    LoaderComponent,
    FooterComponent,
    IndexComponent,
    CardComponent,
    RechercheComponent,
    PageIntrouvableComponent,
    EnregistrerComponent,
    AccountComponent,
    LoginComponent,
    DashboardComponent,
    ProfilComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSliderModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
