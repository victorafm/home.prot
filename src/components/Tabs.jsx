import React, { useRef } from "react";
import { useStore } from "../store";

export default function Tabs(){
  const tabs = useStore(s => s.tabs);
  const active = useStore(s => s.activeTabId);
  const setActive = useStore(s => s.setActiveTab);
  const closeTab = useStore(s => s.closeTab);
  const closeAll = useStore(s => s.closeAllTabs);
  const store = useStore;

  const containerRef = useRef();

  return (
    <div className="bg-white border-b">
      <div className="flex items-center p-2">
        <div className="flex-1 overflow-hidden">
          <div ref={containerRef} className="flex gap-2 overflow-x-auto no-scrollbar">
            {tabs.map(t => (
              <div key={t.id}
                   onClick={() => setActive(t.id)}
                   className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer ${active===t.id ? "bg-anielBlue text-white" : "bg-white"}`}>
                <div className="w-4 h-4 bg-neutralBg rounded flex items-center justify-center text-xs">{t.type==="module" ? "M" : "O"}</div>
                <div className="whitespace-nowrap">{t.title}</div>
                <button onClick={(e)=>{ e.stopPropagation(); closeTab(t.id); }} className="ml-2">×</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
