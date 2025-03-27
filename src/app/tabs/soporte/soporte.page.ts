import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.page.html',
  styleUrls: ['./soporte.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class SoportePage implements OnInit {
  formulario: FormGroup;
  supportRequests: any[] = []; // Lista de solicitudes de soporte

  constructor(
    private fb: FormBuilder,
    private toastController: ToastController,
    private http: HttpClient
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      tipo: ['', Validators.required],
      detalles: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadSupportRequests(); // Cargar las solicitudes de soporte al iniciar la página
  }

  async enviarFormulario() {
    if (this.formulario.invalid) {
      this.mostrarToast('Por favor, completa todos los campos.');
      return;
    }

    const supportData = {
      nombre: this.formulario.value.nombre,
      correo: this.formulario.value.correo,
      tipo: this.formulario.value.tipo,
      detalles: this.formulario.value.detalles,
      estado: 'pendiente', // Estado inicial de la solicitud
      fecha: new Date().toISOString() // Fecha de la solicitud
    };

    try {
      // Enviar la solicitud a MongoDB Atlas
      await this.http.post('http://localhost:3000/api/support', supportData).toPromise();
      this.mostrarToast('Solicitud enviada correctamente.');
      this.formulario.reset();
      this.loadSupportRequests(); // Recargar las solicitudes después de enviar
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      this.mostrarToast('Hubo un error al enviar la solicitud. Inténtalo de nuevo.');
    }
  }

  async loadSupportRequests() {
    try {
      // Obtener las solicitudes de soporte desde MongoDB Atlas
      const response = await this.http.get<any[]>('http://localhost:3000/api/support').toPromise();
      this.supportRequests = response || []; // Si response es undefined, asigna un array vacío
    } catch (error) {
      console.error('Error al cargar las solicitudes:', error);
      this.mostrarToast('Hubo un error al cargar las solicitudes.');
    }
  }

  getEstadoColor(estado: string): string {
    switch (estado) {
      case 'pendiente':
        return 'warning';
      case 'en proceso':
        return 'primary';
      case 'resuelta':
        return 'success';
      default:
        return 'medium';
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