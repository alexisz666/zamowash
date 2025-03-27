import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class ReservasPage implements OnInit {
  reservas: any[] = []; // Lista de reservas

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarReservas(); // Cargar reservas al iniciar la página
  }

  async cargarReservas() {
    try {
      const response: any = await this.http.get('http://localhost:3000/api/reservations').toPromise();
      this.reservas = response; // Actualizar la lista de reservas
    } catch (error) {
      console.error('Error al cargar las reservas:', error);
    }
  }

  async confirmarCambioEstado(reservaId: string, nuevoEstado: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar acción',
      message: `¿Estás seguro de querer ${nuevoEstado.toLowerCase()} esta reserva?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.cambiarEstado(reservaId, nuevoEstado);
          }
        }
      ]
    });

    await alert.present();
  }

  async cambiarEstado(reservaId: string, nuevoEstado: string) {
    try {
      const response: any = await this.http.put(`http://localhost:3000/api/reservations/${reservaId}`, {
        estado: nuevoEstado
      }).toPromise();

      await this.mostrarToast(`Reserva ${nuevoEstado.toLowerCase()} correctamente.`, nuevoEstado === 'Aceptada' ? 'success' : 'danger');
      this.cargarReservas(); // Actualizar la lista de reservas
    } catch (error) {
      await this.mostrarToast('Error al cambiar el estado de la reserva.', 'warning');
      console.error(error);
    }
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