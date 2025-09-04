import React, { useState } from "react";
import { useStore } from "../store";
import FirstAccessModal from "./FirstAccessModal";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showFirstAccess, setShowFirstAccess] = useState(false);
  const login = useStore(state => state.login);
  const completeFirstAccess = useStore(state => state.completeFirstAccess);
  const firstAccessCompleted = useStore(state => state.firstAccessCompleted);

  const handleLogin = (e) => {
    e?.preventDefault();
    // protótipo: qualquer login abre modal de primeiro acesso (se ainda não completado)
    login(username || "user@aniel");
    setShowFirstAccess(true);
  };

  const handleFirstAccessDone = (pwd) => {
    completeFirstAccess();
    setShowFirstAccess(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Área da imagem - ocupa 3/4 */}
      <div className="w-3/4 h-screen">
        <img
          src="/background.png"
          alt="Login Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Container do login - ocupa 1/4 fixo */}
      <div className="w-1/4 h-screen flex items-center justify-center bg-white">
        <div className="w-full max-w-sm p-6">
          <div className="mb-6 text-center">
            <img src="/aniel.png" alt="Aniel ERP" className="mx-auto w-86" />
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Usuário"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Senha"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-anielBlue text-white px-4 py-2 rounded"
              >
                Entrar
              </button>
              <div className="text-sm">
                <button type="button" className="text-anielRed">
                  Redefinir senha
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {showFirstAccess && !firstAccessCompleted && (
        <FirstAccessModal
          onDone={handleFirstAccessDone}
          onClose={() => setShowFirstAccess(false)}
        />
      )}
    </div>
  );
}
