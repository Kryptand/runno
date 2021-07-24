import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'runno-leaderboard-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent {
  data = [{ username: 'Andy', team: 'Annetts Rote Armee', points: 123123 }];
  columnDefs = [
    {
      headerName: 'Benutzername',
      field: 'username',
    },
    {
      headerName: 'Team',
      field: 'team',
    },
    {
      headerName: 'Punkte',
      field: 'points',
    },
  ];
}
