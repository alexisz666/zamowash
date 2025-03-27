import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './dashboard.page'; // Asegúrate de que el nombre sea correcto

const routes: Routes = [
  {
    path: '',
    component: DashboardPage, // Usa el nombre correcto del componente
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}