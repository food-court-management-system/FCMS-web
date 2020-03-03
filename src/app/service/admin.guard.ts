import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authenticationService.currentUserValue) {
      if (this.authenticationService.currentUserValue.role === 'admin') {
        return true;
      }
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url} });
    return false;
  }
}
