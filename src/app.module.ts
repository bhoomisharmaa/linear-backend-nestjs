import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IssuesController } from './issues/issues.controller';
import { IssuesService } from './issues/issues.service';
import { IssuesModule } from './issues/issues.module';
import { DatabaseModule } from './database/database.module';
import { TeamController } from './team/team.controller';
import { TeamService } from './team/team.service';
import { TeamModule } from './team/team.module';

@Module({
  imports: [IssuesModule, DatabaseModule, TeamModule],
  controllers: [AppController, IssuesController, TeamController],
  providers: [AppService, IssuesService, TeamService],
})
export class AppModule {}
