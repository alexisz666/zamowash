import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router'; // Importa Router para la navegación

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class ProductosPage implements OnInit {

  constructor(private router: Router) { } // Inyecta Router en el constructor

  ngOnInit() {
    // Puedes agregar lógica de inicialización aquí si es necesario
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