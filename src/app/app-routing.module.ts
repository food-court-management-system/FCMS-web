import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {LoginComponent} from './view/login/login.component';
import {AuthguardService} from './service/authguard.service';

const appRoutes: Routes = [
  {path: '', loadChildren:  () => import('./view/layout/layout.module').then(m => m.LayoutModule), canActivate: [AuthguardService]},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  // {path: 'pagenotfound', component: PageNotFoundComponent},
  {path: 'error', component: ErrorPageComponent},
  {path: '**', redirectTo: ''}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
