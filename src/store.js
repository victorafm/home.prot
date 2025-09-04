import create from "zustand";
import modulesData from "./data/modules.json";

export const useStore = create((set, get) => ({
  // ------------------- AUTH -------------------
  loggedIn: false,
  user: null,
  firstAccessCompleted: false,

  // ------------------- UI -------------------
  sidebarCollapsed: false,
  selectedModuleId: "home",
  modules: modulesData,

  // tabs: array of { id, title, type: 'module'|'option', moduleId, optionId? }
  tabs: [],
  activeTabId: null,

  // ------------------- PREFS -------------------
  showAllTabs: true, // true = todos | false = modular
  statusOnline: true, // true = online | false = offline

  setShowAllTabs: (val) =>
    set((state) => {
      state.showAllTabs = val;

      // visão modular → mantém só abas do módulo selecionado
      if (!val) {
        const selected = state.selectedModuleId;
        const tabs = state.tabs.filter(
          (t) =>
            t.moduleId === selected || t.id.startsWith(`module:${selected}`)
        );
        return { tabs, showAllTabs: val };
      }

      // visão todas → mantém todas as abas
      return { showAllTabs: val };
    }),

  setStatusOnline: (val) => set(() => ({ statusOnline: val })),

  // ------------------- NOTIFICATIONS (mock) -------------------
  notifications: [
    { id: "n1", moduleId: "comercial", text: "Nova venda registrada" },
    { id: "n2", moduleId: "atendimento", text: "Novo chamado recebido" },
  ],

  // ------------------- ACTIONS -------------------
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  // ------------------- SELEÇÃO DE MÓDULO -------------------
  setSelectedModule: (id) => {
    const setInternal = get().setSelectedModuleInternal;
    setInternal(id);
  },

  setSelectedModuleInternal: (id) =>
    set((state) => {
      if (id === "home") {
        return {
          selectedModuleId: "home",
          tabs: [],
          activeTabId: null,
        };
      }

      const modules = state.modules;
      const modExists = modules.find((m) => m.id === id);
      let tabs = [...state.tabs];
      let activeTabId = state.activeTabId;

      if (modExists) {
        const moduleTabId = `module:${id}`;
        let moduleTab = tabs.find((t) => t.id === moduleTabId);

        if (!moduleTab) {
          moduleTab = {
            id: moduleTabId,
            title: modExists.nome,
            type: "module",
            moduleId: id,
          };
          tabs.push(moduleTab);
        }

        activeTabId = moduleTab.id;

        if (!state.showAllTabs) {
          tabs = tabs.filter((t) => t.moduleId === id || t.id === moduleTabId);
        }
      }

      return {
        selectedModuleId: id,
        tabs,
        activeTabId,
      };
    }),

  // ------------------- ABRIR OPÇÃO -------------------
  openOptionTab: (moduleId, option) =>
    set((state) => {
      const tabId = `option:${moduleId}:${option.id}`;
      let tabs = [...state.tabs];

      if (!tabs.find((t) => t.id === tabId)) {
        tabs.push({
          id: tabId,
          title: option.nome,
          type: "option",
          moduleId,
          optionId: option.id,
        });
      }

      // visão modular → mantém só abas do módulo
      if (!state.showAllTabs) {
        tabs = tabs.filter(
          (t) =>
            t.moduleId === moduleId || t.id.startsWith(`module:${moduleId}`)
        );
      }

      return {
        tabs,
        activeTabId: tabId,
        selectedModuleId: moduleId,
      };
    }),

  // ------------------- TABS -------------------
  setActiveTab: (tabId) => set(() => ({ activeTabId: tabId })),

  closeTab: (tabId) =>
    set((state) => {
      const tabs = state.tabs.filter((t) => t.id !== tabId);
      let active = state.activeTabId;
      if (active === tabId) {
        active = tabs.length ? tabs[tabs.length - 1].id : null;
      }
      return { tabs, activeTabId: active };
    }),

  closeAllTabs: () => set(() => ({ tabs: [], activeTabId: null })),

  // ------------------- NOTIFICAÇÕES -------------------
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  // ------------------- AUTH FLOW -------------------
  login: (username) =>
    set(() => ({
      loggedIn: true,
      user: { name: username },
      firstAccessCompleted: false,
    })),

  completeFirstAccess: () => set(() => ({ firstAccessCompleted: true })),

  logout: () =>
    set(() => ({
      loggedIn: false,
      user: null,
      tabs: [],
      activeTabId: null,
      selectedModuleId: "home",
    })),
}));
