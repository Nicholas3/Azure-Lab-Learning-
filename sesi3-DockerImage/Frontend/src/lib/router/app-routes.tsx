import AdminDashboard from "@/pages/admin/admin-dashboard";
import LoginPage from "@/pages/auth/login-page";
import RegisterPage from "@/pages/auth/register-page";
import StudentCourseDetails from "@/pages/student/student-course-details";
import StudentDashboard from "@/pages/student/student-dashboard";
import TeacherDashboard from "@/pages/teacher/teacher-dashboard";
import { Route, Routes } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route
        path="/student/courses/:courseId"
        element={<StudentCourseDetails />}
      />

      <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}
