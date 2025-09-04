import React from "react";
import { useStore } from "./store";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";

export default function App() {
  const loggedIn = useStore(state => state.loggedIn);
  const firstAccessCompleted = useStore(state => state.firstAccessCompleted);

  if(!loggedIn || !firstAccessCompleted) {
    // Always show login and force first access in protótipo
    return <LoginPage />;
  }

  return <Home />;
}
