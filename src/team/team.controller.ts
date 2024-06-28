import { Body, Controller, Get, Post } from '@nestjs/common';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post('create-team')
  createTeam(@Body() teamBody: { team_name: string; identifier: string }) {
    return this.teamService.createTeam(teamBody.team_name, teamBody.identifier);
  }

  @Get('get-team')
  getTeam() {
    return this.teamService.getTeam();
  }
}
