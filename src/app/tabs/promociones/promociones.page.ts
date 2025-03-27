import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.page.html',
  styleUrls: ['./promociones.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class PromocionesPage implements OnInit {
  promotions: any[] = []; // Lista de promociones
  promotionsProductos: any[] = []; // Promociones de productos
  promotionsLavados: any[] = []; // Promociones de lavados
  mostrar: string = 'productos'; // Filtro activo

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPromotions(); // Cargar promociones al iniciar la página
  }

  // Cargar promociones desde el backend
  loadPromotions() {
    this.http.get('http://localhost:3000/api/promotions').subscribe(
      (response: any) => {
        this.promotions = response; // Asignar las promociones a la lista
        this.filtrarPromociones(); // Filtrar las promociones
      },
      (error) => {
        console.error('Error al cargar las promociones:', error);
      }
    );
  }

  // Filtrar promociones en productos y lavados
  filtrarPromociones() {
    this.promotionsProductos = this.promotions.filter(promotion => promotion.type === 'product');
    this.promotionsLavados = this.promotions.filter(promotion => promotion.type === 'wash');
  }

  // Cambiar el filtro entre productos y lavados
  cambiarFiltro(event: any) {
    this.mostrar = event.detail.value;
  }
}