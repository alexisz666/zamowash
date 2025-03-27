import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://10.3.7.249:3000'; // URL de tu backend

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Registra un nuevo usuario
   * @param username Nombre de usuario
   * @param email Email del usuario
   * @param password Contraseña
   */
  register(username: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/api/register`, { username, email, password }).pipe(
      tap((response: any) => {
        if (response.user) {
          this.setUserData(response.user);
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Inicio de sesión tradicional
   * @param email Email del usuario
   * @param password Contraseña
   */
  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/api/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response.user) {
          this.setUserData(response.user);
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Inicio de sesión con Google
   * @param userData Datos del usuario de Google
   */
  loginWithGoogle(userData: any) {
    return this.http.post(`${this.apiUrl}/api/auth/google`, userData).pipe(
      tap((response: any) => {
        if (response?.user) {
          this.setUserData(response.user);
          this.router.navigate(['/dashboard/']);
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Cierra la sesión del usuario
   */
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return !!this.getCurrentUser()?.email;
  }

  /**
   * Obtiene el rol del usuario actual
   */
  getCurrentUserRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  /**
   * Obtiene los datos del usuario actual
   */
  getCurrentUser(): any {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  // ===== Métodos privados ===== //

  /**
   * Almacena los datos del usuario en localStorage
   * @param user Datos del usuario
   */
  private setUserData(user: any): void {
    if (user && user.email) {
      const userData = {
        id: user._id || user.id,
        email: user.email,
        name: user.name || user.username,
        role: user.role || 'user',
        imageUrl: user.imageUrl || '',
        authMethod: user.authMethod || 'local'
      };
      localStorage.setItem('user', JSON.stringify(userData));
    }
  }

  /**
   * Maneja errores de las peticiones HTTP
   * @param error Error recibido
   */
  private handleError(error: any) {
    console.error('Error en AuthService:', error);
    
    let errorMessage = 'Ocurrió un error inesperado';
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return throwError(() => new Error(errorMessage));
  }
}