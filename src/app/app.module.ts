import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './view/login/login.component';
import { LayoutComponent } from './view/layout/layout.component';
import {LayoutModule} from './view/layout/layout.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ErrorPageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
