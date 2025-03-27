import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.page.html',
  styleUrls: ['./soporte.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class SoportePage implements OnInit {
  supportRequests: any[] = []; // Lista de solicitudes de soporte

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadSupportRequests();
  }

  async loadSupportRequests() {
    try {
      const response = await this.http.get<any[]>('http://localhost:3000/api/support').toPromise();
      this.supportRequests = response || [];
    } catch (error) {
      console.error('Error al cargar las solicitudes:', error);
      this.mostrarToast('Hubo un error al cargar las solicitudes.', 'warning');
    }
  }

  async responderSolicitud(supportId: string) {
    const alert = await this.alertController.create({
      header: 'Responder Solicitud',
      inputs: [
        {
          name: 'respuesta',
          type: 'textarea',
          placeholder: 'Escribe tu respuesta aquí...',
          attributes: {
            required: true
          }
        },
        {
          name: 'estado',
          type: 'text',
          placeholder: 'Estado (pendiente, en proceso, resuelta)',
          value: 'resuelta',
          attributes: {
            required: true
          }
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: async (data) => {
            if (!data.respuesta || !data.estado) {
              this.mostrarToast('Por favor, completa todos los campos.', 'warning');
              return false;
            }

            try {
              await this.http.put(`http://localhost:3000/api/support/${supportId}`, data).toPromise();
              this.mostrarToast('Solicitud actualizada exitosamente.', 'success');
              this.loadSupportRequests();
              return true;
            } catch (error) {
              console.error('Error al actualizar la solicitud:', error);
              this.mostrarToast('Hubo un error al actualizar la solicitud.', 'danger');
              return false;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async mostrarToast(mensaje: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }
}