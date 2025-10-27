import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpcomingAssignmentsDTO } from './dto/upcoming-assignments-dto';
import { AssignmentDTO } from './dto/assignment-dto';
import { Submission } from '@prisma/client';

@Injectable()
export class AssignmentService {
  constructor(private readonly prisma: PrismaService) {}

  async getUpcomingAssignmentsCount(
    studentId: number,
  ): Promise<UpcomingAssignmentsDTO> {
    const count = await this.prisma.assignment.count({
      where: {
        course: {
          enrollments: {
            some: {
              studentId: studentId,
            },
          },
        },
        dueDate: {
          gt: new Date(),
        },
      },
    });

    return { upcomingAssignments: count };
  }

  async getAssignmentsWithStatus(
    studentId: number,
    courseId: number,
  ): Promise<AssignmentDTO[]> {
    const assignmentsWithSubmissions = await this.prisma.assignment.findMany({
      where: {
        courseId: courseId,
      },
      include: {
        submissions: {
          where: {
            studentId: studentId,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const assignmentsDTO: AssignmentDTO[] = assignmentsWithSubmissions.map(
      (assignment) => {
        const submission = assignment.submissions?.[0];

        let status: 'pending' | 'submitted' | 'graded';
        let submissionData: Submission | undefined = undefined;

        if (!submission) {
          status = 'pending';
        } else {
          submissionData = submission;
          if (
            submission.grade !== null &&
            submission.grade !== undefined &&
            submission.grade !== ''
          ) {
            status = 'graded';
          } else {
            status = 'submitted';
          }
        }

        const { ...assignmentBaseData } = assignment;

        return {
          ...assignmentBaseData,
          submission: submissionData,
          status: status,
        };
      },
    );

    return assignmentsDTO;
  }
}
