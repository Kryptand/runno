import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { SharedGridModule } from '@runno/shared/grid';
import { NbCardModule, NbLayoutModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbAuthJWTInterceptor } from '@nebular/auth';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: GridComponent },
    ]),
    SharedGridModule,
    NbLayoutModule,
    NbCardModule,
  ],
  declarations: [GridComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NbAuthJWTInterceptor,
      multi: true,
    },
  ],
})
export class ActivityTypesModule {}
