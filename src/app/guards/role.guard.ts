import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service'; // Importa el servicio de autenticación

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Obtener el rol esperado desde la ruta
    const expectedRole = route.data['expectedRole'];

    // Obtener el rol del usuario actual
    const currentUserRole = this.authService.getCurrentUserRole();

    // Verificar si el usuario tiene el rol esperado
    if (currentUserRole === expectedRole) {
      return true; // Permitir el acceso
    } else {
      // Redirigir al login si no tiene el rol esperado
      this.router.navigate(['/login']);
      return false; // Denegar el acceso
    }
  }
}