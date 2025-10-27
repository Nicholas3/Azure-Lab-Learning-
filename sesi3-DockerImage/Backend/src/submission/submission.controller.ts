import {
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { CreateSubmissionDTO } from './dto/create-submission-dto';
import { Submission } from '@prisma/client';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/interfaces/payload/jwt-payload';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('submission')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @UseGuards(AuthGuard)
  @Post()
  async addSubmission(
    @Req() req: Request,
    @Body() createSubmissionData: CreateSubmissionDTO,
  ): Promise<Submission> {
    const user = req.user as JwtPayload;

    if (!user || !user.sub) {
      console.error('User payload or sub missing from request after AuthGuard');
      throw new InternalServerErrorException('User identification failed.');
    }

    const studentId = user.sub;

    try {
      const submission = await this.submissionService.addSubmission(
        studentId,
        createSubmissionData.assignmentId,
        createSubmissionData.submissionContent,
      );
      return submission;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(
        `Unexpected error adding submission for assignment ${createSubmissionData.assignmentId} by student ${studentId}:`,
        error,
      );
      if (!(error instanceof InternalServerErrorException)) {
        throw new InternalServerErrorException(
          'An unexpected error occurred while adding the submission.',
        );
      }
      throw error;
    }
  }
}
