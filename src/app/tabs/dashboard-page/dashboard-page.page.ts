import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.page.html',
  styleUrls: ['./dashboard-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class DashboardPagePage implements OnInit {
  isWashing: boolean = false;

  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {}

  navigateToConsulta() {
    this.router.navigate(['/tabs/consulta']);
  }

  navigateToPromociones() {
    this.router.navigate(['/tabs/promociones']);
  }

  navigateToSoporte() {
    this.router.navigate(['/tabs/soporte']);
  }

  navigateToReservar() {
    this.router.navigate(['/tabs/reservar']);
  }

  async confirmarInicioLavado() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro que quieres comenzar el lavado?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Iniciar',
          handler: () => {
            this.iniciarLavado();
          },
        },
      ],
    });

    await alert.present();
  }

  iniciarLavado() {
    this.isWashing = true;
    const button = document.querySelector('.action-button');
    if (button) {
      button.setAttribute('color', 'danger');
      button.innerHTML = `
        <ion-icon name="play-circle" slot="start"></ion-icon>
        Iniciando Lavado
      `;
    }

    // Redirigir a la página de lavado después de iniciar el lavado
    this.router.navigate(['/tabs/lavado']);
  }

  cerrarSesion() {
    this.router.navigate(['/home']); // Redirige a la página de inicio
  }
}