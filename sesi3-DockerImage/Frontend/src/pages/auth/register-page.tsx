import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useRegisterForm from "@/hooks/form/use-register-form";

export default function RegisterPage() {
  const { formData, handleInputChange, handleSelectChange, handleSubmit } =
    useRegisterForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center min-h-screen bg-background p-4"
    >
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="name">Name</label>
            <Input
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              placeholder="m@example.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              placeholder="********"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={handleSelectChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="TEACHER">Teacher</SelectItem>
                  <SelectItem value="STUDENT">Student</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full mt-2">
            Create Account
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
