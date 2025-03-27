import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RoleGuard } from './role.guard';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'; // Importa las clases necesarias

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Crear mocks para AuthService y Router
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getCurrentUserRole']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        RoleGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    // Obtener las instancias de los servicios y el guard
    guard = TestBed.inject(RoleGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if user role matches expected role', () => {
    // Configurar el mock para devolver el rol esperado
    authService.getCurrentUserRole.and.returnValue('admin');

    // Simular la ruta con el rol esperado
    const route = {
      data: { expectedRole: 'admin' },
    } as unknown as ActivatedRouteSnapshot; // Corrección aquí

    // Simular el estado de la ruta
    const state = {} as RouterStateSnapshot;

    // Ejecutar el guard
    const result = guard.canActivate(route, state);

    // Verificar que el acceso sea permitido
    expect(result).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should deny access and redirect to login if user role does not match expected role', () => {
    // Configurar el mock para devolver un rol diferente
    authService.getCurrentUserRole.and.returnValue('cliente');

    // Simular la ruta con el rol esperado
    const route = {
      data: { expectedRole: 'admin' },
    } as unknown as ActivatedRouteSnapshot; // Corrección aquí

    // Simular el estado de la ruta
    const state = {} as RouterStateSnapshot;

    // Ejecutar el guard
    const result = guard.canActivate(route, state);

    // Verificar que el acceso sea denegado y se redirija al login
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});