import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {LoginComponent} from './view/login/login.component';

const appRoutes: Routes = [
  {path: '', loadChildren:  () => import('./view/layout/layout.module').then(m => m.LayoutModule)},
  // {path: 'admin', redirectTo: '/admin', pathMatch: 'full'},
  // {path: 'foodstall', redirectTo: '/foodstall', pathMatch: 'full'},
  // {path: 'cashier', redirectTo: '/cashier', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'pagenotfound', component: PageNotFoundComponent},
  {path: 'error', component: ErrorPageComponent},
  {path: '**', redirectTo: '/pagenotfound'}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
