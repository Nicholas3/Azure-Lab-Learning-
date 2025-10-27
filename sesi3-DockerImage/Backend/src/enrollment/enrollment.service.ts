import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnrollmentDTO } from './dto/enrollment-dto';

@Injectable()
export class EnrollmentService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllEnrollments(): Promise<EnrollmentDTO[]> {
    const enrollments = await this.prisma.enrollment.findMany({
      include: {
        student: true,
        course: {
          include: {
            teacher: true,
            Lesson: true,
            assignments: true,
          },
        },
      },
    });

    return enrollments.map((enrollment) => ({
      id: enrollment.id,
      studentId: enrollment.studentId,
      courseId: enrollment.courseId,
      course: enrollment.course,
      lessonCount: enrollment.course.Lesson.length,
      assignmentCount: enrollment.course.assignments.length,
    }));
  }

  async getUserEnrollments(userId: number): Promise<EnrollmentDTO[]> {
    const enrollments = await this.prisma.enrollment.findMany({
      where: {
        studentId: userId,
      },
      include: {
        course: {
          include: {
            teacher: true,
            Lesson: true,
            assignments: true,
          },
        },
      },
    });

    return enrollments.map((enrollment) => ({
      id: enrollment.id,
      studentId: enrollment.studentId,
      courseId: enrollment.courseId,
      course: enrollment.course,
      lessonCount: enrollment.course.Lesson.length,
      assignmentCount: enrollment.course.assignments.length,
    }));
  }
}
