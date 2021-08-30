import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivityTypesService } from '../../../../../activity-types/ui/src/lib/activity-types.service';
import { from, Observable } from 'rxjs';
import { ActivityType } from '@runno/api-interfaces';
import { ActivityService } from '../activity.service';
import { switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'runno-create-edit-form',
  templateUrl: './create-edit-form.component.html',
  styleUrls: ['./create-edit-form.component.css'],
})
export class CreateEditFormComponent {
  public types$!: Observable<ActivityType[]>;
  constructor(
    private activityTypes: ActivityTypesService,
    private activity: ActivityService,
    private router: Router
  ) {
    this.activityTypes.load();
  }
  ngOnInit() {
    this.types$ = this.activityTypes.activityTypes$;
    this.form.reset();
    this.form.updateValueAndValidity();
    this.form.patchValue({ createdAt: new Date() });

  }
  form = new FormGroup({
    createdAt: new FormControl(new Date()),
    type: new FormControl(),
    distanceInKm: new FormControl(),
    timeInMinutes: new FormControl(),
  });

  goBack() {
    this.form.reset();
    this.router.navigateByUrl('my-activities');
  }
  saveActivity(value: any, types: ActivityType[]) {
    const selectedType = types.find((x) => x.id === value.type);
    if (!selectedType) {
      return;
    }
    const maxDistance = selectedType.maxDistancePerDayInKm;
    let distance = value.distanceInKm;
    if (distance >= maxDistance) {
      distance = maxDistance;
    }
    value.calculatedPoints = distance * selectedType.points;
    this.activity
      .create(value)
      .pipe(
        take(1),
        switchMap(() => from(this.router.navigateByUrl('my-activities')))
      )
      .subscribe();
  }
}
