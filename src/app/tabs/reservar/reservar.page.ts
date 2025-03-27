import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.page.html',
  styleUrls: ['./reservar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class ReservarPage implements OnInit {
  formulario: FormGroup;
  reservas: any[] = []; // Lista de reservas

  dias = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  meses = ['Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  anios = ['2025'];
  horas = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastController: ToastController
  ) {
    this.formulario = this.fb.group({
      dia: ['', Validators.required],
      mes: ['', Validators.required],
      anio: ['', Validators.required],
      hora: ['', Validators.required],
      tipoCarro: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.cargarReservas(); // Cargar reservas al iniciar la página
  }

  async reservar() {
    if (this.formulario.invalid) {
      this.mostrarToast('Por favor, completa todos los campos.');
      return;
    }

    const { dia, mes, anio, hora, tipoCarro } = this.formulario.value;
    const userId = '67d9d97cb4316f108121cb56'; // Reemplaza con el ID del usuario autenticado

    try {
      const response: any = await this.http.post('http://localhost:3000/api/reservations', {
        userId,
        dia,
        mes,
        anio,
        hora,
        tipoCarro
      }).toPromise();

      this.mostrarToast('Reserva realizada correctamente.');
      this.formulario.reset(); // Limpiar el formulario
      this.cargarReservas(); // Actualizar la lista de reservas
    } catch (error) {
      this.mostrarToast('Error al realizar la reserva.');
      console.error(error);
    }
  }

  async cargarReservas() {
    const userId = '67d9d97cb4316f108121cb56'; // Reemplaza con el ID del usuario autenticado

    try {
      const response: any = await this.http.get(`http://localhost:3000/api/reservations/${userId}`).toPromise();
      this.reservas = response; // Actualizar la lista de reservas
    } catch (error) {
      console.error('Error al cargar las reservas:', error);
    }
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}