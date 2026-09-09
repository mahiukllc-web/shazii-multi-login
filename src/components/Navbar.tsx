import React from 'react';
import { 
  ShieldCheck, 
  Globe, 
  Smartphone, 
  Play, 
  Plus, 
  Search, 
  Wifi, 
  Cpu, 
  Layers,
  ChevronDown,
  Bell,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  activeSessionsCount: number;
  totalProfilesCount: number;
  cloudPhonesCount: number;
  proxiesOnlineCount: number;
  onNewProfile: () => void;
  onNewCloudPhone: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSessionsCount,
  totalProfilesCount,
  cloudPhonesCount,
  proxiesOnlineCount,
  onNewProfile,
  onNewCloudPhone,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-800/80 bg-[#12141c]/95 px-6 py-3 backdrop-blur-md">
      {/* Brand & Workspace */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-500 shadow-lg shadow-indigo-500/20">
            <ShieldCheck className="h-6 w-6 text-white" />
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-[#12141c]">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-extrabold tracking-tight text-white">MULTILOGIN</span>
              <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-indigo-400 border border-indigo-500/30">
                ENTERPRISE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Antidetect Browser &amp; Cloud Phone</p>
          </div>
        </div>

        {/* Workspace dropdown badge */}
        <div className="hidden lg:flex items-center space-x-2 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300">
          <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
          <span className="font-medium text-slate-200">Agency Alpha Ops</span>
          <span className="text-slate-500 text-[11px]">• 5 Members</span>
          <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            id="global-search-input"
            type="text"
            placeholder="Search profiles, proxies, tags, or phone models..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-900/80 pl-9 pr-4 py-1.5 text-sm text-slate-200 placeholder-slate-500 transition-all focus:border-indigo-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Metrics & Action Buttons */}
      <div className="flex items-center space-x-3">
        {/* Status Pills */}
        <div className="hidden xl:flex items-center space-x-2 rounded-lg border border-slate-800/80 bg-slate-900/40 p-1">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 text-xs text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-white">{activeSessionsCount}</span>
            <span className="text-slate-400 text-[11px]">Active</span>
          </div>

          <div className="h-3 w-px bg-slate-800" />

          <div className="flex items-center space-x-1.5 px-2.5 py-1 text-xs text-slate-300">
            <Smartphone className="h-3.5 w-3.5 text-cyan-400" />
            <span className="font-semibold text-white">{cloudPhonesCount}</span>
            <span className="text-slate-400 text-[11px]">Phones</span>
          </div>

          <div className="h-3 w-px bg-slate-800" />

          <div className="flex items-center space-x-1.5 px-2.5 py-1 text-xs text-slate-300">
            <Globe className="h-3.5 w-3.5 text-indigo-400" />
            <span className="font-semibold text-white">{proxiesOnlineCount}</span>
            <span className="text-slate-400 text-[11px]">Proxies</span>
          </div>
        </div>

        {/* Action Buttons */}
        <button
          id="btn-new-cloud-phone"
          onClick={onNewCloudPhone}
          className="flex items-center space-x-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/40 hover:bg-cyan-900/50 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition-colors shadow-sm"
        >
          <Smartphone className="h-3.5 w-3.5 text-cyan-400" />
          <span>+ Cloud Phone</span>
        </button>

        <button
          id="btn-new-browser-profile"
          onClick={onNewProfile}
          className="flex items-center space-x-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 transition-all hover:shadow-indigo-600/50"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Profile</span>
        </button>
      </div>
    </header>
  );
};
