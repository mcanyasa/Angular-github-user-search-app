import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  Routes,  ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { ProfileComponent } from './components/profile/profile.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ProfilDetailComponent } from './components/profil-detail/profil-detail.component';
import {NgxWebstorageModule} from 'ngx-webstorage';


const routes: Routes = [
  { path: 'user/:id', component: ProfilDetailComponent},
  { path: '', component: SearchComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ProfileComponent,
    ProfilDetailComponent
  ],
  imports: [
    BrowserModule,
    NgxWebstorageModule.forRoot(),
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}


