import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CompletedLesson } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompletedLessonService {
  constructor(private readonly prisma: PrismaService) {}

  async markLessonAsCompleted(
    studentId: number,
    lessonId: number,
  ): Promise<CompletedLesson> {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { id: true, courseId: true },
    });
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${lessonId} not found.`);
    }

    try {
      const completedLesson = await this.prisma.completedLesson.create({
        data: {
          studentId: studentId,
          lessonId: lessonId,
        },
      });
      return completedLesson;
    } catch (error) {
      console.error('Error creating CompletedLesson record:', error);
      throw new InternalServerErrorException(
        'Could not mark lesson as completed.',
      );
    }
  }
}
