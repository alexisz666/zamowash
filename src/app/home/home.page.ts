import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class HomePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // Lógica de inicialización si es necesaria
  }

  // Método para redirigir al login
  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Método para redirigir al registro
  goToRegistro() {
    this.router.navigate(['/registro']);
  }
}