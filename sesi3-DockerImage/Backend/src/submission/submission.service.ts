import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Submission } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubmissionService {
  constructor(private readonly prisma: PrismaService) {}

  async addSubmission(
    studentId: number,
    assignmentId: number,
    submissionContent: string,
  ): Promise<Submission> {
    const assignment = await this.prisma.assignment.findUnique({
      where: { id: assignmentId },
      select: { id: true },
    });

    if (!assignment) {
      throw new NotFoundException(
        `Assignment with ID ${assignmentId} not found.`,
      );
    }

    try {
      const newSubmission = await this.prisma.submission.create({
        data: {
          studentId: studentId,
          assignmentId: assignmentId,
          submissionContent: submissionContent,
          submittedAt: new Date(),
        },
      });
      return newSubmission;
    } catch (error) {
      console.error('Error creating Submission record:', error);
      throw new InternalServerErrorException('Could not add submission.');
    }
  }
}
