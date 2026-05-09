import React, { useEffect } from "react";
import { useStore } from "../../store";

export default function CadastroVenda() {
  const setActiveContext = useStore((s) => s.setActiveContext);

  useEffect(() => {
    // Define o contexto ativo na store (módulo e opção atuais)
    setActiveContext({
      module: { id: "comercial", nome: "Comercial" },
      option: { id: "cadastro-venda", nome: "Cadastro de Venda" },
    });
  }, [setActiveContext]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Venda</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Cliente</label>
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Nome do cliente"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Plano</label>
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Plano contratado"
          />
        </div>
        <div className="md:col-span-2 text-right">
          <button className="bg-anielBlue text-white px-6 py-2 rounded hover:bg-blue-700">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
