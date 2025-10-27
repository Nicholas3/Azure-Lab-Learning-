import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LessonDTO } from './dto/lesson-dto';

@Injectable()
export class LessonService {
  constructor(private readonly prisma: PrismaService) {}

  async getLessonsWithCompletionStatus(
    studentId: number,
    courseId: number,
  ): Promise<LessonDTO[]> {
    const lessonsWithCompletion = await this.prisma.lesson.findMany({
      where: {
        courseId: courseId,
      },
      include: {
        CompletedLesson: {
          where: {
            studentId: studentId,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const lessonsDTO: LessonDTO[] = lessonsWithCompletion.map((lesson) => {
      const isCompleted =
        lesson.CompletedLesson && lesson.CompletedLesson.length > 0;
      const { ...lessonBaseData } = lesson;

      return {
        ...lessonBaseData,
        completed: isCompleted,
      };
    });

    return lessonsDTO;
  }
}
