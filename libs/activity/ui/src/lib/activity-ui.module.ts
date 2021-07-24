import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { CreateEditFormComponent } from './create-edit-form/create-edit-form.component';
import { OverviewComponent } from './overview/overview.component';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbFormFieldModule,
  NbInputModule,
  NbListModule,
  NbSelectModule,
} from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: OverviewComponent },
      { path: 'createedit', component: CreateEditFormComponent },
      { path: 'createedit/:id', component: CreateEditFormComponent },
    ]),
    NbCardModule,
    NbListModule,
    NbButtonModule,
    NbFormFieldModule,
    NbInputModule,
    ReactiveFormsModule,
    NbSelectModule,
    NbDatepickerModule.forRoot(),
  ],
  declarations: [CardComponent, CreateEditFormComponent, OverviewComponent],
})
export class ActivityUiModule {}
