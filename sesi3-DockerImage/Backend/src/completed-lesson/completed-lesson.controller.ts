import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CompletedLessonService } from './completed-lesson.service';
import { MarkLessonCompletedDTO } from './dto/mark-lesson-completed-dto';
import { CompletedLesson } from '@prisma/client';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/interfaces/payload/jwt-payload';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('completed-lesson')
export class CompletedLessonController {
  constructor(
    private readonly completedLessonService: CompletedLessonService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async markAsCompleted(
    @Req() req: Request,
    @Body() markLessonCompletedData: MarkLessonCompletedDTO,
  ): Promise<CompletedLesson> {
    const user = req.user as JwtPayload;

    if (!user.sub) {
      console.error('User payload or sub missing from request after AuthGuard');
      throw new InternalServerErrorException('User identification failed.');
    }

    const studentId = user.sub;

    try {
      const completedLesson =
        await this.completedLessonService.markLessonAsCompleted(
          studentId,
          markLessonCompletedData.lessonId,
        );
      return completedLesson;
    } catch (error) {
      console.error(
        `Unexpected error marking lesson ${markLessonCompletedData.lessonId} complete for student ${studentId}:`,
        error,
      );
      throw new InternalServerErrorException(
        'An unexpected error occurred while marking the lesson as completed.',
      );
    }
  }
}
