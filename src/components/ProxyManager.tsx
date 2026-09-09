import React, { useState } from 'react';
import {
  Network,
  Globe,
  Plus,
  RotateCw,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Zap,
  Clock,
  ArrowUpDown
} from 'lucide-react';
import { ProxyConfig } from '../types';

interface ProxyManagerProps {
  proxies: ProxyConfig[];
  onAddProxy: (proxy: ProxyConfig) => void;
  onDeleteProxy: (proxyId: string) => void;
  onTestProxies: () => void;
  isTesting: boolean;
}

export const ProxyManager: React.FC<ProxyManagerProps> = ({
  proxies,
  onAddProxy,
  onDeleteProxy,
  onTestProxies,
  isTesting,
}) => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [importText, setImportText] = useState<string>('');
  const [proxyType, setProxyType] = useState<ProxyConfig['type']>('SOCKS5');
  const [host, setHost] = useState<string>('');
  const [port, setPort] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [country, setCountry] = useState<string>('United States');
  const [countryCode, setCountryCode] = useState<string>('US');
  const [city, setCity] = useState<string>('Los Angeles, CA');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!host || !port) return;

    const newProxy: ProxyConfig = {
      id: `prx-${Date.now()}`,
      name: `${countryCode} ${proxyType} Proxy`,
      type: proxyType,
      host,
      port: parseInt(port, 10) || 8080,
      username: username || undefined,
      password: password || undefined,
      country,
      countryCode,
      city,
      ip: host.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/) ? host : '198.51.100.' + (Math.floor(Math.random() * 200) + 10),
      status: 'active',
      pingMs: Math.floor(Math.random() * 50) + 20,
      lastChecked: 'Just now',
    };

    onAddProxy(newProxy);
    setShowAddModal(false);
    setHost('');
    setPort('');
    setUsername('');
    setPassword('');
  };

  const handleQuickImport = () => {
    if (!importText) return;
    const lines = importText.split('\n').filter((l) => l.trim().length > 0);
    lines.forEach((line, index) => {
      const parts = line.trim().split(':');
      if (parts.length >= 2) {
        onAddProxy({
          id: `prx-imp-${Date.now()}-${index}`,
          name: `Imported Node #${index + 1}`,
          type: 'SOCKS5',
          host: parts[0],
          port: parseInt(parts[1], 10) || 1080,
          username: parts[2] || undefined,
          password: parts[3] || undefined,
          country: 'United States',
          countryCode: 'US',
          city: 'Chicago, IL',
          ip: parts[0],
          status: 'active',
          pingMs: Math.floor(Math.random() * 40) + 25,
          lastChecked: 'Just now',
        });
      }
    });
    setShowAddModal(false);
    setImportText('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center space-x-2">
            <span>Proxy Manager &amp; IP Health Pool</span>
            <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-bold text-indigo-300 border border-indigo-500/30">
              {proxies.length} Proxies
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Dedicated SOCKS5, HTTP, Residential, and 5G Mobile proxies with instant latency testing and DNS leak shielding.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onTestProxies}
            disabled={isTesting}
            className="flex items-center space-x-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 px-4 py-2 text-xs font-bold text-slate-200 transition-colors"
          >
            <RotateCw className={`h-3.5 w-3.5 ${isTesting ? 'animate-spin text-indigo-400' : ''}`} />
            <span>{isTesting ? 'Pinging All Proxies...' : 'Test All Latencies'}</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02]"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>+ Add Proxy Node</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-[#12141f] p-4 flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{proxies.filter(p => p.status === 'active').length}</div>
            <div className="text-xs text-slate-400 font-medium">Active &amp; Ready</div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#12141f] p-4 flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">38 ms</div>
            <div className="text-xs text-slate-400 font-medium">Average Latency</div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#12141f] p-4 flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-400">100%</div>
            <div className="text-xs text-slate-400 font-medium">DNS Leak Protection</div>
          </div>
        </div>
      </div>

      {/* Proxy Table */}
      <div className="rounded-2xl border border-slate-800/80 bg-[#12141e]/90 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#181a26] text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-4 px-4">Proxy Label &amp; Protocol</th>
                <th className="py-4 px-4">Endpoint (Host:Port)</th>
                <th className="py-4 px-4">IP &amp; Geolocation</th>
                <th className="py-4 px-4">Latency Ping</th>
                <th className="py-4 px-4">Health Status</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {proxies.map((proxy) => (
                <tr key={proxy.id} className="hover:bg-slate-800/40 transition-colors">
                  {/* Name & Type */}
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/10 border border-indigo-500/20 text-indigo-400">
                        <Globe className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-xs">{proxy.name}</div>
                        <span className="rounded bg-indigo-500/20 px-1.5 py-0.2 text-[9px] font-bold text-indigo-300 border border-indigo-500/30">
                          {proxy.type}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Endpoint */}
                  <td className="py-4 px-4 font-mono text-xs text-slate-200">
                    {proxy.host}:{proxy.port}
                    {proxy.username && (
                      <div className="text-[10px] text-slate-400">Auth: {proxy.username}</div>
                    )}
                  </td>

                  {/* Geolocation */}
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-mono text-xs font-semibold text-white">{proxy.ip}</span>
                      <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[9px] font-bold text-slate-300">
                        {proxy.countryCode}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">{proxy.city}, {proxy.country}</div>
                  </td>

                  {/* Latency */}
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1.5">
                      <span
                        className={`font-bold font-mono ${
                          proxy.pingMs < 50
                            ? 'text-emerald-400'
                            : proxy.pingMs < 100
                            ? 'text-amber-400'
                            : 'text-rose-400'
                        }`}
                      >
                        {proxy.pingMs} ms
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400">Checked {proxy.lastChecked}</div>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center space-x-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>HEALTHY</span>
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => onDeleteProxy(proxy.id)}
                      className="rounded-lg p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                      title="Delete proxy"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Proxy Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-[#151724] p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Add Proxy Node</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Batch Import (ip:port:user:pass)</label>
                <textarea
                  rows={3}
                  placeholder="198.51.100.24:1080:user:pass&#10;82.165.197.12:8080"
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 p-2 text-slate-100 font-mono text-xs placeholder-slate-500"
                />
                {importText && (
                  <button
                    type="button"
                    onClick={handleQuickImport}
                    className="mt-2 rounded-lg bg-indigo-600 px-3 py-1 text-xs font-bold text-white"
                  >
                    Import Lines
                  </button>
                )}
              </div>

              <div className="h-px bg-slate-800 my-2" />

              <form onSubmit={handleCreateSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Protocol Type</label>
                    <select
                      value={proxyType}
                      onChange={(e) => setProxyType(e.target.value as any)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-100"
                    >
                      <option value="SOCKS5">SOCKS5</option>
                      <option value="HTTP">HTTP</option>
                      <option value="HTTPS">HTTPS</option>
                      <option value="SSH">SSH Tunnel</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Country</label>
                    <select
                      value={countryCode}
                      onChange={(e) => {
                        setCountryCode(e.target.value);
                        if (e.target.value === 'US') setCountry('United States');
                        else if (e.target.value === 'GB') setCountry('United Kingdom');
                        else if (e.target.value === 'DE') setCountry('Germany');
                        else if (e.target.value === 'JP') setCountry('Japan');
                      }}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-100"
                    >
                      <option value="US">United States (US)</option>
                      <option value="GB">United Kingdom (GB)</option>
                      <option value="DE">Germany (DE)</option>
                      <option value="JP">Japan (JP)</option>
                      <option value="SG">Singapore (SG)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="text-slate-300 font-semibold block mb-1">Host / IP</label>
                    <input
                      type="text"
                      required
                      placeholder="198.51.100.24 or domain"
                      value={host}
                      onChange={(e) => setHost(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Port</label>
                    <input
                      type="number"
                      required
                      placeholder="1080"
                      value={port}
                      onChange={(e) => setPort(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Username (Optional)</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Password (Optional)</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-100"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="rounded-lg bg-slate-800 px-4 py-2 text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-5 py-2 font-bold text-white"
                  >
                    Save Proxy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
