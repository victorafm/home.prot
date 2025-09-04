import React from "react";
import { useStore } from "../store";

function Icon({ name, className = "w-5 h-5" }) {
  // very tiny icon set: home, shopping, headset, chart, users, activity, file
  switch (name) {
    case "home":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
        </svg>
      );
    case "shopping":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M6 2l1 4h10l1-4" />
          <path d="M6 6h12l-1 12H7L6 6z" />
          <circle cx="9" cy="20" r="1" />
          <circle cx="18" cy="20" r="1" />
        </svg>
      );
    case "headset":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M3 13v-2a9 9 0 0 1 18 0v2" />
          <path d="M5 13v5a2 2 0 0 0 2 2h1v-7H5z" />
          <path d="M19 13v5a2 2 0 0 1-2 2h-1v-7h3z" />
        </svg>
      );
    case "chart":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M3 3v18h18" />
          <path d="M7 13v6" />
          <path d="M12 7v12" />
          <path d="M17 10v9" />
        </svg>
      );
    case "users":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H7" />
          <circle cx="9" cy="7" r="4" />
          <path d="M21 21v-2a4 4 0 0 0-3-3" />
        </svg>
      );
    case "activity":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M3 12h3l3 8 4-16 3 8h4" />
        </svg>
      );
    case "file":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
        </svg>
      );
    default:
      return <svg className={className}></svg>;
  }
}

export default function Sidebar() {
  const modules = useStore((s) => s.modules);
  const collapsed = useStore((s) => s.sidebarCollapsed);
  const toggle = useStore((s) => s.toggleSidebar);
  const selected = useStore((s) => s.selectedModuleId);
  const setSelected = useStore((s) => s.setSelectedModule);

  return (
    <aside
      className={`bg-white border-r ${
        collapsed ? "w-16" : "w-64"
      } transition-all duration-200 flex flex-col`}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center justify-center text-white`}
          >
            <img
              src={collapsed ? "/aniel-logo.png" : "/aniel.png"}
              alt="Aniel"
              className={`object-contain ${collapsed ? "w-10 h-10" : "w-44 h-8"}`}
            />
          </div>
        </div>
        <button onClick={toggle} className="text-sm p-1">
          {collapsed ? "»" : "«"}
        </button>
      </div>

      <nav className="flex-1 overflow-auto">
        {modules.map((m) => (
          <div
            key={m.id}
            onClick={() => setSelected(m.id)}
            className={`cursor-pointer flex items-center gap-3 p-3 hover:bg-neutralBg ${
              selected === m.id ? "bg-neutralBg/60" : ""
            }`}
          >
            <Icon name={m.icon} />
            {!collapsed && <span>{m.nome}</span>}
          </div>
        ))}
      </nav>
    </aside>
  );
}
