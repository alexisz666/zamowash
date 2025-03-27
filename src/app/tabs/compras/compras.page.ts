import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ComprasPage implements OnInit {
  compras: any[] = []; // Lista de compras
  comprasProductos: any[] = []; // Compras de productos
  comprasLavados: any[] = []; // Compras de servicios de lavado
  mostrar: string = 'productos'; // Filtro activo

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarCompras(); // Cargar compras al iniciar la página
  }

  // Cargar compras desde el backend
  cargarCompras() {
    const userId = '67d9d97cb4316f108121cb56'; // ID del usuario logueado (Fernando)
    this.http.get(`http://localhost:3000/api/compras/${userId}`)
      .subscribe(
        (response: any) => {
          this.compras = response; // Asignar las compras a la lista
          this.filtrarCompras(); // Filtrar las compras
        },
        (error) => {
          console.error('Error al cargar las compras:', error);
        }
      );
  }

  // Filtrar compras en productos y servicios de lavado
  filtrarCompras() {
    this.comprasProductos = this.compras.filter(compra => compra.productos && compra.productos.length > 0);
    this.comprasLavados = this.compras.filter(compra => compra.servicios && compra.servicios.length > 0);
  }

  // Cambiar el filtro entre productos y servicios de lavado
  cambiarFiltro(event: any) {
    this.mostrar = event.detail.value;
  }
}