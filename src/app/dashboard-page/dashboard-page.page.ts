import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router'; // Asegúrate de que Router esté importado

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.page.html',
  styleUrls: ['./dashboard-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class DashboardPagePage implements OnInit {

  constructor(private router: Router) { } // Asegúrate de que Router esté inyectado

  ngOnInit() {
  }

  // Función para navegar a la página de consulta
  navigateToConsulta() {
    console.log('Navegando a consulta...'); // Agrega esto para depurar
    this.router.navigate(['/consulta']);
  }

  // Función para navegar a la página de ganancias
  navigateToGanancias() {
    console.log('Navegando a ganancias...'); // Agrega esto para depurar
    this.router.navigate(['/ganancias']); // Navega a la ruta de ganancias
  }

    // Nueva función para navegar a la página de productos
  navigateToProductos() {
    console.log('Navegando a productos...'); // Agrega esto para depurar
    this.router.navigate(['/productos']); // Navega a la ruta de productos

  }

  // Nueva función para navegar a la página de alertas
  navigateToAlertas() {
    console.log('Navegando a alertas...'); // Agrega esto para depurar
    this.router.navigate(['/alertas']); // Navega a la ruta de alertas
  
  }
}