import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./lib/router/app-routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./components/utils/toast-helper";
import { AuthProvider } from "./context/auth-context";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ToastProvider />
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
