import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ganancias',
  templateUrl: './ganancias.page.html',
  styleUrls: ['./ganancias.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class GananciasPage implements OnInit {
  fechaActual: Date = new Date(); // Fecha actual
  totalGanancias: number = 0; // Total de ganancias
  gananciasLavados: number = 0; // Ganancias por lavados
  gananciasProductos: number = 0; // Ganancias por productos

  constructor(private router: Router) { }

  ngOnInit() {
    this.filtrarGanancias(); // Inicializar con datos
  }

  // Método para cambiar el día (avanzar o retroceder)
  cambiarDia(dias: number) {
    this.fechaActual.setDate(this.fechaActual.getDate() + dias);
    this.filtrarGanancias(); // Actualizar datos
  }

  // Método para filtrar ganancias según la fecha seleccionada
  filtrarGanancias() {
    const hoy = new Date();
    if (this.fechaActual.toDateString() === hoy.toDateString()) {
      this.totalGanancias = 150;
      this.gananciasLavados = 100;
      this.gananciasProductos = 50;
    } else {
      // Lógica para otras fechas
      this.totalGanancias = 0;
      this.gananciasLavados = 0;
      this.gananciasProductos = 0;
    }
  }

  // Funciones de navegación
  navigateToInicio() {
    this.router.navigate(['/dashboard-page']);
  }

  navigateToGanancias() {
    this.router.navigate(['/ganancias']);
  }

  navigateToProductos() {
    this.router.navigate(['/productos']);
  }

  navigateToAlertas() {
    this.router.navigate(['/alertas']);
  }
}