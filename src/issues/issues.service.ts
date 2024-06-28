import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class IssuesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async createIssue(data: Prisma.IssuesCreateInput, team_index: number) {
    try {
      await this.databaseService.workspace.update({
        where: {
          id: 1,
        },
        data: {
          team: {
            update: [
              {
                where: {
                  team_index: team_index,
                },
                data: {
                  issues: {
                    create: [data],
                  },
                },
              },
            ],
          },
        },
      });
    } catch (error) {
      console.error('Error creating issue:', error);
      throw error;
    } finally {
      await this.databaseService.$disconnect();
    }
  }

  async getIssues(team_index: number, issueStatus?: string) {
    try {
      const issue = await this.databaseService.workspace.findMany({
        where: {
          id: 1,
        },
        include: {
          team: {
            where: {
              team_index: team_index, // Team index
            },
            include: {
              issues: {
                where: {
                  status: issueStatus,
                },
              },
            },
          },
        },
      });
      return issue[0].team[0].issues;
    } catch (error) {
      console.error('Error fetching issues:', error);
      throw error;
    } finally {
      await this.databaseService.$disconnect();
    }
  }

  async updateIssues(
    issueIndex: number,
    data: Prisma.IssuesUpdateInput,
    teamIndex: number,
  ) {
    try {
      const issue = await this.databaseService.workspace.update({
        where: {
          id: 1,
        },
        data: {
          team: {
            update: [
              {
                where: { team_index: teamIndex },
                data: {
                  issues: {
                    update: [
                      {
                        where: { index: issueIndex },
                        data,
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      });
    } catch (error) {
      console.error('Error updating issue:', error);
      throw error;
    } finally {
      await this.databaseService.$disconnect();
    }
  }

  async deleteIssue(issueIndex: number, teamIndex: number) {
    try {
      await this.databaseService.issues.delete({
        where: {
          index: issueIndex,
          AND: { teamIndex },
        },
      });
    } catch (error) {
      console.log('Error deleting issue:', error);
    } finally {
      await this.databaseService.$disconnect();
    }
  }
}
