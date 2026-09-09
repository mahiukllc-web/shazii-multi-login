export type BrowserEngine = 'mimic' | 'stealthfox';
export type OperatingSystem = 'windows' | 'macos' | 'linux' | 'android' | 'ios';
export type ProxyType = 'HTTP' | 'HTTPS' | 'SOCKS5' | 'SSH';
export type ProfileStatus = 'ready' | 'running' | 'paused' | 'updating' | 'error';
export type ProfileType = 'browser' | 'cloud_phone';

export interface ProxyConfig {
  id: string;
  name: string;
  type: ProxyType;
  host: string;
  port: number;
  username?: string;
  password?: string;
  country: string;
  countryCode: string;
  city: string;
  ip: string;
  status: 'active' | 'dead' | 'slow' | 'checking';
  pingMs: number;
  lastChecked: string;
}

export interface FingerprintConfig {
  userAgent: string;
  os: OperatingSystem;
  osVersion: string;
  browserEngine: BrowserEngine;
  browserVersion: string;
  screenResolution: string;
  colorDepth: number;
  deviceMemoryGb: number;
  hardwareConcurrency: number;
  webRTC: 'altered' | 'disabled' | 'real' | 'block';
  canvas: 'noise' | 'off' | 'block';
  webGL: 'noise' | 'off' | 'block';
  webGLVendor: string;
  webGLRenderer: string;
  audioContext: 'noise' | 'off';
  fonts: 'masked' | 'real' | 'custom';
  clientRects: 'noise' | 'off';
  geolocation: 'sync_proxy' | 'manual' | 'block';
  latitude?: number;
  longitude?: number;
  timezone: 'sync_proxy' | 'manual';
  timezoneValue?: string;
  languages: string[];
  doNotTrack: boolean;
  score: number; // 0 - 100 anti-detect integrity score
}

export interface BrowserProfile {
  id: string;
  type: 'browser';
  name: string;
  group: string;
  tags: string[];
  status: ProfileStatus;
  notes?: string;
  cookieCount: number;
  lastLaunched?: string;
  createdAt: string;
  proxy?: ProxyConfig;
  fingerprint: FingerprintConfig;
  activeTabs?: string[];
  storageSynced: boolean;
}

export interface CloudPhoneDevice {
  id: string;
  type: 'cloud_phone';
  name: string;
  group: string;
  tags: string[];
  deviceModel: string;
  brand: string;
  androidVersion: string;
  imei: string;
  macAddress: string;
  simCarrier: string;
  phoneNumber: string;
  batteryLevel: number;
  isCharging: boolean;
  status: ProfileStatus;
  proxy?: ProxyConfig;
  screenResolution: string;
  fps: number;
  latencyMs: number;
  installedApps: string[];
  storageUsage: string;
  lastLaunched?: string;
  createdAt: string;
}

export type ProfileItem = BrowserProfile | CloudPhoneDevice;

export interface AutomationTask {
  id: string;
  title: string;
  description: string;
  targetProfileIds: string[];
  status: 'idle' | 'running' | 'completed' | 'failed' | 'scheduled';
  progress: number;
  currentStep: string;
  totalSteps: number;
  currentStepIndex: number;
  scriptType: 'cookie_warm' | 'social_action' | 'login_verify' | 'custom_script';
  scheduledTime?: string;
  duration?: string;
  lastRun?: string;
  logs: TaskLogEntry[];
}

export interface TaskLogEntry {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'warn' | 'error';
  message: string;
  profileId?: string;
}
