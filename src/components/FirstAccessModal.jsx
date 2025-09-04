import React, { useState } from "react";
import { useStore } from "../store";

export default function FirstAccessModal({ onDone }) {
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const completeFirstAccess = useStore(state => state.completeFirstAccess);

  const handleSubmit = (e) => {
    e?.preventDefault();
    // no validation required per spec
    completeFirstAccess();
    onDone(pwd);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded shadow w-96">
        <h3 className="text-lg font-semibold mb-4">Primeiro Acesso — cadastre sua senha</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input placeholder="Senha" className="w-full border rounded px-3 py-2" type="password" value={pwd} onChange={e=>setPwd(e.target.value)} />
          <input placeholder="Confirmar senha" className="w-full border rounded px-3 py-2" type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} />
          <div className="flex justify-end gap-2">
            <button type="button" className="px-3 py-1 rounded border" onClick={()=>onDone(null)}>Pular</button>
            <button type="submit" className="px-4 py-2 rounded bg-anielBlue text-white">Confirmar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
