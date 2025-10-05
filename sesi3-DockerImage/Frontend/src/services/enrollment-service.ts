import apiClient from "@/lib/api/api-client";
import { EnrollmentDTO } from "@/lib/interfaces/dtos/response/enrollment-dto";

async function getUserEnrollments() {
  return await apiClient.get<EnrollmentDTO[]>("/enrollment/my-enrollments");
}

export { getUserEnrollments };
