import React, { useState } from 'react';
import {
  Globe,
  Play,
  Square,
  ShieldCheck,
  Search,
  Filter,
  MoreVertical,
  Cookie,
  Copy,
  Trash2,
  ExternalLink,
  ChevronDown,
  CheckSquare,
  Sparkles,
  Layers,
  Clock,
  ArrowUpDown,
  Flame,
  Check
} from 'lucide-react';
import { BrowserProfile } from '../types';

interface ProfileListProps {
  profiles: BrowserProfile[];
  onLaunchProfile: (profile: BrowserProfile) => void;
  onDeleteProfile: (profileId: string) => void;
  onCloneProfile: (profile: BrowserProfile) => void;
  onWarmCookies: (profileIds: string[]) => void;
  onNewProfile: () => void;
}

export const ProfileList: React.FC<ProfileListProps> = ({
  profiles,
  onLaunchProfile,
  onDeleteProfile,
  onCloneProfile,
  onWarmCookies,
  onNewProfile,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const groups = ['all', ...Array.from(new Set(profiles.map((p) => p.group)))];

  const filteredProfiles = profiles.filter((p) => {
    const matchesGroup = selectedGroup === 'all' || p.group === selectedGroup;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.proxy && p.proxy.ip.includes(searchQuery)) ||
      (p.notes && p.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesGroup && matchesSearch;
  });

  const handleSelectAll = () => {
    if (selectedIds.length === filteredProfiles.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProfiles.map((p) => p.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBatchLaunch = () => {
    const target = profiles.find((p) => selectedIds.includes(p.id));
    if (target) {
      onLaunchProfile(target);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar with filters and controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center space-x-2">
            <span>Antidetect Browser Profiles</span>
            <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-bold text-indigo-300 border border-indigo-500/30">
              {filteredProfiles.length} Total
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Isolated browser environments with randomized Canvas, WebGL, Audio and WebRTC fingerprints.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onNewProfile}
            className="flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02]"
          >
            <span>+ Create Browser Profile</span>
          </button>
        </div>
      </div>

      {/* Group Tabs & Search Filtering */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        {/* Group pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          {groups.map((grp) => (
            <button
              key={grp}
              onClick={() => setSelectedGroup(grp)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                selectedGroup === grp
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
              }`}
            >
              {grp === 'all' ? 'All Profiles' : grp}
            </button>
          ))}
        </div>

        {/* Search inside section */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Filter profiles or proxies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-900/90 pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Batch Actions Floating Bar */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between rounded-xl border border-indigo-500/40 bg-indigo-950/40 px-4 py-2.5 text-xs text-indigo-200 animate-in fade-in">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white">{selectedIds.length} profiles selected</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleBatchLaunch}
              className="flex items-center space-x-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 text-white font-semibold transition-colors"
            >
              <Play className="h-3 w-3 fill-white" />
              <span>Launch Session</span>
            </button>

            <button
              onClick={() => onWarmCookies(selectedIds)}
              className="flex items-center space-x-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 px-3 py-1.5 text-amber-300 font-semibold transition-colors"
            >
              <Cookie className="h-3 w-3" />
              <span>Warm Cookies</span>
            </button>

            <button
              onClick={() => setSelectedIds([])}
              className="rounded-lg bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 text-slate-300 transition-colors"
            >
              Deselect
            </button>
          </div>
        </div>
      )}

      {/* Profiles Table */}
      <div className="rounded-2xl border border-slate-800/80 bg-[#12141e]/90 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#181a26] text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      filteredProfiles.length > 0 &&
                      selectedIds.length === filteredProfiles.length
                    }
                    onChange={handleSelectAll}
                    className="rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                </th>
                <th className="py-4 px-2">Profile Name &amp; Tags</th>
                <th className="py-4 px-3">Engine &amp; OS</th>
                <th className="py-4 px-3">Proxy / IP Location</th>
                <th className="py-4 px-3">Vault Cookies</th>
                <th className="py-4 px-3">Integrity Score</th>
                <th className="py-4 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProfiles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-500">
                    No browser profiles found matching "{searchQuery}"
                  </td>
                </tr>
              ) : (
                filteredProfiles.map((profile) => {
                  const isSelected = selectedIds.includes(profile.id);
                  return (
                    <tr
                      key={profile.id}
                      className={`group transition-colors ${
                        isSelected ? 'bg-indigo-950/20' : 'hover:bg-slate-800/40'
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(profile.id)}
                          className="rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                      </td>

                      {/* Profile Name & Group & Tags */}
                      <td className="py-4 px-2">
                        <div className="flex items-start space-x-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 flex-shrink-0 mt-0.5">
                            <Globe className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
                              {profile.name}
                            </div>
                            <div className="flex items-center space-x-1.5 mt-1 flex-wrap gap-y-1">
                              <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-300 font-medium border border-slate-700">
                                {profile.group}
                              </span>
                              {profile.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="rounded bg-indigo-950/40 px-1.5 py-0.5 text-[10px] text-indigo-300 border border-indigo-500/20"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            {profile.notes && (
                              <p className="text-[11px] text-slate-500 mt-1 line-clamp-1 max-w-xs">
                                {profile.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Engine & OS */}
                      <td className="py-4 px-3">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1.5">
                            <span className="rounded bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-300 border border-blue-500/30 uppercase">
                              {profile.fingerprint.browserEngine}
                            </span>
                            <span className="font-mono text-[11px] text-slate-300">
                              {profile.fingerprint.browserVersion.split(' ')[1] || 'v126'}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {profile.fingerprint.osVersion}
                          </div>
                        </div>
                      </td>

                      {/* Proxy */}
                      <td className="py-4 px-3">
                        {profile.proxy ? (
                          <div className="space-y-0.5">
                            <div className="flex items-center space-x-1.5">
                              <span className="font-mono font-semibold text-slate-200">
                                {profile.proxy.ip}
                              </span>
                              <span className="rounded bg-emerald-500/20 px-1 py-0.2 text-[9px] font-bold text-emerald-400">
                                {profile.proxy.countryCode}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {profile.proxy.city} • <span className="text-emerald-400 font-medium">{profile.proxy.pingMs}ms</span>
                            </div>
                          </div>
                        ) : (
                          <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-300 border border-amber-500/30 font-medium">
                            Direct / No Proxy
                          </span>
                        )}
                      </td>

                      {/* Cookies */}
                      <td className="py-4 px-3">
                        <div className="flex items-center space-x-1.5">
                          <Cookie className="h-3.5 w-3.5 text-amber-400" />
                          <span className="font-bold text-white">{profile.cookieCount}</span>
                          <span className="text-slate-400 text-[11px]">cookies</span>
                        </div>
                        <div className="text-[10px] text-emerald-400 mt-0.5">
                          {profile.storageSynced ? '✓ Cloud Synced' : 'Local Vault'}
                        </div>
                      </td>

                      {/* Antidetect Score */}
                      <td className="py-4 px-3">
                        <div className="flex items-center space-x-2">
                          <div className="h-2 w-14 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400"
                              style={{ width: `${profile.fingerprint.score}%` }}
                            />
                          </div>
                          <span className="font-mono font-bold text-emerald-400">
                            {profile.fingerprint.score}%
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          0 Leaks Detected
                        </div>
                      </td>

                      {/* Action buttons */}
                      <td className="py-4 px-3 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            id={`btn-launch-profile-${profile.id}`}
                            onClick={() => onLaunchProfile(profile)}
                            className="flex items-center space-x-1 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm shadow-indigo-600/30 transition-all hover:scale-105"
                          >
                            <Play className="h-3 w-3 fill-white" />
                            <span>Launch</span>
                          </button>

                          <div className="relative">
                            <button
                              onClick={() =>
                                setActiveMenuId(activeMenuId === profile.id ? null : profile.id)
                              }
                              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </button>

                            {activeMenuId === profile.id && (
                              <div className="absolute right-0 top-8 z-30 w-44 rounded-xl border border-slate-700 bg-[#161824] p-1.5 shadow-2xl text-xs space-y-1">
                                <button
                                  onClick={() => {
                                    onWarmCookies([profile.id]);
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full flex items-center space-x-2 rounded-lg px-2.5 py-1.5 text-slate-200 hover:bg-slate-800"
                                >
                                  <Cookie className="h-3.5 w-3.5 text-amber-400" />
                                  <span>Warm Cookies</span>
                                </button>
                                <button
                                  onClick={() => {
                                    onCloneProfile(profile);
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full flex items-center space-x-2 rounded-lg px-2.5 py-1.5 text-slate-200 hover:bg-slate-800"
                                >
                                  <Copy className="h-3.5 w-3.5 text-indigo-400" />
                                  <span>Duplicate Profile</span>
                                </button>
                                <div className="h-px bg-slate-800 my-1" />
                                <button
                                  onClick={() => {
                                    onDeleteProfile(profile.id);
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full flex items-center space-x-2 rounded-lg px-2.5 py-1.5 text-rose-400 hover:bg-rose-950/40"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  <span>Delete Profile</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
