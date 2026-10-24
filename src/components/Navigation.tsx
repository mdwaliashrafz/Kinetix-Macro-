import React from 'react';
import { soundFx } from '../utils/audio';

export type TabType = 'dash' | 'log' | 'analytics' | 'recipes';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'dash', label: 'Dash', icon: 'dashboard' },
    { id: 'log', label: 'Log', icon: 'add_circle' },
    { id: 'analytics', label: 'Analytics', icon: 'query_stats' },
    { id: 'recipes', label: 'Recipes', icon: 'menu_book' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-[#0a0e13]/90 backdrop-blur-xl border-t border-[#1c2025] shadow-[0_-2px_16px_rgba(0,0,0,0.6)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-18 px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                soundFx.playClick();
                onTabChange(tab.id);
              }}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-2 rounded-xl transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'text-[#10f984] [filter:drop-shadow(0_0_8px_rgba(16,249,132,0.45))] scale-105'
                  : 'text-[#849585] hover:text-[#e0e2ea] active:scale-95'
              }`}
            >
              <span
                className="material-symbols-outlined text-[24px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {tab.icon}
              </span>
              <span className="font-['JetBrains_Mono'] text-[10px] font-semibold tracking-wider uppercase mt-0.5">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
