import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'runno-create-edit-form',
  templateUrl: './create-edit-form.component.html',
  styleUrls: ['./create-edit-form.component.css'],
})
export class CreateEditFormComponent {
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
  form = new FormGroup({
    type: new FormControl(),
    distanceInKm: new FormControl(),
    timeInMinutes: new FormControl(),
  });
}
