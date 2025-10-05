export interface Course {
  id: number;
  title: string;
  description: string | null;
  image: string;
  teacherId: number | null;
  teacher?: User;
}
