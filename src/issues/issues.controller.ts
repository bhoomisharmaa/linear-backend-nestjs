import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Get(':team_index/get-issues')
  getIssues(
    @Param('team_index') teamIndex: string,
    @Query('status') status?: string,
  ) {
    return this.issuesService.getIssues(+teamIndex, status);
  }

  @Patch('update-issues/:teamIndex/:issueIndex')
  updateIssue(
    @Param('teamIndex') teamIndex: string,
    @Body() data: Prisma.IssuesUpdateInput,
    @Param('issueIndex') issueIndex: string,
  ) {
    return this.issuesService.updateIssues(+issueIndex, data, +teamIndex);
  }

  @Post(':team_index/create-issues')
  createIssue(
    @Body() data: Prisma.IssuesCreateInput,
    @Param('team_index') teamIndex: string,
  ) {
    return this.issuesService.createIssue(data, +teamIndex);
  }

  @Delete(':teamIndex/deleteIssue/:issueIndex')
  async deleteIssue(
    @Param('teamIndex') teamIndex: string,
    @Param('issueIndex') issueIndex: string,
    @Res() res: Response,
  ) {
    if (!teamIndex || !issueIndex) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send('Team index and issue index are required');
    }

    try {
      await this.issuesService.deleteIssue(
        parseInt(issueIndex),
        parseInt(teamIndex),
      );
      return res.status(HttpStatus.OK).send('Issue deleted successfully');
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Error deleting issue');
    }
  }
}
