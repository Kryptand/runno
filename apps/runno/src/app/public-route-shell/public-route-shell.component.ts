import { Component, OnInit } from '@angular/core';
import {
  NbLayoutRulerService,
  NbMenuItem,
  NbSidebarService,
} from '@nebular/theme';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'runno-public-route-shell',
  templateUrl: './public-route-shell.component.html',
  styleUrls: ['./public-route-shell.component.scss'],
})
export class PublicRouteShellComponent implements OnInit {
  isSmall$!: Observable<boolean>;
  constructor(
    private sidebar: NbSidebarService,
    private nbRuler: NbLayoutRulerService
  ) {}
  public items: NbMenuItem[] = [
    {
      title: 'Rangliste',
      link: '/home',
    },
    {
      title: 'Meine Aktivitäten',
      link: '/my-activities',
    },
  ];
  toggle() {
    this.sidebar.toggle(false, 'left');
  }
  ngOnInit() {
    this.isSmall$ = fromEvent(window, 'resize').pipe(
      startWith(true),
      debounceTime(250),
      switchMap(() => this.nbRuler.getDimensions()),
      map((val) => val.clientWidth <= 600)
    );
  }
}
