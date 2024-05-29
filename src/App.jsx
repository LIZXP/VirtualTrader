import { AuthProvider } from "./Common/AuthContext/AuthContext";
import AppRoutes from "./Common/routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App
