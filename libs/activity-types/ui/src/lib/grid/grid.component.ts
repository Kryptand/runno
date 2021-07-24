import { Component, Input } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'runno-activity-types-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  data = [
    {
      id: 0,
      title: 'Joggen',
      color: '#000000',
      maxDistancePerDayInKm: 15,
      points: 3,
    },
    {
      id: 1,
      title: 'Wandern',
      color: '#ffffff',
      maxDistancePerDayInKm: 30,
      points: 2,
    },
    {
      id: 2,
      title: 'Radfahren',
      color: '#ffffff',
      maxDistancePerDayInKm: 50,
      points: 1.5,
    },
    {
      id: 3,
      title: 'E-Bike fahren',
      color: '#ffffff',
      maxDistancePerDayInKm: 50,
      points: 1,
    },
  ];
  columnDefs = [
    {
      headerName: 'Sportart',
      field: 'title',
      cellEditor: 'defaultInputEditor',
      cellEditorParams: { validators: [Validators.required] },
      editable: true,
    },
    {
      headerName: 'Farbe',
      field: 'color',
      cellEditor: 'defaultInputEditor',
      cellEditorParams: { type: 'color', validators: [Validators.required] },
      editable: true,
    },
    {
      headerName: 'Maximalwert pro Tag',
      field: 'maxDistancePerDayInKm',
      type: 'numericColumn',
      cellEditor: 'defaultInputEditor',
      cellEditorParams: { type: 'number', validators: [Validators.required] },
      editable: true,
    },
    {
      headerName: 'Punkte',
      field: 'points',
      type: 'numericColumn',
      cellEditor: 'defaultInputEditor',
      cellEditorParams: { type: 'number', validators: [Validators.required] },
      editable: true,
    },
  ];
}
