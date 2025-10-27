import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/interfaces/payload/jwt-payload';
import { UpcomingAssignmentsDTO } from './dto/upcoming-assignments-dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AssignmentDTO } from './dto/assignment-dto';

@Controller('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @UseGuards(AuthGuard)
  @Get('my-upcoming-assignments')
  async getUserEnrollments(
    @Req() req: Request,
  ): Promise<UpcomingAssignmentsDTO> {
    const tokenPayload = req.user as JwtPayload;

    if (!tokenPayload || !tokenPayload.sub) {
      throw new InternalServerErrorException('User identification failed.');
    }
    try {
      const assignmentCount =
        await this.assignmentService.getUpcomingAssignmentsCount(
          tokenPayload.sub,
        );
      return assignmentCount;
    } catch (e) {
      throw new InternalServerErrorException(
        'Could not retrieve courses: ' + e,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('my-course-assignments/:courseId')
  async getUserCourseAssignments(
    @Req() req: Request,
    @Param('courseId', ParseIntPipe) courseId: number,
  ): Promise<AssignmentDTO[]> {
    const tokenPayload = req.user as JwtPayload;

    if (!tokenPayload || !tokenPayload.sub) {
      throw new InternalServerErrorException('User identification failed.');
    }
    try {
      const assignments = await this.assignmentService.getAssignmentsWithStatus(
        tokenPayload.sub,
        courseId,
      );
      return assignments;
    } catch (e) {
      throw new InternalServerErrorException(
        'Could not retrieve courses: ' + e,
      );
    }
  }
}
