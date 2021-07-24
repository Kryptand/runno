import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'runno-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private nbAuthService: NbAuthService,
    private cd: ChangeDetectorRef
  ) {}
  isAuthenticated$!: Observable<boolean>;
  public ngOnInit() {
    this.isAuthenticated$ = this.nbAuthService.isAuthenticated();
    this.nbAuthService.onAuthenticationChange().subscribe((change) => {
      if (change) {
        this.isAuthenticated$ = of(change);
        this.cd.markForCheck();
      }
    });
  }
}
