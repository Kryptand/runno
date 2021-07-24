import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'runno-public-route-shell',
  templateUrl: './public-route-shell.component.html',
  styleUrls: ['./public-route-shell.component.scss'],
})
export class PublicRouteShellComponent {
  public items: NbMenuItem[] = [
    {
      title: 'Rangliste',
      link: '/',
    },
    {
      title: 'Meine Aktivitäten',
      link: '/my-activities',
    },
    {
      title: 'Sportarten',
      link: '/activity-types',
      pathMatch: 'full',
    },
  ];
}
