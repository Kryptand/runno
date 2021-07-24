import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { NbCardModule } from '@nebular/theme';
import { SharedGridModule } from '@runno/shared/grid';

@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    SharedGridModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: GridComponent },
    ]),
  ],
  declarations: [GridComponent],
})
export class LeaderboardUiModule {}
