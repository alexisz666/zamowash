import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { AlertController } from '@ionic/angular';
import { isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage implements OnInit {
  private isWeb = !isPlatform('capacitor');

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.initializeGoogleAuth();
  }

  private async initializeGoogleAuth() {
    try {
      if (this.isWeb) {
        await GoogleAuth.initialize({
          clientId: '701772098331-45uur025tla55uhh6r3e2cucio9ua618.apps.googleusercontent.com',
          scopes: ['profile', 'email']
        });
        console.log('Google Auth inicializado para web');
      } else {
        await GoogleAuth.initialize();
        console.log('Google Auth inicializado para móvil');
      }
    } catch (error) {
      console.error('Error al inicializar Google Auth:', error);
      this.showAlert('Error', 'No se pudo inicializar el servicio de Google. Recarga la página.');
    }
  }

  // Métodos de navegación
  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegistro() {
    this.router.navigate(['/registro']);
  }

  // Método mejorado para login con Google
  async loginWithGoogle() {
    try {
      console.log('Iniciando autenticación con Google...');
      
      const googleUser = await GoogleAuth.signIn();
      if (!googleUser || !googleUser.email) {
        throw new Error('No se recibieron datos válidos de Google');
      }

      console.log('Usuario de Google:', googleUser);

      const userData = {
        email: googleUser.email,
        name: googleUser.givenName || googleUser.name || 'Usuario Google',
        googleId: googleUser.id,
        imageUrl: googleUser.imageUrl,
        authProvider: 'google',
        role: 'cliente', // Todos los usuarios de Google serán clientes
        token: googleUser.authentication?.idToken || ''
      };

      this.authService.loginWithGoogle(userData).subscribe({
        next: async (response) => {
          if (!response?.user) {
            throw new Error('Respuesta inválida del servidor');
          }

          // Guarda los datos del usuario
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', response.token || '');

          // Redirección explícita al dashboard
          await this.router.navigate(['/tabs/dashboard-page'], { replaceUrl: true });
          console.log('Redirección exitosa al dashboard');
        },
        error: async (error) => {
          console.error('Error en la petición al backend:', error);
          await this.showAlert('Error', 'No se pudo completar el inicio de sesión');
        }
      });

    } catch (error) {
      console.error('Error en loginWithGoogle:', error);
      this.handleGoogleSignInError(error);
    }
  }

  private async handleGoogleSignInError(error: any) {
    // Verificación segura del tipo de error
    const isPopupClosed = error?.error === 'popup_closed_by_user' || 
                         error?.message?.includes('popup_closed_by_user');
    
    if (!isPopupClosed) {
      let errorMessage = 'Error al conectar con Google';
      
      if (error?.error === 'idpiframe_initialization_failed') {
        errorMessage = 'Problema de configuración con Google. Recarga la página.';
      } else if (error?.error === 'popup_blocked') {
        errorMessage = 'El navegador bloqueó la ventana de inicio de sesión. Permite ventanas emergentes.';
      }

      await this.showAlert('Error', errorMessage);
    }
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}