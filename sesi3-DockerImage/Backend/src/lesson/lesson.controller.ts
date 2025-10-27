import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/interfaces/payload/jwt-payload';
import { LessonDTO } from './dto/lesson-dto';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @UseGuards(AuthGuard)
  @Get('course/:courseId')
  async getCourseLessonsWithStatus(
    @Req() req: Request,
    @Param('courseId', ParseIntPipe) courseId: number,
  ): Promise<LessonDTO[]> {
    const tokenPayload = req.user as JwtPayload;

    if (!tokenPayload || !tokenPayload.sub) {
      throw new InternalServerErrorException('User identification failed.');
    }
    const studentId = tokenPayload.sub;

    try {
      const lessons = await this.lessonService.getLessonsWithCompletionStatus(
        studentId,
        courseId,
      );
      return lessons;
    } catch (error) {
      console.error(
        `Failed to get lessons for course ${courseId} for student ${studentId}:`,
        error,
      );
      throw new InternalServerErrorException(
        'Could not retrieve lessons for the course.',
      );
    }
  }
}
