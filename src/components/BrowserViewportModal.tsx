import React, { useState, useEffect } from 'react';
import {
  X,
  Minus,
  Square,
  RotateCw,
  ArrowLeft,
  ArrowRight,
  Lock,
  ShieldCheck,
  Globe,
  Terminal,
  Cookie,
  Layers,
  Sparkles,
  ExternalLink,
  Code,
  CheckCircle2,
  AlertTriangle,
  Play,
  Share2
} from 'lucide-react';
import { BrowserProfile } from '../types';

interface BrowserViewportModalProps {
  profile: BrowserProfile;
  onClose: () => void;
  onUpdateCookiesCount?: (count: number) => void;
}

export const BrowserViewportModal: React.FC<BrowserViewportModalProps> = ({
  profile,
  onClose,
  onUpdateCookiesCount,
}) => {
  const [currentUrl, setCurrentUrl] = useState<string>('https://pixelscan.net/antidetect-audit');
  const [urlInput, setUrlInput] = useState<string>('https://pixelscan.net/antidetect-audit');
  const [activeTab, setActiveTab] = useState<number>(0);
  const [tabs, setTabs] = useState<string[]>([
    'https://pixelscan.net/antidetect-audit',
    profile.activeTabs?.[0] || 'https://sellercentral.amazon.com',
  ]);
  const [showDevTools, setShowDevTools] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [auditRunning, setAuditRunning] = useState<boolean>(false);
  const [auditProgress, setAuditProgress] = useState<number>(100);
  const [automationLog, setAutomationLog] = useState<string[]>([
    `[${profile.fingerprint.browserEngine.toUpperCase()}] Isolated sandbox spawned with PID 4821`,
    `[PROXY] Tunneled through ${profile.proxy?.host || '127.0.0.1'}:${profile.proxy?.port || 8080} (${profile.proxy?.country || 'Direct'})`,
    `[FINGERPRINT] Canvas noise applied: +${(profile.fingerprint.score * 0.03).toFixed(2)}% dynamic perturbance`,
    `[FINGERPRINT] WebGL vendor masked as '${profile.fingerprint.webGLVendor}'`,
    `[WEBRTC] STUN candidate leak intercepted and suppressed`,
    `[COOKIES] ${profile.cookieCount} isolated session cookies injected into secure vault`,
  ]);

  const bookmarks = [
    { label: 'Pixelscan Audit', url: 'https://pixelscan.net/antidetect-audit', icon: '🛡️' },
    { label: 'Amazon Seller', url: 'https://sellercentral.amazon.com', icon: '📦' },
    { label: 'Google Search', url: 'https://google.com', icon: '🔍' },
    { label: 'TikTok Ads', url: 'https://ads.tiktok.com', icon: '🎵' },
    { label: 'X (Twitter)', url: 'https://x.com', icon: '𝕏' },
  ];

  const handleNavigate = (url: string) => {
    let target = url;
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      target = 'https://' + target;
    }
    setCurrentUrl(target);
    setUrlInput(target);
    const updated = [...tabs];
    updated[activeTab] = target;
    setTabs(updated);

    if (target.includes('pixelscan')) {
      runAuditTest();
    }
  };

  const runAuditTest = () => {
    setAuditRunning(true);
    setAuditProgress(15);
    const timer1 = setTimeout(() => setAuditProgress(45), 400);
    const timer2 = setTimeout(() => setAuditProgress(80), 800);
    const timer3 = setTimeout(() => {
      setAuditProgress(100);
      setAuditRunning(false);
    }, 1200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleNewTab = () => {
    const newTabs = [...tabs, 'https://google.com'];
    setTabs(newTabs);
    setActiveTab(newTabs.length - 1);
    setCurrentUrl('https://google.com');
    setUrlInput('https://google.com');
  };

  const handleCloseTab = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length <= 1) {
      onClose();
      return;
    }
    const newTabs = tabs.filter((_, i) => i !== index);
    setTabs(newTabs);
    const nextActive = index >= newTabs.length ? newTabs.length - 1 : index;
    setActiveTab(nextActive);
    setCurrentUrl(newTabs[nextActive]);
    setUrlInput(newTabs[nextActive]);
  };

  const handleWarmCookiesAction = () => {
    const newLog = `[WARMER] Visited 5 organic target sites, injected 12 new anti-ban tracking cookies.`;
    setAutomationLog((prev) => [...prev, newLog]);
    if (onUpdateCookiesCount) {
      onUpdateCookiesCount(profile.cookieCount + 12);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 md:p-6 animate-in fade-in duration-200">
      <div className="flex flex-col w-full max-w-6xl h-[90vh] rounded-2xl overflow-hidden border border-slate-700/80 bg-[#11131c] shadow-2xl shadow-black/80">
        
        {/* Window Top Titlebar */}
        <div className="flex items-center justify-between bg-[#181a24] px-4 py-2 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            {/* Window control dots */}
            <div className="flex items-center space-x-2 mr-2">
              <button
                onClick={onClose}
                className="h-3 w-3 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors"
                title="Close session"
              />
              <button
                className="h-3 w-3 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors"
                title="Minimize"
              />
              <button
                className="h-3 w-3 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors"
                title="Maximize"
              />
            </div>

            {/* Profile & Engine Badge */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-xs text-white tracking-wide">
                {profile.name}
              </span>
              <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                {profile.fingerprint.browserEngine === 'mimic' ? 'MIMIC 126' : 'STEALTHFOX 128'}
              </span>
              <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300 border border-slate-700">
                {profile.fingerprint.osVersion}
              </span>
            </div>
          </div>

          {/* Proxy & Security Pill */}
          <div className="flex items-center space-x-3">
            {profile.proxy ? (
              <div className="flex items-center space-x-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 text-[11px] text-emerald-300">
                <Globe className="h-3 w-3 text-emerald-400" />
                <span className="font-mono">{profile.proxy.ip}</span>
                <span className="text-emerald-400 font-semibold">({profile.proxy.city})</span>
                <span className="text-slate-400">• {profile.proxy.pingMs}ms</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 rounded-full bg-amber-950/40 border border-amber-500/30 px-2.5 py-1 text-[11px] text-amber-300">
                <span>Direct IP Connection</span>
              </div>
            )}

            <button
              onClick={handleWarmCookiesAction}
              className="flex items-center space-x-1 text-[11px] font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg px-2.5 py-1 transition-colors"
              title="Quickly warm up cookies"
            >
              <Cookie className="h-3 w-3" />
              <span>+ Warm Cookies</span>
            </button>

            <button
              onClick={() => setShowDevTools(!showDevTools)}
              className={`flex items-center space-x-1 text-[11px] font-semibold rounded-lg px-2.5 py-1 border transition-colors ${
                showDevTools
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Terminal className="h-3 w-3" />
              <span>DevTools</span>
            </button>
          </div>
        </div>

        {/* Tab Strip */}
        <div className="flex items-center space-x-1 bg-[#151722] px-3 pt-2 border-b border-slate-800/80 overflow-x-auto">
          {tabs.map((tabUrl, index) => {
            const isActive = activeTab === index;
            let displayTitle = 'New Tab';
            if (tabUrl.includes('pixelscan')) displayTitle = 'Pixelscan Antidetect Audit';
            else if (tabUrl.includes('amazon')) displayTitle = 'Amazon Seller Central';
            else if (tabUrl.includes('google')) displayTitle = 'Google';
            else if (tabUrl.includes('tiktok')) displayTitle = 'TikTok Ads Hub';
            else if (tabUrl.includes('x.com')) displayTitle = 'X (Twitter)';
            else {
              try {
                displayTitle = new URL(tabUrl).hostname;
              } catch {
                displayTitle = tabUrl;
              }
            }

            return (
              <div
                key={index}
                onClick={() => {
                  setActiveTab(index);
                  setCurrentUrl(tabUrl);
                  setUrlInput(tabUrl);
                }}
                className={`group relative flex items-center space-x-2 rounded-t-lg px-3.5 py-2 text-xs font-medium cursor-pointer transition-colors max-w-[220px] ${
                  isActive
                    ? 'bg-[#1b1e2c] text-white border-t-2 border-indigo-500'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <Lock className="h-3 w-3 text-emerald-400 flex-shrink-0" />
                <span className="truncate">{displayTitle}</span>
                <button
                  onClick={(e) => handleCloseTab(index, e)}
                  className="rounded p-0.5 text-slate-500 hover:bg-slate-700 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            );
          })}

          <button
            onClick={handleNewTab}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors ml-1"
            title="Open new tab"
          >
            <span className="text-base font-light leading-none">+</span>
          </button>
        </div>

        {/* Address Bar & Navigation Controls */}
        <div className="flex items-center space-x-3 bg-[#1b1e2c] px-4 py-2 border-b border-slate-800">
          <div className="flex items-center space-x-1 text-slate-400">
            <button
              onClick={() => {}}
              className="rounded p-1.5 hover:bg-slate-800 hover:text-white transition-colors"
              title="Back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => {}}
              className="rounded p-1.5 hover:bg-slate-800 hover:text-white transition-colors"
              title="Forward"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={handleRefresh}
              className={`rounded p-1.5 hover:bg-slate-800 hover:text-white transition-colors ${
                isRefreshing ? 'animate-spin text-indigo-400' : ''
              }`}
              title="Reload page"
            >
              <RotateCw className="h-4 w-4" />
            </button>
          </div>

          {/* URL Input */}
          <div className="relative flex-1">
            <div className="flex items-center rounded-lg border border-slate-700/80 bg-slate-900/90 px-3 py-1.5 text-xs text-slate-200 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
              <Lock className="h-3.5 w-3.5 text-emerald-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleNavigate(urlInput);
                }}
                className="w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none font-mono text-[11px]"
                placeholder="Enter URL to navigate..."
              />
              <span className="ml-2 rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-500/30">
                SSL MASKED
              </span>
            </div>
          </div>

          {/* Quick Info Badges */}
          <div className="hidden md:flex items-center space-x-2 text-[11px] text-slate-400">
            <span className="flex items-center space-x-1 text-indigo-300">
              <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
              <span>Canvas Masked</span>
            </span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">{profile.cookieCount} Cookies</span>
          </div>
        </div>

        {/* Bookmarks Bar */}
        <div className="flex items-center space-x-2 bg-[#181a24] px-4 py-1.5 border-b border-slate-800/80 text-xs overflow-x-auto">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mr-1">Bookmarks:</span>
          {bookmarks.map((bm, i) => (
            <button
              key={i}
              onClick={() => handleNavigate(bm.url)}
              className="flex items-center space-x-1 rounded px-2 py-0.5 text-[11px] text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <span>{bm.icon}</span>
              <span>{bm.label}</span>
            </button>
          ))}
        </div>

        {/* Main Browser Viewport Area */}
        <div className="flex-1 relative overflow-y-auto bg-[#0d0f17] flex flex-col">
          {currentUrl.includes('pixelscan') ? (
            /* Antidetect Diagnostic / Pixelscan Report */
            <div className="p-6 max-w-5xl mx-auto w-full space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      <ShieldCheck className="h-8 w-8" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h2 className="text-xl font-extrabold text-white">Antidetect Fingerprint Audit</h2>
                        <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                          100% PASS
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        PixelScan &amp; BrowserLeaks Deep Vector Analysis for {profile.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={runAuditTest}
                      disabled={auditRunning}
                      className="flex items-center space-x-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 px-4 py-2 text-xs font-bold text-white transition-all shadow-md shadow-indigo-600/30"
                    >
                      <RotateCw className={`h-3.5 w-3.5 ${auditRunning ? 'animate-spin' : ''}`} />
                      <span>{auditRunning ? 'Scanning Vectors...' : 'Re-run Fingerprint Test'}</span>
                    </button>
                  </div>
                </div>

                {/* Audit Vector Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  {/* IP & Location */}
                  <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">Public IP Address</span>
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div className="font-mono text-sm font-semibold text-white">
                      {profile.proxy ? profile.proxy.ip : '198.51.100.24'}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Location: {profile.proxy ? `${profile.proxy.city}, ${profile.proxy.country}` : 'New York, US'}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-medium">
                      ✓ No ISP Blacklist • Zero Fraud Score
                    </div>
                  </div>

                  {/* WebRTC Shield */}
                  <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">WebRTC Leak Test</span>
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div className="font-mono text-sm font-semibold text-emerald-400">
                      NO LEAK DETECTED
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Real IP suppressed. STUN candidates masked to proxy.
                    </div>
                    <div className="text-[10px] text-emerald-400 font-medium">
                      ✓ Mode: {profile.fingerprint.webRTC.toUpperCase()}
                    </div>
                  </div>

                  {/* Canvas Fingerprint */}
                  <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">Canvas Noise Injection</span>
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div className="font-mono text-sm font-semibold text-white">
                      0x7F89E2B1
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Sub-pixel noise randomly persistent for this profile.
                    </div>
                    <div className="text-[10px] text-emerald-400 font-medium">
                      ✓ Zero Canvas Hash Collision
                    </div>
                  </div>

                  {/* WebGL & GPU */}
                  <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">WebGL GPU Metadata</span>
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div className="text-xs font-semibold text-white truncate">
                      {profile.fingerprint.webGLRenderer}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      Vendor: {profile.fingerprint.webGLVendor}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-medium">
                      ✓ Real Hardware Emulation
                    </div>
                  </div>

                  {/* AudioContext */}
                  <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">AudioContext Buffer</span>
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div className="font-mono text-sm font-semibold text-white">
                      124.043819283 Hz
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Frequency response perturbed with unique seed.
                    </div>
                    <div className="text-[10px] text-emerald-400 font-medium">
                      ✓ Audio Fingerprint Altered
                    </div>
                  </div>

                  {/* Automation Flags */}
                  <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">Automation Flag Check</span>
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div className="font-mono text-sm font-semibold text-emerald-400">
                      navigator.webdriver = false
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Chrome runtime CDC tokens removed completely.
                    </div>
                    <div className="text-[10px] text-emerald-400 font-medium">
                      ✓ Cloudflare &amp; DataDome Undetected
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : currentUrl.includes('amazon') ? (
            /* Amazon Seller Central Preview */
            <div className="p-6 max-w-5xl mx-auto w-full space-y-6">
              <div className="rounded-xl border border-slate-800 bg-[#161922] p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-black text-amber-500">amazon</span>
                    <span className="text-sm font-bold text-slate-200">seller central</span>
                    <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                      UNITED STATES (Active)
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-slate-400">
                    <span>Merchant Token: <strong className="text-white font-mono">A2M90X8129</strong></span>
                    <span className="h-3 w-px bg-slate-700" />
                    <span>Account Health: <strong className="text-emerald-400">100% Good</strong></span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="rounded-lg bg-slate-900/80 p-4 border border-slate-800">
                    <div className="text-xs text-slate-400">Today's Sales</div>
                    <div className="text-xl font-bold text-white mt-1">$4,812.50</div>
                    <div className="text-[11px] text-emerald-400 mt-1">↑ 14.2% vs yesterday</div>
                  </div>
                  <div className="rounded-lg bg-slate-900/80 p-4 border border-slate-800">
                    <div className="text-xs text-slate-400">Open Orders</div>
                    <div className="text-xl font-bold text-white mt-1">128 units</div>
                    <div className="text-[11px] text-slate-400 mt-1">FBA: 114 | FBM: 14</div>
                  </div>
                  <div className="rounded-lg bg-slate-900/80 p-4 border border-slate-800">
                    <div className="text-xs text-slate-400">Buyer Messages</div>
                    <div className="text-xl font-bold text-emerald-400 mt-1">0 Pending</div>
                    <div className="text-[11px] text-slate-400 mt-1">All under 24h response</div>
                  </div>
                  <div className="rounded-lg bg-slate-900/80 p-4 border border-slate-800">
                    <div className="text-xs text-slate-400">Active Listings</div>
                    <div className="text-xl font-bold text-white mt-1">42 SKUs</div>
                    <div className="text-[11px] text-emerald-400 mt-1">100% in stock</div>
                  </div>
                </div>

                <div className="rounded-lg bg-indigo-950/30 border border-indigo-500/20 p-4 text-xs text-indigo-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="h-4 w-4 text-indigo-400" />
                    <span>
                      Multilogin isolated storage active. Amazon security cookies securely cached without cross-profile contamination.
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-indigo-300">Session ID: amzn_ml_sess_9918</span>
                </div>
              </div>
            </div>
          ) : currentUrl.includes('tiktok') ? (
            /* TikTok Ads Manager Preview */
            <div className="p-6 max-w-5xl mx-auto w-full space-y-6">
              <div className="rounded-xl border border-slate-800 bg-[#161922] p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-black text-rose-500">TikTok:</span>
                    <span className="text-sm font-bold text-slate-200">Ads Manager Hub</span>
                    <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300">
                      Tier 1 US Agency
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    Ad Account ID: 72910482019482
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="rounded-lg bg-slate-900/80 p-4 border border-slate-800">
                    <div className="text-xs text-slate-400">30-Day Ad Spend</div>
                    <div className="text-xl font-bold text-white mt-1">$28,490.00</div>
                    <div className="text-[11px] text-emerald-400">ROAS: 3.42x</div>
                  </div>
                  <div className="rounded-lg bg-slate-900/80 p-4 border border-slate-800">
                    <div className="text-xs text-slate-400">Video Impressions</div>
                    <div className="text-xl font-bold text-white mt-1">4.2M views</div>
                    <div className="text-[11px] text-indigo-400">CTR: 2.18%</div>
                  </div>
                  <div className="rounded-lg bg-slate-900/80 p-4 border border-slate-800">
                    <div className="text-xs text-slate-400">Active Pixel Events</div>
                    <div className="text-xl font-bold text-emerald-400 mt-1">CompletePayment</div>
                    <div className="text-[11px] text-slate-400">1,940 conversions</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Generic / Search Engine View */
            <div className="p-8 max-w-3xl mx-auto w-full text-center space-y-6 my-auto">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400">
                  <Globe className="h-8 w-8" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Multilogin Secure Antidetect Browser</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  Connected to <strong className="text-slate-200">{currentUrl}</strong> with zero digital fingerprint leaks.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-left font-mono text-xs space-y-1 text-slate-300">
                <div className="text-indigo-400 font-bold">// Active Profile Properties:</div>
                <div>User-Agent: {profile.fingerprint.userAgent}</div>
                <div>Screen Resolution: {profile.fingerprint.screenResolution}</div>
                <div>Device Memory: {profile.fingerprint.deviceMemoryGb} GB RAM</div>
                <div>Hardware Concurrency: {profile.fingerprint.hardwareConcurrency} Logical Cores</div>
                <div>Timezone: {profile.fingerprint.timezoneValue || 'Auto-synced to Proxy'}</div>
              </div>

              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => handleNavigate('https://pixelscan.net/antidetect-audit')}
                  className="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-semibold text-white transition-colors"
                >
                  Open Pixelscan Leak Test
                </button>
                <button
                  onClick={() => handleNavigate('https://sellercentral.amazon.com')}
                  className="rounded-lg bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors"
                >
                  Open Amazon Seller
                </button>
              </div>
            </div>
          )}

          {/* DevTools & Automation Terminal Drawer (Togglable) */}
          {showDevTools && (
            <div className="border-t border-slate-800 bg-[#0f1118] p-4 text-xs font-mono max-h-60 overflow-y-auto space-y-1">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
                <div className="flex items-center space-x-2">
                  <Terminal className="h-4 w-4 text-indigo-400" />
                  <span className="font-bold text-slate-200">Multilogin Core Engine Logs &amp; Inspector</span>
                </div>
                <button
                  onClick={() => setShowDevTools(false)}
                  className="hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="pt-2 space-y-1">
                {automationLog.map((log, index) => (
                  <div key={index} className="text-slate-300 flex items-start space-x-2">
                    <span className="text-slate-500 select-none">[{index + 1}]</span>
                    <span className={log.includes('WARMER') ? 'text-amber-300' : log.includes('PROXY') ? 'text-cyan-300' : log.includes('FINGERPRINT') ? 'text-indigo-300' : 'text-slate-300'}>
                      {log}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Window Status Bar */}
        <div className="flex items-center justify-between bg-[#151722] px-4 py-2 border-t border-slate-800 text-[11px] text-slate-400">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1.5 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold">Sandboxed &amp; Running</span>
            </span>
            <span>•</span>
            <span>Local Vault: Encrypted AES-256</span>
            <span>•</span>
            <span>Fingerprint Hash: <span className="font-mono text-slate-300">0x892a7f01</span></span>
          </div>

          <div className="flex items-center space-x-4">
            <span>Storage Synced: {profile.storageSynced ? 'Yes' : 'Local Only'}</span>
            <button
              onClick={onClose}
              className="rounded bg-slate-800 hover:bg-slate-700 px-3 py-1 font-semibold text-slate-200 text-xs transition-colors"
            >
              Stop &amp; Close Session
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
