import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTabsPage } from './admin-tabs.page';
import { RoleGuard } from '../../guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminTabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule),
        canActivate: [RoleGuard],
        data: { expectedRole: 'admin' }
      },
      {
        path: 'ganancias',
        loadChildren: () => import('../ganancias/ganancias.module').then(m => m.GananciasPageModule),
        canActivate: [RoleGuard],
        data: { expectedRole: 'admin' }
      },
      {
        path: 'productos',
        loadChildren: () => import('../productos/productos.module').then(m => m.ProductosPageModule),
        canActivate: [RoleGuard],
        data: { expectedRole: 'admin' }
      },
      {
        path: 'alertas',
        loadChildren: () => import('../alertas/alertas.module').then(m => m.AlertasPageModule),
        canActivate: [RoleGuard],
        data: { expectedRole: 'admin' }
      },
      {
        path: 'modificar',
        loadChildren: () => import('../modificar/modificar.module').then(m => m.ModificarPageModule),
        canActivate: [RoleGuard],
        data: { expectedRole: 'admin' }
      },
      {
        path: 'promociones',
        loadChildren: () => import('../promociones/promociones.module').then(m => m.PromocionesPageModule),
        canActivate: [RoleGuard],
        data: { expectedRole: 'admin' }
      },
      {
        path: 'soporte',
        loadChildren: () => import('../soporte/soporte.module').then(m => m.SoportePageModule),
        canActivate: [RoleGuard],
        data: { expectedRole: 'admin' }
      },
      {
        path: 'reservas',
        loadChildren: () => import('../reservas/reservas.module').then(m => m.ReservasPageModule),
        canActivate: [RoleGuard],
        data: { expectedRole: 'admin' }
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTabsPageRoutingModule {}