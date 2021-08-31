import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Team {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  team: Team;
}

export interface LeaderboardEntry {
  id: string;
  calculatedPoints: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class LeaderboardService {
  constructor(private http: HttpClient) {}
  getCurrentLeaderboard(): Observable<LeaderboardEntry[]> {
    return this.http.get<LeaderboardEntry[]>('http://localhost:3333/api/leaderboard');
  }
  getTeamsLeaderboard(): Observable<
    { team: string; calculatedPoints: number }[]
  > {
    return this.http.get<any[]>('http://localhost:3333/api/leaderboard/teams');
  }
}
