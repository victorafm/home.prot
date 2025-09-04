import React, { useState, useEffect, useRef } from "react";
import { useStore } from "../store";
import { FaUser, FaPlus, FaBell } from "react-icons/fa";

// ----------------------------- TOGGLE COMPONENT -----------------------------
function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
        checked ? "bg-anielBlue" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
}

// ----------------------------- PROFILE DROPDOWN -----------------------------
function ProfileDropdown({ onLogout }) {
  const [open, setOpen] = useState(false);
  const showAll = useStore((s) => s.showAllTabs);
  const setShowAll = useStore((s) => s.setShowAllTabs);
  const statusOnline = useStore((s) => s.statusOnline);
  const setStatusOnline = useStore((s) => s.setStatusOnline);

  const ref = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="px-2 py-1"
      >
        <FaUser size={24} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border p-3 rounded shadow z-50">
          <button
            className="w-full text-left p-2 hover:bg-neutralBg"
            onClick={onLogout}
          >
            Sair
          </button>

          <div className="border-t my-2" />

          <div className="p-2 flex items-center justify-between">
            <span className="text-sm">Status</span>
            <Toggle checked={statusOnline} onChange={setStatusOnline} />
          </div>

          <div className="border-t my-2" />

          <div className="p-2 flex items-center justify-between">
            <span className="text-sm">Visualização</span>
            <Toggle checked={showAll} onChange={setShowAll} />
          </div>

          <div className="text-xs text-gray-500 text-right pr-2">
            {showAll ? "Todas" : "Modular"}
          </div>
        </div>
      )}
    </div>
        
  );
  
}

// ------------------------- NOTIFICATIONS DROPDOWN -------------------------
function NotificationsDropdown() {
  const notifs = useStore((s) => s.notifications);
  const mark = useStore((s) => s.markNotificationRead);
  const modules = useStore((s) => s.modules);
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const getModuleIcon = (id) => modules.find((m) => m.id === id)?.icon || "H";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        className="px-3 py-1"
        onClick={() => setOpen(!open)}
      >
        <FaBell size={24} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white border p-2 rounded shadow z-50">
          <div className="font-semibold mb-2">Notificações</div>
          {notifs.length === 0 && (
            <div className="text-sm text-gray-500">Sem notificações</div>
          )}
          {notifs.map((n) => (
            <div
              key={n.id}
              className="flex items-center justify-between p-2 hover:bg-neutralBg rounded"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-neutralBg rounded flex items-center justify-center text-sm">
                  {getModuleIcon(n.moduleId)[0]}
                </div>
                <div>{n.text}</div>
              </div>
              <button
                onClick={() => mark(n.id)}
                className="text-sm text-anielBlue"
              >
                Marcar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --------------------------- QUICK CREATE DROPDOWN ---------------------------
function QuickCreate() {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1 "
      >
        <FaPlus size={24} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border p-2 rounded shadow z-50">
          <div className="p-2 hover:bg-neutralBg cursor-pointer">Venda</div>
          <div className="p-2 hover:bg-neutralBg cursor-pointer">Atendimento</div>
          <div className="p-2 hover:bg-neutralBg cursor-pointer">
            Ordem de Serviço
          </div>
          <div className="p-2 hover:bg-neutralBg cursor-pointer">Cliente</div>
        </div>
      )}
    </div>
  );
}

// ------------------------------- TOPBAR -------------------------------------
export default function Topbar() {
  const logout = useStore((s) => s.logout);

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center gap-4">
      </div>

      <div className="flex items-center gap-3">
        <QuickCreate />
        <NotificationsDropdown />
        <ProfileDropdown onLogout={logout} />
      </div>
    </header>
  );
}
