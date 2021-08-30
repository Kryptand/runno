import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivityTypesService } from '../activity-types.service';
import { Observable, of } from 'rxjs';
import { ActivityType } from '@runno/api-interfaces';
import { take } from 'rxjs/operators';

@Component({
  selector: 'runno-activity-types-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  public types$!: Observable<any[]>;
  constructor(private activityTypes: ActivityTypesService) {
    this.activityTypes.load();
  }
  ngOnInit() {
    this.types$ = this.activityTypes.activityTypes$;
  }
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

  end(values: any) {
    this.activityTypes.update(values).pipe(take(1)).subscribe();
  }
}
