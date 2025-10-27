import { Module } from '@nestjs/common';
import { CompletedLessonController } from './completed-lesson.controller';
import { CompletedLessonService } from './completed-lesson.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CompletedLessonController],
  providers: [CompletedLessonService],
})
export class CompletedLessonModule {}
