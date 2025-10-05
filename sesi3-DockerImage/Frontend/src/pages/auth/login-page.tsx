import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import useLoginForm from "@/hooks/form/use-login-form";

export default function LoginPage() {
  const { formData, handleInputChange, handleSubmit } = useLoginForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center min-h-screen bg-background p-4"
    >
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Log in into your account</CardTitle>
          <CardDescription>Enter your details below to log in</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
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

          <Button type="submit" className="w-full mt-2">
            Login
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
