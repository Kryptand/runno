import { Injectable } from '@angular/core';
import { ActivityType } from '@runno/api-interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  constructor(private http: HttpClient) {}
  create(activity: ActivityType) {
    return this.http.post('http://rr-laufchallenge:3333/api/activity', activity);
  }
  listActivities() {
    return this.http.get('http://rr-laufchallenge:3333/api/activity');
  }
  deleteActivity(id: string) {
    return this.http.delete('http://rr-laufchallenge:3333/api/activity/' + id);
  }
}
