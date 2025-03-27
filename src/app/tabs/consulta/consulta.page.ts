import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class ConsultaPage implements OnInit {
  priceSchedule: any = {}; // Objeto para almacenar los precios y horarios

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPriceSchedule(); // Cargar los datos al iniciar la página
  }

  loadPriceSchedule() {
    this.http.get('http://localhost:3000/api/price-schedule').subscribe((data: any) => {
      this.priceSchedule = data; // Asignar los datos obtenidos a la variable
    });
  }
}