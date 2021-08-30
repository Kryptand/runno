import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@runno/auth/api';
import { LeaderboardService } from './leaderboard-service';
import { LeaderboardEntity } from './leaderboard.entity';

const groupStuff = (entries: LeaderboardEntity[]) => {
  const map = new Map<string, number>();
  entries.forEach((entry) => {
    const team = entry.user.team.title;
    if (map.has(team)) {
      const val = map.get(team) + entry.calculatedPoints;
      map.set(team, val);
      return;
    }
    map.set(team, entry.calculatedPoints);
  });
  return map;
};

@Controller('leaderboard')
@UseGuards(JwtAuthGuard)
export class LeaderboardController {
  constructor(public service: LeaderboardService) {}

  @Get()
  async leaderboardEntries() {
    const entries = await this.service.find();
    const sortedEntries = entries.sort(
      (a, b) => b.calculatedPoints - a.calculatedPoints
    );
    return sortedEntries;
  }

  @Get('/entries/:id')
  async findOne(@Param() params) {
    const entries = await this.leaderboardEntries();
    return entries.findIndex((x) => x.user.id === params.id) + 1;
  }

  @Get('/teams')
  async leaderboardTeams() {
    const entries = await this.service.find();
    const pointsByTeam = groupStuff(entries);
    let mappedPoints = [];
    pointsByTeam.forEach((val, key) => {
      mappedPoints = [...mappedPoints, { team: key, calculatedPoints: val }];
    });
    return mappedPoints.sort((a, b) => b.calculatedPoints - a.calculatedPoints);
  }
}
