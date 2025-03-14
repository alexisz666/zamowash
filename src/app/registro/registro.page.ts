import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular'; // Importar IonicModule
import { FormsModule } from '@angular/forms'; // Importar FormsModule

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true, // Asegúrate de que esta propiedad esté presente
  imports: [IonicModule, FormsModule], // Importar IonicModule y FormsModule aquí
})
export class RegistroPage {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false; // Para mostrar/ocultar contraseña
  showConfirmPassword: boolean = false; // Para mostrar/ocultar confirmación de contraseña

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  // Alternar visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Alternar visibilidad de la confirmación de contraseña
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Función de registro
  async register() {
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      await this.showAlert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      await this.showAlert('Error', 'Las contraseñas no coinciden. Favor de revisar.');
      return;
    }

    // Si todo está bien, mostrar el mensaje de éxito
    await this.showAlert('Registro exitoso', '¡Ya eres usuario de Zamowash!');
    this.router.navigate(['/login']);
  }

  // Mostrar alerta personalizada
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
      cssClass: 'custom-alert', // Clase CSS personalizada
    });

    await alert.present();
  }
}