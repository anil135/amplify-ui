import { useEffect, useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");

    if (code) {
      // TEMPORARY
      // In production exchange code for tokens via backend
      localStorage.setItem("loggedIn", "true");

      window.history.replaceState({}, document.title, "/");

      setAuthenticated(true);
    } else {
      const loggedIn = localStorage.getItem("loggedIn");

      if (loggedIn) {
        setAuthenticated(true);
      }
    }
  }, []);

  return authenticated ? <Dashboard /> : <Login />;
}
