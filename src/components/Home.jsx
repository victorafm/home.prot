import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Tabs from "./Tabs";
import ModulePanel from "./ModulePanel";
import { useStore } from "../store";

export default function Home() {
  const modules = useStore(s => s.modules);

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <Tabs />
        <main className="p-6 bg-neutralBg flex-1 overflow-auto">
          <ModulePanel />
        </main>
      </div>
    </div>
  );
}
