export interface Assignment {
  id: number;
  courseId: number;
  title: string;
  description: string | null;
  createdAt: Date;
  dueDate: Date | null;
}
