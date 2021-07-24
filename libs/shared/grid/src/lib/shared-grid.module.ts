import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { TranslocoModule } from '@ngneat/transloco';
import { InputComponent } from './input/input.component';
import { NbCardModule, NbInputModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    NbCardModule,
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule,
    AgGridModule.withComponents([InputComponent]),
  ],
  declarations: [GridComponent, InputComponent],
  exports: [AgGridModule, GridComponent],
})
export class SharedGridModule {}
