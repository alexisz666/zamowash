import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./tabs/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'registro',
    loadChildren: () => import('./tabs/registro/registro.module').then((m) => m.RegistroPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [RoleGuard],
    data: { expectedRole: 'cliente' },
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin-tabs/admin-tabs.module').then((m) => m.AdminTabsPageModule),
    canActivate: [RoleGuard],
    data: { expectedRole: 'admin' }
  },
  // Redirecciones para mantener compatibilidad
  {
    path: 'admin/dashboard',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'admin/modificar',
    redirectTo: 'admin/modificar',
    pathMatch: 'full'
  },
  {
    path: 'admin/promociones',
    redirectTo: 'admin/promociones',
    pathMatch: 'full'
  },
  {
    path: 'admin/soporte',
    redirectTo: 'admin/soporte',
    pathMatch: 'full'
  },
  {
    path: 'admin/reservas',
    redirectTo: 'admin/reservas',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}