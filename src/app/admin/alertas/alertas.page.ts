import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.page.html',
  styleUrls: ['./alertas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class AlertasPage implements OnInit {
  liquidAlerts: { title: string; message: string; icon: string; enProgreso?: boolean; responsable?: string; motivo?: string }[] = [];
  otherAlerts: { title: string; message: string; icon: string; enProgreso?: boolean; responsable?: string; motivo?: string }[] = [];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loadInitialAlerts();
  }

  loadInitialAlerts() {
    this.liquidAlerts = [
      { title: 'Sensor de Agua', message: 'Falla detectada. Requiere revisión inmediata.', icon: 'water' },
      { title: 'Sensor de Jabón', message: 'Nivel bajo. Por favor, rellena el tanque.', icon: 'color-fill' },
    ];

    this.otherAlerts = [
      { title: 'Sensor Ultrasónico', message: 'Mal funcionamiento. Verifica la conexión.', icon: 'pulse' },
      { title: 'Pantalla LED', message: 'Error en la visualización. Necesita reparación.', icon: 'tv' },
    ];
  }

  async responderAlerta(tipo: string, index: number) {
    const alert = await this.alertController.create({
      header: 'Responder a la alerta',
      inputs: [
        {
          name: 'descripcion',
          type: 'text',
          placeholder: 'Descripción del problema',
        },
        {
          name: 'responsable',
          type: 'text',
          placeholder: 'Responsable',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Responder',
          handler: (data) => {
            if (data.descripcion && data.responsable) {
              if (tipo === 'liquidAlerts') {
                this.liquidAlerts.splice(index, 1);
              } else if (tipo === 'otherAlerts') {
                this.otherAlerts.splice(index, 1);
              }
              this.mostrarToast('Alerta respondida correctamente.');
              return true;
            } else {
              return false;
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async marcarEnProgreso(tipo: string, index: number) {
    const alert = await this.alertController.create({
      header: 'Marcar como en progreso',
      inputs: [
        {
          name: 'responsable',
          type: 'text',
          placeholder: 'Responsable',
        },
        {
          name: 'motivo',
          type: 'text',
          placeholder: 'Motivo',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Marcar',
          handler: (data) => {
            if (data.responsable && data.motivo) {
              if (tipo === 'liquidAlerts') {
                this.liquidAlerts[index].enProgreso = true;
                this.liquidAlerts[index].responsable = data.responsable;
                this.liquidAlerts[index].motivo = data.motivo;
              } else if (tipo === 'otherAlerts') {
                this.otherAlerts[index].enProgreso = true;
                this.otherAlerts[index].responsable = data.responsable;
                this.otherAlerts[index].motivo = data.motivo;
              }
              this.mostrarToast('Alerta marcada como en progreso.');
              return true;
            } else {
              return false;
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }
}