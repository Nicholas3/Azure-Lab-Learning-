import {
  Controller,
  Get,
  InternalServerErrorException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentDTO } from './dto/enrollment-dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtPayload } from 'src/auth/interfaces/payload/jwt-payload';
import { Request } from 'express';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Get()
  async findAllEnrollments(): Promise<EnrollmentDTO[]> {
    try {
      const enrollments = await this.enrollmentService.getAllEnrollments();
      return enrollments;
    } catch (e) {
      throw new InternalServerErrorException(
        'Could not retrieve courses: ' + e,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('my-enrollments')
  async getUserEnrollments(@Req() req: Request): Promise<EnrollmentDTO[]> {
    const tokenPayload = req.user as JwtPayload;

    if (!tokenPayload || !tokenPayload.sub) {
      throw new InternalServerErrorException('User identification failed.');
    }
    try {
      const enrollments = await this.enrollmentService.getUserEnrollments(
        tokenPayload.sub,
      );
      return enrollments;
    } catch (e) {
      throw new InternalServerErrorException(
        'Could not retrieve courses: ' + e,
      );
    }
  }
}
