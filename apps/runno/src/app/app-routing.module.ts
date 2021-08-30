import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { PublicRouteShellComponent } from './public-route-shell/public-route-shell.component';

export const RUNNO_ROUTES: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@runno/auth/ui').then((m) => m.AuthModule),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: PublicRouteShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('@runno/leaderboard/ui').then((m) => m.LeaderboardUiModule),
      },
      {
        path: 'my-activities',
        loadChildren: () =>
          import('@runno/activity/ui').then((m) => m.ActivityUiModule),
      },
      {
        path: 'activity-types',
        loadChildren: () =>
          import('@runno/activity-types/ui').then((m) => m.ActivityTypesModule),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(RUNNO_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
