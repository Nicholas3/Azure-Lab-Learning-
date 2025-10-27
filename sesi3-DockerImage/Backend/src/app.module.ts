import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { AssignmentModule } from './assignment/assignment.module';
import { LessonModule } from './lesson/lesson.module';
import { CompletedLessonModule } from './completed-lesson/completed-lesson.module';
import { SubmissionModule } from './submission/submission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    CourseModule,
    EnrollmentModule,
    AssignmentModule,
    LessonModule,
    CompletedLessonModule,
    SubmissionModule,
  ],
})
export class AppModule {}
