import React from 'react';
import {
  Globe,
  Smartphone,
  Cpu,
  Network,
  ShieldAlert,
  Settings,
  Terminal,
  Layers,
  Sparkles,
  Zap,
  HelpCircle
} from 'lucide-react';

export type NavigationTab = 'profiles' | 'cloud_phones' | 'tasks' | 'proxies' | 'fingerprints';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  browserProfilesCount: number;
  cloudPhonesCount: number;
  activeTasksCount: number;
  proxiesCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  browserProfilesCount,
  cloudPhonesCount,
  activeTasksCount,
  proxiesCount,
}) => {
  const navItems = [
    {
      id: 'profiles' as NavigationTab,
      label: 'Browser Profiles',
      description: 'Antidetect browser containers',
      icon: Globe,
      badge: browserProfilesCount,
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    },
    {
      id: 'cloud_phones' as NavigationTab,
      label: 'Cloud Phone',
      description: 'Virtual Android mobile matrix',
      icon: Smartphone,
      badge: cloudPhonesCount,
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    },
    {
      id: 'tasks' as NavigationTab,
      label: 'Task Automation',
      description: 'Cookie warmer & macro queue',
      icon: Zap,
      badge: activeTasksCount > 0 ? `${activeTasksCount} active` : undefined,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      id: 'proxies' as NavigationTab,
      label: 'Proxy Manager',
      description: 'SOCKS5, Residential & Mobile',
      icon: Network,
      badge: proxiesCount,
      badgeColor: 'bg-slate-700/60 text-slate-300 border-slate-600/40',
    },
    {
      id: 'fingerprints' as NavigationTab,
      label: 'Fingerprint & Audit',
      description: 'Canvas, WebGL & leak test',
      icon: ShieldAlert,
      badge: '100% Pass',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-800/80 bg-[#10121a] flex flex-col justify-between p-4 min-h-[calc(100vh-57px)]">
      <div className="space-y-6">
        {/* Main Section Navigation */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Workspace Engine
          </div>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full group flex items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all duration-150 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-900/40 via-indigo-800/20 to-transparent border-l-2 border-indigo-500 text-white font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'bg-slate-800/70 text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold leading-tight">{item.label}</div>
                      <div className="text-[10px] text-slate-500">{item.description}</div>
                    </div>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Antidetect Status Panel */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wide text-slate-300 uppercase">
              Fingerprint Guard
            </span>
            <span className="flex items-center space-x-1 text-[11px] font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>Protected</span>
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Canvas Masking:</span>
              <span className="text-slate-200 font-mono text-[11px]">Noise Level 3</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>WebGL Shader:</span>
              <span className="text-slate-200 font-mono text-[11px]">Spoofed Vendor</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>WebRTC Protection:</span>
              <span className="text-emerald-400 font-mono text-[11px]">0 Leaks</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>AudioContext:</span>
              <span className="text-slate-200 font-mono text-[11px]">Altered Buffer</span>
            </div>
          </div>

          <div className="pt-1 border-t border-slate-800">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Antidetect Trust Score</span>
              <span className="font-bold text-emerald-400">99.8%</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 w-[99%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
        <div className="flex items-center justify-between">
          <span className="text-[11px]">Multilogin Core Engine</span>
          <span className="text-[10px] font-mono text-slate-400">v6.4.1</span>
        </div>
        <div className="flex items-center space-x-2 text-[11px] text-slate-400 hover:text-slate-300 cursor-pointer">
          <Terminal className="h-3.5 w-3.5 text-indigo-400" />
          <span>Local REST API: port 35000</span>
        </div>
      </div>
    </aside>
  );
};
