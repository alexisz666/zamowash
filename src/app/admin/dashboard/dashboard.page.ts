import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html', // Asegúrate de que el nombre del archivo HTML sea correcto
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
    imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class DashboardPage implements OnInit { // Nombre de la clase: DashboardPage
  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {}

  // Navegación a las diferentes secciones
  navigateToModificar() {
    this.router.navigate(['/admin/modificar']);
  }

  navigateToPromociones() {
    this.router.navigate(['/admin/promociones']);
  }

  navigateToSoporte() {
    this.router.navigate(['/admin/soporte']);
  }

  navigateToReservas() {
    this.router.navigate(['/admin/reservas']);
  }

  // Ver estadísticas
  verEstadisticas() {
    this.router.navigate(['/admin/estadisticas']);
  }

  // Cerrar sesión
  cerrarSesion() {
    this.router.navigate(['/login']); // Redirige a la página de login
  }
}