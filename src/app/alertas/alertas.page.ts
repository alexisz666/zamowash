import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.page.html',
  styleUrls: ['./alertas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class AlertasPage implements OnInit {
  liquidAlerts: { title: string; message: string; icon: string }[] = [];
  otherAlerts: { title: string; message: string; icon: string }[] = [];
  private alertCount: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadInitialAlerts();
  }

  loadInitialAlerts() {
    // Cargar las primeras alertas de líquidos y otros sensores
    this.liquidAlerts = [
      { title: 'Sensor de Agua', message: 'Falla detectada. Requiere revisión inmediata.', icon: 'water' },
      { title: 'Sensor de Jabón', message: 'Nivel bajo. Por favor, rellena el tanque.', icon: 'color-fill' },
      { title: 'Sensor de Cera', message: 'Nivel crítico. Necesita recarga urgente.', icon: 'flower' },
      { title: 'Sensor de Agua', message: 'Falla detectada. Requiere revisión inmediata.', icon: 'water' },
      { title: 'Sensor de Jabón', message: 'Nivel bajo. Por favor, rellena el tanque.', icon: 'color-fill' },
      { title: 'Sensor de Cera', message: 'Nivel crítico. Necesita recarga urgente.', icon: 'flower' },
      { title: 'Sensor de Agua', message: 'Falla detectada. Requiere revisión inmediata.', icon: 'water' },
      { title: 'Sensor de Jabón', message: 'Nivel bajo. Por favor, rellena el tanque.', icon: 'color-fill' },
      { title: 'Sensor de Cera', message: 'Nivel crítico. Necesita recarga urgente.', icon: 'flower' },
    ];

    this.otherAlerts = [
      { title: 'Sensor Ultrasónico', message: 'Mal funcionamiento. Verifica la conexión.', icon: 'pulse' },
      { title: 'Pantalla LED', message: 'Error en la visualización. Necesita reparación.', icon: 'tv' },
      { title: 'Sensor RFID', message: 'Falla en la lectura. Requiere atención urgente.', icon: 'key' },
    ];

    this.alertCount = this.liquidAlerts.length + this.otherAlerts.length;
  }

  loadData(event: any) {
    console.log('Cargando siguientes...');
    setTimeout(() => {
      // Simular la carga de nuevas alertas
      const newLiquidAlert = { title: 'Nuevo Sensor de Agua', message: 'Nueva falla detectada.', icon: 'water' };
      const newOtherAlert = { title: 'Nuevo Sensor Ultrasónico', message: 'Nuevo mal funcionamiento.', icon: 'pulse' };

      // Agregar nuevas alertas a las listas
      this.liquidAlerts.push(newLiquidAlert);
      this.otherAlerts.push(newOtherAlert);

      // Completar el evento de scroll infinito
      event.target.complete();

      // Deshabilitar el scroll infinito si se alcanza un límite
      if (this.liquidAlerts.length >= 5 || this.otherAlerts.length >= 5) {
        event.target.disabled = true;
      }
    }, 1000);
  }

  // Función para navegar a la página de Ganancias
  navigateToGanancias() {
    this.router.navigate(['/ganancias']);
  }

  // Función para navegar a la página de Productos
  navigateToProductos() {
    this.router.navigate(['/productos']);
  }

  // Función para navegar a la página de Alertas
  navigateToAlertas() {
    this.router.navigate(['/alertas']);
  }

  // Función para navegar a la página de Inicio
  navigateToInicio() {
    this.router.navigate(['/dashboard-page']);
  }
}