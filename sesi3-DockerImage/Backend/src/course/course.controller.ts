import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CourseDTO } from './dto/course-dto';
import { CourseService } from './course.service';
import { CourseDetailDTO } from './dto/course-detail-dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/interfaces/payload/jwt-payload';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async findAll(): Promise<CourseDTO[]> {
    try {
      const courses = await this.courseService.getCourses();
      return courses;
    } catch (e) {
      throw new InternalServerErrorException(
        'Could not retrieve courses: ' + e,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('details/:courseId')
  async getCourseDetail(
    @Req() req: Request,
    @Param('courseId', ParseIntPipe) courseId: number,
  ): Promise<CourseDetailDTO> {
    const tokenPayload = req.user as JwtPayload;

    if (!tokenPayload || !tokenPayload.sub) {
      throw new InternalServerErrorException('User identification failed.');
    }
    try {
      const course = await this.courseService.getCourseDetail(
        courseId,
        tokenPayload.sub,
      );
      return course;
    } catch (e) {
      throw new InternalServerErrorException(
        'Could not retrieve courses: ' + e,
      );
    }
  }
}
