import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    this.formularioLogin = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.formularioLogin.invalid) {
      await this.showAlert('Error', 'Por favor, completa todos los campos correctamente.');
      return;
    }

    const { email, password } = this.formularioLogin.value;
    this.authService.login(email, password).subscribe(
      async (response: any) => {
        await this.showAlert('Éxito', 'Inicio de sesión exitoso.');

        // Redirigir según el rol del usuario
        const user = this.authService.getCurrentUser();
        if (user && user.role) {
          if (user.role === 'admin') {
            this.router.navigate(['/admin']); // Cambiado a '/admin' que carga AdminTabsPage
          } else if (user.role === 'cliente') {
            this.router.navigate(['/tabs']);
          }
        } else {
          this.router.navigate(['/home']);
        }
      },
      async (error) => {
        await this.showAlert('Error', 'Correo o contraseña incorrectos.');
      }
    );
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}