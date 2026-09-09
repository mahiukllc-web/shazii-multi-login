import React, { useState } from 'react';
import {
  X,
  Globe,
  Smartphone,
  ShieldCheck,
  Network,
  Cpu,
  Sliders,
  CheckCircle2,
  Sparkles,
  Cookie,
  RotateCw,
  Info
} from 'lucide-react';
import { BrowserProfile, CloudPhoneDevice, ProxyConfig, BrowserEngine, OperatingSystem } from '../types';

interface CreateProfileModalProps {
  initialType?: 'browser' | 'cloud_phone';
  proxies: ProxyConfig[];
  onClose: () => void;
  onCreateBrowserProfile: (profile: BrowserProfile) => void;
  onCreateCloudPhone: (phone: CloudPhoneDevice) => void;
}

export const CreateProfileModal: React.FC<CreateProfileModalProps> = ({
  initialType = 'browser',
  proxies,
  onClose,
  onCreateBrowserProfile,
  onCreateCloudPhone,
}) => {
  const [profileType, setProfileType] = useState<'browser' | 'cloud_phone'>(initialType);
  const [activeTab, setActiveTab] = useState<'basic' | 'proxy' | 'fingerprint' | 'cookies'>('basic');

  // Common Fields
  const [name, setName] = useState<string>('');
  const [group, setGroup] = useState<string>('E-Commerce US');
  const [tagsInput, setTagsInput] = useState<string>('Tier-1, Verified');
  const [notes, setNotes] = useState<string>('');

  // Browser Profile Fields
  const [engine, setEngine] = useState<BrowserEngine>('mimic');
  const [os, setOs] = useState<OperatingSystem>('windows');
  const [selectedProxyId, setSelectedProxyId] = useState<string>(proxies[0]?.id || 'none');
  const [proxyCheckStatus, setProxyCheckStatus] = useState<string | null>(null);
  const [isCheckingProxy, setIsCheckingProxy] = useState<boolean>(false);

  // Fingerprint Specifics
  const [canvasMode, setCanvasMode] = useState<'noise' | 'off'>('noise');
  const [webGLMode, setWebGLMode] = useState<'noise' | 'off'>('noise');
  const [webRTCMode, setWebRTCMode] = useState<'altered' | 'disabled'>('altered');
  const [ramGb, setRamGb] = useState<number>(16);
  const [cores, setCores] = useState<number>(8);
  const [resolution, setResolution] = useState<string>('1920x1080');

  // Cookie Importer
  const [cookiesText, setCookiesText] = useState<string>('');

  // Cloud Phone Specifics
  const [phoneModel, setPhoneModel] = useState<string>('Pixel 8 Pro (husky)');
  const [carrier, setCarrier] = useState<string>('T-Mobile US');
  const [customPhone, setCustomPhone] = useState<string>('+1 (415) ' + Math.floor(Math.random() * 899 + 100) + '-' + Math.floor(Math.random() * 8999 + 1000));

  const handleTestSelectedProxy = () => {
    setIsCheckingProxy(true);
    setProxyCheckStatus(null);
    setTimeout(() => {
      setIsCheckingProxy(false);
      if (selectedProxyId === 'none') {
        setProxyCheckStatus('Direct Connection • No proxy leak protection');
      } else {
        const found = proxies.find((p) => p.id === selectedProxyId);
        setProxyCheckStatus(`✓ IP: ${found?.ip || '198.51.100.24'} • Latency: ${found?.pingMs || 34}ms • Clean Residential`);
      }
    }, 600);
  };

  const handleGenerateRandomFingerprint = () => {
    const resolutions = ['1920x1080', '2560x1440', '1920x1200', '1680x1050'];
    setResolution(resolutions[Math.floor(Math.random() * resolutions.length)]);
    setRamGb([8, 16, 32][Math.floor(Math.random() * 3)]);
    setCores([6, 8, 12][Math.floor(Math.random() * 3)]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTags = tagsInput.split(',').map((t) => t.trim()).filter((t) => t.length > 0);
    const chosenProxy = selectedProxyId !== 'none' ? proxies.find((p) => p.id === selectedProxyId) : undefined;

    if (profileType === 'browser') {
      const newProfile: BrowserProfile = {
        id: `prof-${Date.now()}`,
        type: 'browser',
        name: name || `Profile ${os.toUpperCase()} #${Math.floor(Math.random() * 900 + 100)}`,
        group: group || 'General',
        tags: finalTags.length > 0 ? finalTags : ['Antidetect'],
        status: 'ready',
        notes: notes || undefined,
        cookieCount: cookiesText ? Math.floor(Math.random() * 40) + 15 : 0,
        createdAt: new Date().toISOString().split('T')[0],
        proxy: chosenProxy,
        storageSynced: true,
        activeTabs: ['https://pixelscan.net/antidetect-audit'],
        fingerprint: {
          userAgent:
            os === 'macos'
              ? 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
              : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
          os,
          osVersion: os === 'macos' ? 'macOS Sequoia 15.1' : 'Windows 11 (23H2)',
          browserEngine: engine,
          browserVersion: engine === 'mimic' ? 'Mimic v126.2 (Chromium)' : 'Stealthfox v128.1 (Firefox)',
          screenResolution: resolution,
          colorDepth: 24,
          deviceMemoryGb: ramGb,
          hardwareConcurrency: cores,
          webRTC: webRTCMode,
          canvas: canvasMode,
          webGL: webGLMode,
          webGLVendor: os === 'macos' ? 'Apple Inc.' : 'Google Inc. (NVIDIA)',
          webGLRenderer: os === 'macos' ? 'Apple M3 Pro' : 'ANGLE (NVIDIA RTX 4070)',
          audioContext: 'noise',
          fonts: 'masked',
          clientRects: 'noise',
          geolocation: 'sync_proxy',
          timezone: 'sync_proxy',
          timezoneValue: 'America/New_York',
          languages: ['en-US', 'en'],
          doNotTrack: false,
          score: 99.6,
        },
      };

      onCreateBrowserProfile(newProfile);
    } else {
      const newPhone: CloudPhoneDevice = {
        id: `phone-${Date.now()}`,
        type: 'cloud_phone',
        name: name || `Cloud Android (${phoneModel.split(' ')[0]})`,
        group: group || 'Mobile Matrix',
        tags: finalTags.length > 0 ? finalTags : ['Mobile-Clean'],
        deviceModel: phoneModel,
        brand: phoneModel.includes('Pixel') ? 'Google' : phoneModel.includes('Galaxy') ? 'Samsung' : 'Xiaomi',
        androidVersion: 'Android 14',
        imei: '86' + Math.floor(Math.random() * 8999999999999 + 1000000000000),
        macAddress: 'b4:2e:' + Math.floor(Math.random() * 89 + 10) + ':a1:8f:' + Math.floor(Math.random() * 89 + 10),
        simCarrier: carrier,
        phoneNumber: customPhone,
        batteryLevel: 98,
        isCharging: true,
        status: 'ready',
        proxy: chosenProxy,
        screenResolution: '1344 x 2992 (120Hz)',
        fps: 60,
        latencyMs: chosenProxy?.pingMs ? chosenProxy.pingMs - 5 : 28,
        installedApps: ['Instagram', 'TikTok', 'WhatsApp', 'Chrome', 'Settings'],
        storageUsage: '32 GB / 128 GB',
        createdAt: new Date().toISOString().split('T')[0],
      };

      onCreateCloudPhone(newPhone);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="flex flex-col w-full max-w-3xl max-h-[92vh] rounded-2xl border border-slate-700/90 bg-[#141622] shadow-2xl overflow-hidden text-slate-200">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#181b28]">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400">
              {profileType === 'browser' ? <Globe className="h-5 w-5" /> : <Smartphone className="h-5 w-5" />}
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">
                {profileType === 'browser' ? 'Create Antidetect Browser Profile' : 'Deploy Virtual Cloud Phone'}
              </h2>
              <p className="text-xs text-slate-400">Configure unique fingerprint, proxy routing, and isolated storage.</p>
            </div>
          </div>

          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Profile Type Toggle Bar */}
        <div className="flex items-center px-6 pt-4 pb-2 bg-[#12141e] border-b border-slate-800/80 gap-3">
          <button
            type="button"
            onClick={() => setProfileType('browser')}
            className={`flex items-center space-x-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              profileType === 'browser'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-800/70 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="h-4 w-4" />
            <span>Browser Profile (Mimic / Stealthfox)</span>
          </button>

          <button
            type="button"
            onClick={() => setProfileType('cloud_phone')}
            className={`flex items-center space-x-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              profileType === 'cloud_phone'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'bg-slate-800/70 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            <span>Cloud Phone (Android 14)</span>
          </button>
        </div>

        {/* Tabs for Navigation */}
        <div className="flex items-center space-x-1 px-6 pt-3 border-b border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('basic')}
            className={`px-3 py-2 rounded-t-lg transition-colors border-b-2 ${
              activeTab === 'basic'
                ? 'text-white border-indigo-500 bg-slate-800/40'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            1. Basic &amp; Identity
          </button>

          <button
            onClick={() => setActiveTab('proxy')}
            className={`px-3 py-2 rounded-t-lg transition-colors border-b-2 ${
              activeTab === 'proxy'
                ? 'text-white border-indigo-500 bg-slate-800/40'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            2. Proxy &amp; Network
          </button>

          {profileType === 'browser' && (
            <>
              <button
                onClick={() => setActiveTab('fingerprint')}
                className={`px-3 py-2 rounded-t-lg transition-colors border-b-2 ${
                  activeTab === 'fingerprint'
                    ? 'text-white border-indigo-500 bg-slate-800/40'
                    : 'text-slate-400 border-transparent hover:text-slate-200'
                }`}
              >
                3. Fingerprint Customizer
              </button>

              <button
                onClick={() => setActiveTab('cookies')}
                className={`px-3 py-2 rounded-t-lg transition-colors border-b-2 ${
                  activeTab === 'cookies'
                    ? 'text-white border-indigo-500 bg-slate-800/40'
                    : 'text-slate-400 border-transparent hover:text-slate-200'
                }`}
              >
                4. Cookie Importer
              </button>
            </>
          )}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {profileType === 'browser' ? 'Browser Profile Name' : 'Cloud Phone Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={profileType === 'browser' ? 'e.g. Amazon US Seller #04' : 'e.g. TikTok Matrix Phone 01'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Group / Folder</label>
                  <input
                    type="text"
                    placeholder="e.g. E-Commerce US, Advertising, Crypto"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. VIP, Amazon, Residential, HighSpend"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {profileType === 'browser' ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Browser Engine</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setEngine('mimic')}
                          className={`rounded-xl border p-3 text-left transition-all ${
                            engine === 'mimic'
                              ? 'border-indigo-500 bg-indigo-950/40 text-white font-bold'
                              : 'border-slate-800 bg-slate-900/60 text-slate-400'
                          }`}
                        >
                          <div className="text-xs">Mimic</div>
                          <div className="text-[10px] text-slate-500 font-normal">Chromium 126 Core</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setEngine('stealthfox')}
                          className={`rounded-xl border p-3 text-left transition-all ${
                            engine === 'stealthfox'
                              ? 'border-indigo-500 bg-indigo-950/40 text-white font-bold'
                              : 'border-slate-800 bg-slate-900/60 text-slate-400'
                          }`}
                        >
                          <div className="text-xs">Stealthfox</div>
                          <div className="text-[10px] text-slate-500 font-normal">Firefox 128 Core</div>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Operating System</label>
                      <select
                        value={os}
                        onChange={(e) => setOs(e.target.value as any)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
                      >
                        <option value="windows">Windows 11 (23H2)</option>
                        <option value="macos">macOS Sequoia (15.1)</option>
                        <option value="linux">Linux (Ubuntu 24.04)</option>
                        <option value="android">Android 14 (Mobile Web)</option>
                        <option value="ios">iOS 18 (Safari Web)</option>
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                /* Cloud Phone Fields */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Android Device Model</label>
                    <select
                      value={phoneModel}
                      onChange={(e) => setPhoneModel(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="Pixel 8 Pro (husky)">Google Pixel 8 Pro (Android 14)</option>
                      <option value="Galaxy S24 Ultra (SM-S928B)">Samsung Galaxy S24 Ultra (OneUI 6.1)</option>
                      <option value="Xiaomi 14 Pro (23116PN5BC)">Xiaomi 14 Pro (HyperOS 1.0)</option>
                      <option value="OnePlus 12 (CPH2581)">OnePlus 12 (OxygenOS 14)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Virtual SIM Carrier</label>
                    <select
                      value={carrier}
                      onChange={(e) => setCarrier(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="T-Mobile US">T-Mobile US (5G Ultra Capacity)</option>
                      <option value="Verizon Wireless US">Verizon Wireless US</option>
                      <option value="EE Mobile UK">EE Mobile UK (5G)</option>
                      <option value="Vodafone Germany">Vodafone Germany</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Internal Notes</label>
                <textarea
                  rows={2}
                  placeholder="Add private reference tags, merchant store credentials or assigned team member..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 p-2 text-slate-100 placeholder-slate-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'proxy' && (
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Select Proxy Routing</label>
                <select
                  value={selectedProxyId}
                  onChange={(e) => setSelectedProxyId(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none font-mono"
                >
                  <option value="none">Direct Connection (No Proxy)</option>
                  {proxies.map((p) => (
                    <option key={p.id} value={p.id}>
                      [{p.type}] {p.name} - {p.ip} ({p.country}) • {p.pingMs}ms
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={handleTestSelectedProxy}
                  disabled={isCheckingProxy}
                  className="flex items-center space-x-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 px-3.5 py-1.5 text-slate-200 font-semibold"
                >
                  <RotateCw className={`h-3.5 w-3.5 ${isCheckingProxy ? 'animate-spin text-indigo-400' : ''}`} />
                  <span>Check Proxy Connection</span>
                </button>

                {proxyCheckStatus && (
                  <span className="text-emerald-400 font-medium text-xs">
                    {proxyCheckStatus}
                  </span>
                )}
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2 text-xs text-slate-300">
                <div className="flex items-center space-x-2 text-indigo-400 font-bold">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Automatic Geolocation &amp; Timezone Sync</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  When a proxy is selected, Multilogin automatically sets the browser's Timezone, WebRTC public candidate, Language headers, and Geolocation latitude/longitude to match the proxy IP location.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'fingerprint' && profileType === 'browser' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Fingerprint Generator</span>
                <button
                  type="button"
                  onClick={handleGenerateRandomFingerprint}
                  className="flex items-center space-x-1 text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Randomize Safe Parameters</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Canvas Fingerprint Mode</label>
                  <select
                    value={canvasMode}
                    onChange={(e) => setCanvasMode(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100"
                  >
                    <option value="noise">Noise (Persistent sub-pixel perturbance - Recommended)</option>
                    <option value="off">Off (Native GPU Render)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">WebGL Noise &amp; Shaders</label>
                  <select
                    value={webGLMode}
                    onChange={(e) => setWebGLMode(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100"
                  >
                    <option value="noise">Noise (Spoof Vendor &amp; Renderer metadata)</option>
                    <option value="off">Off</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">WebRTC Protection</label>
                  <select
                    value={webRTCMode}
                    onChange={(e) => setWebRTCMode(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100"
                  >
                    <option value="altered">Altered (Replace real IP with proxy candidate)</option>
                    <option value="disabled">Disabled (Block all WebRTC STUN requests)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Screen Resolution</label>
                  <select
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100"
                  >
                    <option value="1920x1080">1920 x 1080 (FHD 16:9)</option>
                    <option value="2560x1440">2560 x 1440 (QHD)</option>
                    <option value="1920x1200">1920 x 1200 (16:10)</option>
                    <option value="1440x900">1440 x 900</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Device Memory (RAM)</label>
                  <select
                    value={ramGb}
                    onChange={(e) => setRamGb(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100"
                  >
                    <option value={8}>8 GB</option>
                    <option value={16}>16 GB (Recommended)</option>
                    <option value={32}>32 GB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Hardware Concurrency (Cores)</label>
                  <select
                    value={cores}
                    onChange={(e) => setCores(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100"
                  >
                    <option value={4}>4 Logical Cores</option>
                    <option value={8}>8 Logical Cores</option>
                    <option value={12}>12 Logical Cores</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cookies' && profileType === 'browser' && (
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Import Cookies (JSON or Netscape format)
                </label>
                <textarea
                  rows={6}
                  placeholder={`[{"domain":".amazon.com","name":"session-id","value":"132-8401928-19283","path":"/"}]`}
                  value={cookiesText}
                  onChange={(e) => setCookiesText(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-slate-100 font-mono text-xs placeholder-slate-600"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Import existing cookies to instantly resume authorized sessions in target websites without triggering 2FA.
              </p>
            </div>
          )}

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="text-slate-400 text-[11px]">
              Antidetect Integrity Guarantee: <span className="text-emerald-400 font-bold">100% Pass</span>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-slate-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 px-6 py-2 text-white font-bold shadow-md shadow-indigo-600/30"
              >
                {profileType === 'browser' ? 'Create Browser Profile' : 'Deploy Cloud Phone'}
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
