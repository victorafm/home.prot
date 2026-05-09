import React from "react";
import { useStore } from "../store";
import TableMock from "./TableMock";
import { FaCubes } from "react-icons/fa";
import CadastroVenda from "../pages/comercial/CadastroVenda"; // 👈 novo import

export default function ModulePanel() {
  const activeTabId = useStore((s) => s.activeTabId);
  const tabs = useStore((s) => s.tabs);
  const modules = useStore((s) => s.modules);
  const openOptionTab = useStore((s) => s.openOptionTab);
  const showAllTabs = useStore((s) => s.showAllTabs);
  const selectedModuleId = useStore((s) => s.selectedModuleId);

  // ---------- HOME GRID ----------
  if (selectedModuleId === "home" || !activeTabId) {
    return <HomeGrid />;
  }

  // ---------- FILTRAGEM DE ABAS ----------
  const filteredTabs = showAllTabs
    ? tabs
    : tabs.filter(
        (t) =>
          t.moduleId === selectedModuleId ||
          t.id.startsWith(`module:${selectedModuleId}`)
      );

  const tab = filteredTabs.find((t) => t.id === activeTabId) || filteredTabs[0];
  if (!tab) return <div>Nenhuma aba ativa</div>;

  const module = modules.find((m) => m.id === tab.moduleId);

  // ---------- ABA DINÂMICA (sem estar no JSON) ----------
  if (tab.option?.isDynamic) {
    if (tab.option.nome === "Cadastro de Venda") {
      return <CadastroVenda />; // 👈 renderiza a página específica
    }
    return <div>Página dinâmica não mapeada</div>;
  }

  // ---------- MODULE TAB ----------
  if (tab.type === "module") {
    return (
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold">{module.nome}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {module.opcoes.map((o) => (
            <div
              key={o.id}
              className="bg-white/90 p-6 rounded shadow cursor-pointer hover:shadow-lg transition flex flex-col items-center justify-center"
              onClick={() => openOptionTab(module.id, o)}
            >
              <FaCubes />
              <div className="text-lg font-semibold mb-2">{o.nome}</div>
              <div className="text-sm text-gray-500">Clique para acessar</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ---------- OPTION TAB ----------
  if (tab.type === "option") {
    const option = module.opcoes.find((o) => o.id === tab.optionId);

    return (
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">{option.nome}</h2>
<div className="flex items-center justify-between mb-6">
  <div>
    <h2 className="text-2xl font-bold">{option?.nome || 'Carregando...'}</h2>
    {module?.nome && option?.nome && (
      <div className="text-sm text-gray-500">
        {module.nome} • {option.nome}
      </div>
    )}
  </div>
</div>

          </div>

          {/* Botão “+ Novo” só no Painel de Vendas */}
          {option.id === "painel-vendas" && (
            <button
              className="px-4 py-2 rounded bg-anielBlue text-white hover:bg-blue-700 transition"
              onClick={() => {
                // Cria uma tab dinâmica (não está no JSON)
                openOptionTab(module.id, {
                  id: `cadastro-venda-${Date.now()}`, // id único
                  nome: "Cadastro de Venda",
                  icon: "file",
                  isDynamic: true, // flag para diferenciar
                  type: "dynamic",
                });
              }}
            >
              + Novo
            </button>
          )}
        </div>

        {/* Conteúdo padrão do Painel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded shadow">
            <div className="font-semibold mb-1">Card de Exemplo</div>
            <div className="text-sm text-gray-500">Ações rápidas</div>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <div className="font-semibold mb-1">Card 2</div>
            <div className="text-sm text-gray-500">Outro atalho</div>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <div className="font-semibold mb-1">Card 3</div>
            <div className="text-sm text-gray-500">Relatório</div>
          </div>
        </div>

        {/* Tabela de exemplo */}
        <TableMock title={`${option.nome} — Tabela de Exemplo`} />
      </div>
    );
  }

  return <div>Render não implementado</div>;
}

// ---------- HOME GRID COMPONENT ----------
function HomeGrid() {
  const modules = useStore((s) => s.modules);
  const setSelected = useStore((s) => s.setSelectedModule);

  return (
    <div className="relative flex-1 flex">
      {/* Background */}
      <div className="absolute inset-0 h-fit">
        <img
          src="/background.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55"></div>
      </div>

      {/* Conteúdo */}
      <div className="relative flex-1 flex flex-col p-6">
        <div className="mb-8 bg-neutralBg p-6 rounded shadow text-center">
          <img
            src="/aniel.png"
            alt="Logo"
            className="w-44 object-contain mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 flex-1">
          {modules
            .filter((m) => m.id !== "home")
            .map((m) => (
              <div
                key={m.id}
                className="bg-neutralBg p-6 rounded shadow cursor-pointer hover:shadow-lg transition aspect-square flex flex-col items-center justify-center"
                onClick={() => setSelected(m.id)}
              >
                <FaCubes size={24} />
                <div className="text-xl font-semibold mb-2">{m.nome}</div>
                <div className="text-sm text-gray-500">Clique para abrir</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
