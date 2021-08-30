import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Activity } from '@runno/api-interfaces';
import { ActivityService } from '../activity.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'runno-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent {
  public activities$!: Observable<any>;
  constructor(
    private activity: ActivityService,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.activities$ = this.activity.listActivities();
  }

  deleteActivity(id: string) {
    this.activity
      .deleteActivity(id)
      .pipe(take(1))
      .subscribe(() => {
        this.activities$ = this.activity.listActivities();
        this.cd.markForCheck();
      });
  }
}
