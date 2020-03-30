import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class FoodstallStaffGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authenticationService.currentUserValue) {
      if (this.authenticationService.currentUserValue.role === 'fsstaff') {
        return true;
      }
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url} });
    return false;
  }
}
