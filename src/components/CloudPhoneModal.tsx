import React, { useState } from 'react';
import {
  X,
  Smartphone,
  Wifi,
  Battery,
  RotateCcw,
  Volume2,
  Volume1,
  Power,
  Compass,
  MessageSquare,
  Upload,
  RefreshCw,
  Sliders,
  ChevronLeft,
  Circle,
  Square,
  ShieldCheck,
  Globe,
  Settings,
  Flame,
  Heart,
  Share2,
  Send,
  Camera
} from 'lucide-react';
import { CloudPhoneDevice } from '../types';

interface CloudPhoneModalProps {
  device: CloudPhoneDevice;
  onClose: () => void;
}

export const CloudPhoneModal: React.FC<CloudPhoneModalProps> = ({ device, onClose }) => {
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [isRotated, setIsRotated] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(75);
  const [showGpsModal, setShowGpsModal] = useState<boolean>(false);
  const [showSmsModal, setShowSmsModal] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<string>('40.7128');
  const [longitude, setLongitude] = useState<string>('-74.0060');
  const [smsMessages, setSmsMessages] = useState<Array<{ sender: string; time: string; code: string; text: string }>>([
    {
      sender: 'TikTok Verification',
      time: '5 mins ago',
      code: '839210',
      text: 'Your TikTok verification code is 839210. Valid for 5 minutes. Do not share.',
    },
    {
      sender: 'WhatsApp',
      time: '1 hour ago',
      code: '419-832',
      text: 'WhatsApp code: 419-832. You can also tap on this link to verify your phone number.',
    },
    {
      sender: 'Instagram',
      time: 'Yesterday',
      code: '901248',
      text: 'Use 901248 to verify your Instagram account.',
    },
  ]);

  const [instagramPosts, setInstagramPosts] = useState([
    { id: 1, user: 'digital_growth_official', likes: 1420, caption: 'Scaling multi-channel ad campaigns with zero shadowbans 🚀 #ecommerce #growth' },
    { id: 2, user: 'sneaker_vault_ny', likes: 389, caption: 'Drop alert for tomorrow morning! Notifications on 🔥' },
  ]);

  const [whatsAppChats, setWhatsAppChats] = useState([
    { id: 1, name: 'VIP Buyer - Mark (NY)', lastMessage: 'Order #9810 confirmed, thanks!', time: '12:44 PM', unread: 0 },
    { id: 2, name: 'Wholesale Supplier Shenzhen', lastMessage: 'Shipping 500 units tracking uploaded.', time: '11:20 AM', unread: 2 },
    { id: 3, name: 'Affiliate Manager - Sarah', lastMessage: 'New payout threshold unlocked.', time: 'Yesterday', unread: 0 },
  ]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 md:p-6 animate-in fade-in duration-200">
      <div className="flex flex-col xl:flex-row items-center justify-center gap-6 max-w-5xl w-full h-[92vh]">
        
        {/* Phone Mockup Body */}
        <div className={`relative flex flex-col items-center transition-all duration-300 ${
          isRotated ? 'w-[680px] h-[400px]' : 'w-[360px] sm:w-[380px] h-[720px]'
        }`}>
          {/* Hardware Frame Exterior */}
          <div className="relative w-full h-full rounded-[44px] bg-[#1a1c24] p-3.5 shadow-2xl shadow-black ring-1 ring-slate-700/80 border-4 border-slate-800 flex flex-col">
            
            {/* Camera Punch Hole / Dynamic Island */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-1.5 rounded-full bg-black px-3 py-1">
              <div className="h-2.5 w-2.5 rounded-full bg-slate-900 border border-slate-800" />
              <div className="h-1.5 w-1.5 rounded-full bg-blue-900/60" />
            </div>

            {/* Glass Screen Display Container */}
            <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-gradient-to-b from-[#0e111a] to-[#121524] flex flex-col text-white select-none">
              
              {/* Android Status Bar */}
              <div className="flex items-center justify-between px-6 pt-2 pb-1 text-[11px] font-semibold text-slate-300 z-20">
                <div className="flex items-center space-x-2">
                  <span>10:42</span>
                  <span className="text-[10px] text-slate-400">• {device.simCarrier}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <Wifi className="h-3 w-3 text-cyan-400" />
                  <span className="text-[10px]">5G</span>
                  <div className="flex items-center space-x-0.5">
                    <span className="text-[10px]">{device.batteryLevel}%</span>
                    <Battery className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Screen Content - App View or Home Screen */}
              <div className="flex-1 overflow-y-auto relative flex flex-col p-4">
                {activeApp === null ? (
                  /* Android Home Screen */
                  <div className="flex-1 flex flex-col justify-between py-4">
                    {/* Time & Weather Widget */}
                    <div className="text-center pt-6 space-y-1">
                      <div className="text-5xl font-extralight tracking-tight text-white">10:42</div>
                      <div className="text-xs text-slate-400 font-medium">
                        Wednesday, Sep 9 • 74°F New York
                      </div>
                      <div className="inline-flex items-center space-x-1 rounded-full bg-slate-800/80 px-2.5 py-0.5 text-[10px] text-cyan-300 border border-slate-700/60 mt-2">
                        <ShieldCheck className="h-3 w-3 text-cyan-400" />
                        <span>Cloud Android 14 • Safe Isolation</span>
                      </div>
                    </div>

                    {/* App Grid */}
                    <div className="grid grid-cols-4 gap-y-6 gap-x-2 px-2 my-auto">
                      {/* Instagram */}
                      <button
                        onClick={() => setActiveApp('instagram')}
                        className="flex flex-col items-center space-y-1.5 group"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shadow-md transition-transform group-hover:scale-105">
                          <Camera className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-[10px] text-slate-200">Instagram</span>
                      </button>

                      {/* TikTok */}
                      <button
                        onClick={() => setActiveApp('tiktok')}
                        className="flex flex-col items-center space-y-1.5 group"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black border border-slate-700 shadow-md transition-transform group-hover:scale-105">
                          <span className="text-lg font-black text-cyan-400">d</span>
                        </div>
                        <span className="text-[10px] text-slate-200">TikTok</span>
                      </button>

                      {/* WhatsApp */}
                      <button
                        onClick={() => setActiveApp('whatsapp')}
                        className="flex flex-col items-center space-y-1.5 group"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 shadow-md transition-transform group-hover:scale-105">
                          <MessageSquare className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-[10px] text-slate-200">WhatsApp</span>
                      </button>

                      {/* Chrome */}
                      <button
                        onClick={() => setActiveApp('chrome')}
                        className="flex flex-col items-center space-y-1.5 group"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 shadow-md transition-transform group-hover:scale-105">
                          <Globe className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-[10px] text-slate-200">Chrome</span>
                      </button>

                      {/* SMS Messages */}
                      <button
                        onClick={() => setShowSmsModal(true)}
                        className="flex flex-col items-center space-y-1.5 group"
                      >
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 shadow-md transition-transform group-hover:scale-105">
                          <MessageSquare className="h-6 w-6 text-white" />
                          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                            3
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-200">SIM SMS</span>
                      </button>

                      {/* GPS Spoofer */}
                      <button
                        onClick={() => setShowGpsModal(true)}
                        className="flex flex-col items-center space-y-1.5 group"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-600 shadow-md transition-transform group-hover:scale-105">
                          <Compass className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-[10px] text-slate-200">Mock GPS</span>
                      </button>

                      {/* Settings */}
                      <button
                        onClick={() => setActiveApp('settings')}
                        className="flex flex-col items-center space-y-1.5 group"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-700 shadow-md transition-transform group-hover:scale-105">
                          <Settings className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-[10px] text-slate-200">Settings</span>
                      </button>

                      {/* Store / Automation */}
                      <button
                        onClick={() => setActiveApp('device_info')}
                        className="flex flex-col items-center space-y-1.5 group"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 shadow-md transition-transform group-hover:scale-105">
                          <ShieldCheck className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-[10px] text-slate-200">Hardware</span>
                      </button>
                    </div>

                    {/* Dock */}
                    <div className="rounded-3xl bg-slate-900/70 backdrop-blur-md p-2 flex justify-around border border-slate-800/80">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white cursor-pointer hover:opacity-90">
                        <PhoneIcon className="h-5 w-5" />
                      </div>
                      <div 
                        onClick={() => setActiveApp('whatsapp')}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white cursor-pointer hover:opacity-90"
                      >
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div 
                        onClick={() => setActiveApp('chrome')}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white cursor-pointer hover:opacity-90"
                      >
                        <Globe className="h-5 w-5" />
                      </div>
                      <div 
                        onClick={() => setActiveApp('instagram')}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 text-white cursor-pointer hover:opacity-90"
                      >
                        <Camera className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                ) : activeApp === 'instagram' ? (
                  /* Instagram Mobile App Simulator */
                  <div className="flex-1 flex flex-col bg-black -m-4 p-4 text-white">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-900">
                      <span className="font-bold tracking-tight text-lg">Instagram</span>
                      <div className="flex space-x-3 text-neutral-300">
                        <Heart className="h-5 w-5" />
                        <Send className="h-5 w-5" />
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto py-3 space-y-4">
                      {instagramPosts.map((post) => (
                        <div key={post.id} className="space-y-2 border-b border-neutral-900 pb-3">
                          <div className="flex items-center space-x-2">
                            <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-yellow-400 to-rose-500 p-0.5">
                              <div className="h-full w-full rounded-full bg-black" />
                            </div>
                            <span className="text-xs font-bold">{post.user}</span>
                          </div>
                          <div className="h-44 w-full rounded-xl bg-neutral-900 flex items-center justify-center text-xs text-neutral-500">
                            [Cloud Video Stream Running]
                          </div>
                          <div className="flex items-center space-x-3 text-sm">
                            <Heart className="h-4 w-4 text-rose-500 fill-rose-500 cursor-pointer" />
                            <MessageSquare className="h-4 w-4 cursor-pointer" />
                            <Share2 className="h-4 w-4 cursor-pointer" />
                          </div>
                          <div className="text-[11px] font-semibold">{post.likes} likes</div>
                          <div className="text-[11px] text-neutral-300">{post.caption}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : activeApp === 'whatsapp' ? (
                  /* WhatsApp Business Simulator */
                  <div className="flex-1 flex flex-col bg-[#0b141a] -m-4 p-4 text-white">
                    <div className="flex items-center justify-between pb-2 bg-[#202c33] -mx-4 px-4 py-2">
                      <span className="font-bold text-sm text-emerald-400">WhatsApp Business</span>
                      <div className="text-xs text-slate-300 font-mono">{device.phoneNumber}</div>
                    </div>

                    <div className="flex-1 overflow-y-auto divide-y divide-[#202c33] pt-2">
                      {whatsAppChats.map((chat) => (
                        <div key={chat.id} className="py-2.5 flex items-center justify-between cursor-pointer hover:bg-[#111b21] px-1 rounded-lg">
                          <div className="flex items-center space-x-2.5">
                            <div className="h-9 w-9 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-xs">
                              {chat.name.charAt(0)}
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-100">{chat.name}</div>
                              <div className="text-[11px] text-slate-400 truncate max-w-[180px]">{chat.lastMessage}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] text-slate-500">{chat.time}</div>
                            {chat.unread > 0 && (
                              <span className="inline-block rounded-full bg-emerald-500 px-1.5 py-0.2 text-[9px] font-bold text-black mt-1">
                                {chat.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : activeApp === 'tiktok' ? (
                  /* TikTok Simulator */
                  <div className="flex-1 flex flex-col bg-black -m-4 p-4 text-white justify-between">
                    <div className="flex justify-center space-x-6 text-sm font-bold pt-2">
                      <span className="text-neutral-500">Following</span>
                      <span className="border-b-2 border-white pb-1">For You</span>
                    </div>

                    <div className="my-auto text-center space-y-3">
                      <div className="h-64 w-full rounded-2xl bg-neutral-900 flex flex-col items-center justify-center text-xs text-neutral-400 space-y-2">
                        <Flame className="h-8 w-8 text-rose-500 animate-bounce" />
                        <span className="font-semibold text-white">#Trending Video Feed</span>
                        <span className="text-[11px] text-neutral-500">Simulating natural 60 FPS video playback</span>
                      </div>
                    </div>

                    <div className="text-xs space-y-1">
                      <div className="font-bold">@viral_affiliate_hub</div>
                      <div className="text-neutral-300">Secret automation workflows revealed 💥</div>
                    </div>
                  </div>
                ) : (
                  /* Settings / Hardware Specs */
                  <div className="flex-1 overflow-y-auto bg-slate-900/90 -m-4 p-4 text-xs space-y-3">
                    <div className="font-bold text-sm text-white pb-2 border-b border-slate-800">
                      About Cloud Device
                    </div>
                    <div className="space-y-2 text-slate-300">
                      <div className="flex justify-between py-1 border-b border-slate-800/60">
                        <span className="text-slate-400">Device Model</span>
                        <span className="font-semibold text-white">{device.deviceModel}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800/60">
                        <span className="text-slate-400">Android OS</span>
                        <span className="text-white">{device.androidVersion}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800/60">
                        <span className="text-slate-400">Hardware IMEI</span>
                        <span className="font-mono text-[11px] text-cyan-300">{device.imei}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800/60">
                        <span className="text-slate-400">MAC Address</span>
                        <span className="font-mono text-[11px] text-slate-300">{device.macAddress}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800/60">
                        <span className="text-slate-400">SIM Carrier</span>
                        <span className="text-white">{device.simCarrier}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800/60">
                        <span className="text-slate-400">Phone Number</span>
                        <span className="font-mono text-emerald-400">{device.phoneNumber}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800/60">
                        <span className="text-slate-400">Storage</span>
                        <span className="text-white">{device.storageUsage}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800/60">
                        <span className="text-slate-400">WebRTC Stream Latency</span>
                        <span className="text-emerald-400 font-bold">{device.latencyMs} ms ({device.fps} FPS)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Android Bottom Navigation Bar (Back, Home, Recents) */}
              <div className="flex items-center justify-around py-2.5 bg-black/90 border-t border-slate-800/80 z-20">
                <button
                  onClick={() => setActiveApp(null)}
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                  title="Back"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setActiveApp(null)}
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                  title="Home"
                >
                  <Circle className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setActiveApp('settings')}
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                  title="Recent Apps"
                >
                  <Square className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Cloud Phone Remote Management Control Console */}
        <div className="w-full xl:w-80 flex flex-col justify-between rounded-2xl border border-slate-800 bg-[#141620] p-5 space-y-4 shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5 text-cyan-400" />
                <div>
                  <h3 className="font-bold text-sm text-white">{device.name}</h3>
                  <div className="text-[11px] text-slate-400">{device.deviceModel}</div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Stream Health Badges */}
            <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Stream Protocol:</span>
                <span className="text-cyan-300 font-mono font-semibold">WebRTC 60 FPS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Network Latency:</span>
                <span className="text-emerald-400 font-mono font-semibold">{device.latencyMs} ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Active Proxy:</span>
                <span className="text-slate-200 font-mono">{device.proxy?.ip || 'Direct'}</span>
              </div>
            </div>

            {/* Hardware Control Buttons */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Device Controls
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setShowSmsModal(true)}
                  className="flex items-center space-x-2 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-500/30 p-2.5 text-indigo-200 transition-colors"
                >
                  <MessageSquare className="h-4 w-4 text-indigo-400" />
                  <span>SIM SMS ({smsMessages.length})</span>
                </button>

                <button
                  onClick={() => setShowGpsModal(true)}
                  className="flex items-center space-x-2 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 p-2.5 text-cyan-200 transition-colors"
                >
                  <Compass className="h-4 w-4 text-cyan-400" />
                  <span>Spoof GPS</span>
                </button>

                <button
                  onClick={() => setIsRotated(!isRotated)}
                  className="flex items-center space-x-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 p-2.5 text-slate-200 transition-colors"
                >
                  <RotateCcw className="h-4 w-4 text-slate-400" />
                  <span>Rotate Screen</span>
                </button>

                <button
                  onClick={() => setActiveApp(null)}
                  className="flex items-center space-x-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 p-2.5 text-slate-200 transition-colors"
                >
                  <RefreshCw className="h-4 w-4 text-slate-400" />
                  <span>Reset View</span>
                </button>
              </div>
            </div>

            {/* Virtual SIM Info */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3 text-xs space-y-1">
              <div className="text-[11px] font-bold text-slate-400">Virtual Mobile SIM</div>
              <div className="text-white font-mono font-semibold">{device.phoneNumber}</div>
              <div className="text-[11px] text-emerald-400">✓ Ready for SMS/OTP phone verification</div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={onClose}
              className="w-full rounded-xl bg-slate-800 hover:bg-slate-700 py-2.5 text-xs font-semibold text-slate-200 transition-colors"
            >
              Disconnect Cloud Stream
            </button>
          </div>
        </div>

      </div>

      {/* Mock GPS Spoofer Sub-Modal */}
      {showGpsModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-slate-700 bg-[#161924] p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
                <Compass className="h-4 w-4" />
                <span>Mock GPS Coordinates</span>
              </div>
              <button onClick={() => setShowGpsModal(false)} className="text-slate-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400">Latitude</label>
                <input
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-100 font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400">Longitude</label>
                <input
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-100 font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  onClick={() => setShowGpsModal(false)}
                  className="rounded-lg bg-slate-800 px-3 py-1.5 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowGpsModal(false)}
                  className="rounded-lg bg-cyan-600 hover:bg-cyan-500 px-3 py-1.5 text-white font-semibold"
                >
                  Apply Coordinates
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Virtual SIM SMS Inbox Modal */}
      {showSmsModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-[#161924] p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm">
                <MessageSquare className="h-4 w-4" />
                <span>Virtual SIM SMS Inbox ({device.phoneNumber})</span>
              </div>
              <button onClick={() => setShowSmsModal(false)} className="text-slate-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto">
              {smsMessages.map((sms, i) => (
                <div key={i} className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">{sms.sender}</span>
                    <span className="text-[10px] text-slate-500">{sms.time}</span>
                  </div>
                  <div className="text-slate-300 text-[11px]">{sms.text}</div>
                  <div className="inline-flex items-center space-x-1 rounded bg-indigo-500/20 px-2 py-0.5 text-indigo-300 font-mono font-bold text-[11px] border border-indigo-500/30">
                    <span>Code: {sms.code}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowSmsModal(false)}
                className="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 text-xs font-semibold text-white"
              >
                Close SMS Inbox
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}
