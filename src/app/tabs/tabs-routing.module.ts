import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';
import { RoleGuard } from '../guards/role.guard'; // Importa el guard

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard-page',
        loadChildren: () => import('./dashboard-page/dashboard-page.module').then((m) => m.DashboardPagePageModule),
        canActivate: [RoleGuard], // Protege la ruta con el guard
        data: { expectedRole: 'cliente' }, // Define el rol esperado
      },
      {
        path: 'consulta',
        loadChildren: () => import('./consulta/consulta.module').then((m) => m.ConsultaPageModule),
        canActivate: [RoleGuard], // Protege la ruta con el guard
        data: { expectedRole: 'cliente' }, // Define el rol esperado
      },
      {
        path: 'promociones',
        loadChildren: () => import('./promociones/promociones.module').then((m) => m.PromocionesPageModule),
        canActivate: [RoleGuard], // Protege la ruta con el guard
        data: { expectedRole: 'cliente' }, // Define el rol esperado
      },
      {
        path: 'soporte',
        loadChildren: () => import('./soporte/soporte.module').then((m) => m.SoportePageModule),
        canActivate: [RoleGuard], // Protege la ruta con el guard
        data: { expectedRole: 'cliente' }, // Define el rol esperado
      },
      {
        path: 'reservar',
        loadChildren: () => import('./reservar/reservar.module').then((m) => m.ReservarPageModule),
        canActivate: [RoleGuard], // Protege la ruta con el guard
        data: { expectedRole: 'cliente' }, // Define el rol esperado
      },
      {
        path: 'productos',
        loadChildren: () => import('./productos/productos.module').then((m) => m.ProductosPageModule),
        canActivate: [RoleGuard], // Protege la ruta con el guard
        data: { expectedRole: 'cliente' }, // Define el rol esperado
      },
      {
        path: 'alertas',
        loadChildren: () => import('./alertas/alertas.module').then((m) => m.AlertasPageModule),
        canActivate: [RoleGuard], // Protege la ruta con el guard
        data: { expectedRole: 'cliente' }, // Define el rol esperado
      },
      {
        path: 'compras', // Nueva ruta de compras
        loadChildren: () => import('./compras/compras.module').then((m) => m.ComprasPageModule),
        canActivate: [RoleGuard], // Protege la ruta con el guard
        data: { expectedRole: 'cliente' }, // Define el rol esperado
      },
      {
        path: 'lavado', // Mueve la ruta de lavado aquí
        loadChildren: () => import('./lavado/lavado.module').then((m) => m.LavadoPageModule),
        canActivate: [RoleGuard], // Protege la ruta con el guard
        data: { expectedRole: 'cliente' }, // Define el rol esperado
      },
      {
        path: '', // Ruta vacía dentro de 'tabs'
        redirectTo: 'dashboard-page', // Redirige a 'dashboard-page' por defecto
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}