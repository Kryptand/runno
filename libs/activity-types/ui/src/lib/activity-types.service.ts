import { Injectable } from '@angular/core';
import { ActivityType } from '@runno/api-interfaces';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ActivityTypesService {
  constructor(private http: HttpClient) {}
  activityTypes$: Observable<ActivityType[]> = of([]);
  private loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  loading$ = this.loadingSub.asObservable();
  loaded = new BehaviorSubject(false);
  load() {
    if (this.loaded.getValue()) {
      return;
    }
    this.loadingSub.next(true);
    this.activityTypes$ = this.http
      .get<ActivityType[]>('/api/activity-type')
      .pipe(
        tap(() => {
          this.loadingSub.next(false);
          this.loaded.next(true);
        })
      );
  }
  update(activityType: Partial<ActivityType>) {
    return this.http.put('/api/activity-type/' + activityType.id, activityType);
  }
  create(activityType: Partial<ActivityType>) {
    return this.http.post('/api/activity-type', activityType);
  }
}
