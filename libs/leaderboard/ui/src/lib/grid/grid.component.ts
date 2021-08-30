import { Component } from '@angular/core';
import { LeaderboardEntry, LeaderboardService } from '../leaderboard.service';
import { Observable } from 'rxjs';
import { NbAuthService } from '@nebular/auth';
import { map, switchMap } from 'rxjs/operators';
function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}
@Component({
  selector: 'runno-leaderboard-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent {
  public currentLeaderboard$!: Observable<LeaderboardEntry[]>;
  public currentTeamLeaderboard$!: Observable<
    { team: string; calculatedPoints: number }[]
  >;
  public user$!: Observable<any>;
  currentTeamPlace$!: Observable<number>;
  currentPlace$!: Observable<number>;
  constructor(
    private leaderBoard: LeaderboardService,
    private authService: NbAuthService
  ) {}
  ngOnInit() {
    this.currentTeamLeaderboard$ = this.leaderBoard.getTeamsLeaderboard();
    this.currentLeaderboard$ = this.leaderBoard.getCurrentLeaderboard();
    this.user$ = this.authService.getToken().pipe(
      map((uinfo: any) => {
        return parseJwt(uinfo['token'] as any);
      })
    );
    this.currentPlace$ = this.user$.pipe(
      switchMap((user) =>
        this.currentLeaderboard$.pipe(
          map((leaderboard) => {
            return (
              leaderboard.findIndex(
                (entry) => entry.user.username === user.username
              ) + 1
            );
          })
        )
      )
    );
    this.currentTeamPlace$ = this.user$.pipe(
      switchMap((user) =>
        this.currentTeamLeaderboard$.pipe(
          map((leaderboard) => {
            return (
              leaderboard.findIndex((entry) => entry.team === user.team) + 1
            );
          })
        )
      )
    );
  }
  currentTeamLeaderBoardColDef = [
    {
      headerName: 'Team',
      field: 'team',
    },
    {
      headerName: 'Gesamtpunktzahl',
      field: 'calculatedPoints',
    },
  ];
  currentLeaderBoardColDef = [
    {
      headerName: 'Benutzername',
      field: 'user.username',
    },
    {
      headerName: 'Team',
      field: 'user.team.title',
    },
    {
      headerName: 'Punkte',
      field: 'calculatedPoints',
    },
  ];
}
