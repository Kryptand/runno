import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { SharedGridModule } from '@runno/shared/grid';
import { NbCardModule, NbLayoutModule } from '@nebular/theme';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: GridComponent }
    ]),
    SharedGridModule,
    NbLayoutModule,
    NbCardModule
  ],
  declarations: [GridComponent],
})
export class ActivityTypesModule {}
