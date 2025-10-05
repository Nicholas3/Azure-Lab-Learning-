export enum Role {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  ADMIN = "ADMIN",
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  profileImageUrl: string;
}
