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
  liquidAlerts: { title: string; message: string; icon: string; type: string; timestamp: Date }[] = [];
  otherAlerts: { title: string; message: string; icon: string; type: string; timestamp: Date }[] = [];
  mostrar: string = 'liquid'; // Mostrar líquidos por defecto

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadInitialAlerts();
  }

  loadInitialAlerts() {
    // Cargar las primeras alertas de líquidos y otros sensores
    this.liquidAlerts = [
      { title: 'Sensor de Agua', message: 'Falla detectada. Requiere revisión inmediata.', icon: 'water', type: 'error', timestamp: new Date() },
      { title: 'Sensor de Jabón', message: 'Nivel bajo. Por favor, rellena el tanque.', icon: 'color-fill', type: 'warning', timestamp: new Date() },
      { title: 'Sensor de Cera', message: 'Nivel crítico. Necesita recarga urgente.', icon: 'flower', type: 'error', timestamp: new Date() },
    ];

    this.otherAlerts = [
      { title: 'Sensor Ultrasónico', message: 'Mal funcionamiento. Verifica la conexión.', icon: 'pulse', type: 'error', timestamp: new Date() },
      { title: 'Pantalla LED', message: 'Error en la visualización. Necesita reparación.', icon: 'tv', type: 'warning', timestamp: new Date() },
      { title: 'Sensor RFID', message: 'Falla en la lectura. Requiere atención urgente.', icon: 'key', type: 'error', timestamp: new Date() },
    ];
  }

  cambiarFiltro(event: any) {
    this.mostrar = event.detail.value; // Cambiar entre líquidos y otros sensores
  }
}