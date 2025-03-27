import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ganancias',
  templateUrl: './ganancias.page.html',
  styleUrls: ['./ganancias.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class GananciasPage {
  periodoSeleccionado: string = 'dia';
  diaSeleccionado: number = new Date().getDate();
  mesSeleccionado: string = (new Date().getMonth() + 1).toString().padStart(2, '0');
  semanaSeleccionada: string = '1';

  totalProductos: number = 0;
  totalServicios: number = 0;
  totalIngresos: number = 0;
  mostrarResumen: boolean = false;

  dias: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  semanas: number[] = [1, 2, 3, 4];
  meses = [
    { nombre: 'Enero', value: '01' },
    { nombre: 'Febrero', value: '02' },
    { nombre: 'Marzo', value: '03' },
    { nombre: 'Abril', value: '04' },
    { nombre: 'Mayo', value: '05' },
    { nombre: 'Junio', value: '06' },
    { nombre: 'Julio', value: '07' },
    { nombre: 'Agosto', value: '08' },
    { nombre: 'Septiembre', value: '09' },
    { nombre: 'Octubre', value: '10' },
    { nombre: 'Noviembre', value: '11' },
    { nombre: 'Diciembre', value: '12' },
  ];

  categorias = [
    { nombre: 'Carro Sedan', monto: 0 },
    { nombre: 'Carro SUV', monto: 0 },
    { nombre: 'Carro Pickup', monto: 0 },
    { nombre: 'Productos', monto: 0 }
  ];

  constructor(private http: HttpClient) {}

  onPeriodoChange() {
    this.mostrarResumen = false;
  }

  async calcularGanancias() {
    const año = new Date().getFullYear().toString();

    try {
      // Simulación de datos (reemplazar con llamadas reales a tu API)
      this.totalProductos = Math.floor(Math.random() * 100) + 20;
      this.totalServicios = Math.floor(Math.random() * 50) + 10;
      this.totalIngresos = (this.totalProductos * 10) + (this.totalServicios * 15);
      
      // Actualizar categorías
      this.categorias.forEach(cat => {
        cat.monto = Math.floor(Math.random() * 1000) + 200;
      });
      
      this.mostrarResumen = true;
      
      /* 
      // Código real para llamadas API (descomentar y usar cuando esté listo el backend)
      const productosResponse: any = await this.http
        .get('http://localhost:3000/api/ganancias/productos', {
          params: { periodo: this.periodoSeleccionado, dia: this.diaSeleccionado.toString(), 
                   mes: this.mesSeleccionado, semana: this.semanaSeleccionada, año }
        }).toPromise();
      this.totalProductos = productosResponse.totalProductos;

      const serviciosResponse: any = await this.http
        .get('http://localhost:3000/api/ganancias/servicios', {
          params: { periodo: this.periodoSeleccionado, dia: this.diaSeleccionado.toString(), 
                   mes: this.mesSeleccionado, semana: this.semanaSeleccionada, año }
        }).toPromise();
      this.totalServicios = serviciosResponse.totalServicios;

      const ingresosResponse: any = await this.http
        .get('http://localhost:3000/api/ganancias/ingresos', {
          params: { periodo: this.periodoSeleccionado, dia: this.diaSeleccionado.toString(), 
                   mes: this.mesSeleccionado, semana: this.semanaSeleccionada, año }
        }).toPromise();
      this.totalIngresos = ingresosResponse.totalIngresos;
      */
    } catch (error) {
      console.error('Error al calcular las ganancias:', error);
    }
  }
}