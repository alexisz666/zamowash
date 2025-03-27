import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importar FormsModule
import { IonicModule } from '@ionic/angular'; // Importar IonicModule

import { RegistroPageRoutingModule } from './registro-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, // Asegúrate de que FormsModule esté importado
    ReactiveFormsModule, // Si usas formularios reactivos
    IonicModule, // Asegúrate de que IonicModule esté importado
    RegistroPageRoutingModule,
  ],
  declarations: [], // No declares RegistroPage aquí
})
export class RegistroPageModule {}