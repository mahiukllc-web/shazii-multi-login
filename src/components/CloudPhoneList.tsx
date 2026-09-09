import React from 'react';
import {
  Smartphone,
  Play,
  Wifi,
  Battery,
  ShieldCheck,
  Compass,
  MessageSquare,
  RotateCw,
  Plus,
  Globe,
  Trash2,
  MoreVertical,
  Activity,
  Layers,
  Cpu
} from 'lucide-react';
import { CloudPhoneDevice } from '../types';

interface CloudPhoneListProps {
  devices: CloudPhoneDevice[];
  onLaunchPhone: (device: CloudPhoneDevice) => void;
  onDeletePhone: (id: string) => void;
  onNewPhone: () => void;
}

export const CloudPhoneList: React.FC<CloudPhoneListProps> = ({
  devices,
  onLaunchPhone,
  onDeletePhone,
  onNewPhone,
}) => {
  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center space-x-2">
            <span>Multilogin Cloud Phone Matrix</span>
            <span className="rounded-full bg-cyan-500/20 px-2.5 py-0.5 text-xs font-bold text-cyan-300 border border-cyan-500/30">
              {devices.length} Devices Online
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real cloud-hosted Android mobile instances. Run native mobile apps with genuine device IMEIs, SIM carriers, and zero hardware strain.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onNewPhone}
            className="flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-cyan-600/30 transition-all hover:scale-[1.02]"
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>+ Deploy Cloud Phone</span>
          </button>
        </div>
      </div>

      {/* Cloud Phone Capability Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-1">
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold">
            <Smartphone className="h-4 w-4" />
            <span>Rootless Clean Android 14</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Real ARM architecture emulation. Passes SafetyNet, Play Integrity, and app fraud checks.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-1">
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold">
            <Activity className="h-4 w-4" />
            <span>Low-Latency WebRTC Stream</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Silky smooth 60 FPS interactive streaming with touch and gesture replication under 30ms latency.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-1">
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold">
            <MessageSquare className="h-4 w-4" />
            <span>Virtual SIM &amp; 2FA Inbox</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Integrated mobile numbers for instant SMS/OTP code verification during signups.
          </p>
        </div>
      </div>

      {/* Cloud Phone Device Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {devices.map((device) => (
          <div
            key={device.id}
            className="group rounded-2xl border border-slate-800/90 bg-[#12141f] hover:border-cyan-500/40 p-5 space-y-4 transition-all duration-200 hover:shadow-xl hover:shadow-cyan-950/20 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Card Top: Brand, Model & Status */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-600/10 border border-cyan-500/30 text-cyan-400 group-hover:scale-105 transition-transform">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                      {device.name}
                    </h3>
                    <div className="text-[11px] text-slate-400 font-medium">
                      {device.deviceModel}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>STREAM READY</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300 font-medium border border-slate-700">
                  {device.group}
                </span>
                {device.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded bg-cyan-950/40 px-2 py-0.5 text-[10px] text-cyan-300 border border-cyan-500/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Specifications Box */}
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">OS Version:</span>
                  <span className="font-semibold text-white">{device.androidVersion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">SIM Carrier:</span>
                  <span className="text-cyan-300 font-medium">{device.simCarrier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Virtual Number:</span>
                  <span className="font-mono text-emerald-400 font-semibold">{device.phoneNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">IMEI Hash:</span>
                  <span className="font-mono text-[11px] text-slate-400">{device.imei.slice(0, 8)}...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Stream Latency:</span>
                  <span className="text-emerald-400 font-semibold">{device.latencyMs}ms ({device.fps} FPS)</span>
                </div>
              </div>

              {/* Installed Apps Pills */}
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Installed Apps:
                </div>
                <div className="flex flex-wrap gap-1">
                  {device.installedApps.map((app, idx) => (
                    <span
                      key={idx}
                      className="rounded-md bg-slate-800/90 px-1.5 py-0.5 text-[10px] text-slate-300 border border-slate-700/60"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <Battery className="h-4 w-4 text-emerald-400" />
                <span>{device.batteryLevel}%</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onDeletePhone(device.id)}
                  className="rounded-lg p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                  title="Delete phone"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <button
                  id={`btn-launch-phone-${device.id}`}
                  onClick={() => onLaunchPhone(device)}
                  className="flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-cyan-600/30 transition-all hover:scale-105"
                >
                  <Play className="h-3 w-3 fill-white" />
                  <span>Launch Stream</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
