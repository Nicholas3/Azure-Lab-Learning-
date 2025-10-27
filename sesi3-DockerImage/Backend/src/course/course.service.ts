import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CourseDTO } from './dto/course-dto';
import { CourseDetailDTO } from './dto/course-detail-dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async getCourses(): Promise<CourseDTO[]> {
    const courses = await this.prisma.course.findMany({
      include: {
        teacher: true,
      },
    });

    return courses.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description ?? ' ',
      image: course.image,
      teacherId: course.teacher?.id ?? -1,
      teacherName: course.teacher?.name ?? ' ',
    }));
  }

  async getCourseDetail(
    courseId: number,
    userId: number,
  ): Promise<CourseDetailDTO> {
    const course = await this.prisma.course.findUnique({
      include: {
        Lesson: true,
        assignments: true,
        teacher: true,
      },
      where: {
        id: courseId,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found!');
    }

    const completedLessonsCount = await this.prisma.completedLesson.count({
      where: {
        studentId: userId,
        lesson: {
          courseId: courseId,
        },
      },
    });

    const submittedAssignmentsCount = await this.prisma.submission.count({
      where: {
        studentId: userId,
        assignment: {
          courseId: courseId,
        },
      },
    });

    return {
      id: course.id,
      title: course.title,
      description: course.description ?? '',
      image: course.image,
      teacherId: course.teacher?.id ?? -1,
      teacher: course.teacher
        ? {
            id: course.teacher.id,
            name: course.teacher.name,
            email: course.teacher.email,
            password: course.teacher.password,
            profileImageUrl: course.teacher.profileImageUrl,
            role: course.teacher.role,
          }
        : null,

      completedLessons: completedLessonsCount,
      completedAssignments: submittedAssignmentsCount,

      lessons: course.Lesson.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        contentUrl: lesson.contentUrl,
        courseId: lesson.courseId,
        createdAt: lesson.createdAt,
      })),

      Assignments: course.assignments.map((assignment) => ({
        id: assignment.id,
        courseId: assignment.courseId,
        title: assignment.title,
        description: assignment.description,
        createdAt: assignment.createdAt,
        dueDate: assignment.dueDate,
      })),
    };
  }
}
