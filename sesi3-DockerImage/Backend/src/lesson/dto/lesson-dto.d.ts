import type { Lesson } from '@/lib/interfaces/models/lesson';

export interface LessonDTO extends Lesson {
  completed: boolean;
}
