import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AdminTabsPage } from './admin-tabs.page';
import { AdminTabsPageRoutingModule } from './admin-tabs-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AdminTabsPageRoutingModule // Importa el módulo de rutas
  ],
  declarations: [AdminTabsPage]
})
export class AdminTabsPageModule {}