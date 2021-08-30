import { HttpException, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { TeamSettingsEntity } from '../../../../team-settings/api/src/lib/team-settings.entity';
import { TeamSettingsService } from '../../../../team-settings/api/src/lib/team-settings.service';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repo: Repository<UserEntity>,
    private teamSetting: TeamSettingsService,
    private jwt: JwtService
  ) {}
  findByUsername(username: string) {
    return this.repo.findOne({ username });
  }
  async createUser(user: CreateUserDto) {
    try {
      const teams = (await this.teamSetting.find()) as TeamSettingsEntity[];
      let lowestNum = 999;
      let lowestCountTeam;
      for (const team of teams) {
        const count = await this.repo.count({
          where: { team: { id: team.id } },
        });
        if (count < lowestNum) {
          lowestNum = count;
          lowestCountTeam = team;
        }
      }
      user.team = lowestCountTeam;
      user.password = await hash(user.password, 10);
      const createdUser = await this.repo.create(user);
      await this.repo.save(createdUser);
      return this.createToken(createdUser);
    } catch (e) {
      throw new HttpException('Bad request', 400);
    }
  }
  private createToken(user: UserEntity) {
    const payload = {
      username: user.username,
      team: user?.team?.title,
      sub: user.id,
    };
    return {
      access_token: this.jwt.sign(payload),
    };
  }
}
