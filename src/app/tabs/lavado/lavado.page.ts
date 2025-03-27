import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lavado',
  templateUrl: './lavado.page.html',
  styleUrls: ['./lavado.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class LavadoPage implements OnInit {
  vehiculoSeleccionado: string | null = null;
  lavadoIniciado: boolean = false;
  etapaActual: string = 'Iniciado';
  etapas: string[] = ['Enjuagado', 'Lavado con Jabón', 'Enjuagado Final', 'Secado', 'Finalizado'];
  progreso: number = 0;
  intervalo: any;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  seleccionarVehiculo(tipo: string) {
    this.vehiculoSeleccionado = tipo;
  }

  async iniciarLavado() {
    if (this.vehiculoSeleccionado) {
      this.lavadoIniciado = true;
      let index = 0;
      this.etapaActual = this.etapas[index];
      this.progreso = 0;

      this.intervalo = setInterval(() => {
        index = (index + 1) % this.etapas.length;
        this.etapaActual = this.etapas[index];
        this.progreso = (index / (this.etapas.length - 1)) * 100; // Calcula el progreso

        // Detener el intervalo cuando llegue a "Finalizado"
        if (this.etapaActual === 'Finalizado') {
          clearInterval(this.intervalo);
          this.mostrarMensajePago();
        }
      }, 3000); // Cambia la etapa cada 3 segundos
    }
  }

  async mostrarMensajePago() {
    // Obtener los precios de lavado desde el backend
    this.http.get('http://localhost:3000/api/price-schedule').subscribe(
      (response: any) => {
        let precio = 0;
        switch (this.vehiculoSeleccionado) {
          case 'Sedan':
            precio = response.sedanPrice;
            break;
          case 'SUV':
            precio = response.suvPrice;
            break;
          case 'Pickup':
            precio = response.pickupPrice;
            break;
        }

        // Mostrar mensaje de pago
        const alert = this.alertController.create({
          header: 'Lavado Finalizado',
          message: `Total a pagar: $${precio}`,
          buttons: ['OK'],
        });
        alert.then((alert) => alert.present());

        // Registrar el servicio de lavado en la base de datos
        const compraData = {
          userId: '67d9d97cb4316f108121cb56', // Reemplazar con el ID del usuario logueado
          servicios: [
            {
              tipoCarro: this.vehiculoSeleccionado,
              precio: precio,
            },
          ],
          total: precio,
        };

        this.http.post('http://localhost:3000/api/compras', compraData).subscribe(
          (response: any) => {
            console.log('Servicio de lavado registrado:', response);
          },
          (error) => {
            console.error('Error al registrar el servicio de lavado:', error);
          }
        );
      },
      (error) => {
        console.error('Error al obtener los precios de lavado:', error);
      }
    );
  }

  cerrarSesion() {
    this.router.navigate(['/home']);
  }
}