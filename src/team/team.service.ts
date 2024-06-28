import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TeamService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createTeam(team_name: string, identifier: string) {
    try {
      const workspace = await this.databaseService.workspace.update({
        where: {
          id: 1,
        },
        data: {
          team: {
            create: {
              team_name,
              identifier,
            },
          },
        },
      });
      console.log(workspace);
    } catch (error) {
      console.log('Error creating team:', error);
      throw error;
    } finally {
      await this.databaseService.$disconnect();
    }
  }

  async getTeam() {
    try {
      const workspace = await this.databaseService.workspace.findMany({
        where: {
          workName: 'Tierra',
        },
        include: {
          team: {},
        },
      });
      return workspace[0].team;
    } catch (error) {
      console.error('Error fetching team:', error);
      throw error;
    } finally {
      await this.databaseService.$disconnect();
    }
  }
}
