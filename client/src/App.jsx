import { useEffect, useState } from "react";
import { TodoProvider } from "./context/TodoContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { checkHealth } from "./services/api";

function App() {
  const [serverStatus, setServerStatus] = useState("checking");

  useEffect(() => {
    const checkServer = async () => {
      try {
        await checkHealth();
        setServerStatus("connected");
      } catch (error) {
        console.error("Server connection failed:", error);
        setServerStatus("disconnected");
      }
    };

    checkServer();
    const interval = setInterval(checkServer, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <TodoProvider>
      {serverStatus === "disconnected" && (
        <div className="fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          ⚠️ Server is offline. Please check your connection.
        </div>
      )}

      {serverStatus === "connected" && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          ✓ Connected
        </div>
      )}

      <Home />
    </TodoProvider>
  );
}

export default App;
