import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar, NavigationTab } from './components/Sidebar';
import { ProfileList } from './components/ProfileList';
import { CloudPhoneList } from './components/CloudPhoneList';
import { TasksAutomation } from './components/TasksAutomation';
import { ProxyManager } from './components/ProxyManager';
import { FingerprintAuditor } from './components/FingerprintAuditor';
import { BrowserViewportModal } from './components/BrowserViewportModal';
import { CloudPhoneModal } from './components/CloudPhoneModal';
import { CreateProfileModal } from './components/CreateProfileModal';
import {
  INITIAL_BROWSER_PROFILES,
  INITIAL_CLOUD_PHONES,
  INITIAL_PROXIES,
  INITIAL_AUTOMATION_TASKS,
} from './data/mockData';
import { BrowserProfile, CloudPhoneDevice, ProxyConfig, AutomationTask } from './types';

export default function App() {
  const [browserProfiles, setBrowserProfiles] = useState<BrowserProfile[]>(() => {
    const saved = localStorage.getItem('multilogin_profiles');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_BROWSER_PROFILES;
  });

  const [cloudPhones, setCloudPhones] = useState<CloudPhoneDevice[]>(() => {
    const saved = localStorage.getItem('multilogin_phones');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_CLOUD_PHONES;
  });

  const [proxies, setProxies] = useState<ProxyConfig[]>(() => {
    const saved = localStorage.getItem('multilogin_proxies');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_PROXIES;
  });

  const [tasks, setTasks] = useState<AutomationTask[]>(() => {
    const saved = localStorage.getItem('multilogin_tasks');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_AUTOMATION_TASKS;
  });

  const [currentTab, setCurrentTab] = useState<NavigationTab>('profiles');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active Simulators Modals
  const [activeBrowserProfile, setActiveBrowserProfile] = useState<BrowserProfile | null>(null);
  const [activeCloudPhone, setActiveCloudPhone] = useState<CloudPhoneDevice | null>(null);

  // Create Profile Modal
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [createModalType, setCreateModalType] = useState<'browser' | 'cloud_phone'>('browser');

  // Proxy Ping testing state
  const [isTestingProxies, setIsTestingProxies] = useState<boolean>(false);

  // Sync to LocalStorage for persistence
  useEffect(() => {
    localStorage.setItem('multilogin_profiles', JSON.stringify(browserProfiles));
  }, [browserProfiles]);

  useEffect(() => {
    localStorage.setItem('multilogin_phones', JSON.stringify(cloudPhones));
  }, [cloudPhones]);

  useEffect(() => {
    localStorage.setItem('multilogin_proxies', JSON.stringify(proxies));
  }, [proxies]);

  useEffect(() => {
    localStorage.setItem('multilogin_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handlers for Browser Profiles
  const handleLaunchBrowser = (profile: BrowserProfile) => {
    setActiveBrowserProfile(profile);
    setBrowserProfiles((prev) =>
      prev.map((p) => (p.id === profile.id ? { ...p, status: 'running', lastLaunched: 'Just now' } : p))
    );
  };

  const handleCloseBrowser = () => {
    if (activeBrowserProfile) {
      setBrowserProfiles((prev) =>
        prev.map((p) => (p.id === activeBrowserProfile.id ? { ...p, status: 'ready' } : p))
      );
    }
    setActiveBrowserProfile(null);
  };

  const handleDeleteBrowserProfile = (id: string) => {
    setBrowserProfiles((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCloneProfile = (profile: BrowserProfile) => {
    const clone: BrowserProfile = {
      ...profile,
      id: `prof-${Date.now()}`,
      name: `${profile.name} (Copy)`,
      cookieCount: Math.floor(profile.cookieCount * 0.8),
      createdAt: new Date().toISOString().split('T')[0],
      status: 'ready',
    };
    setBrowserProfiles((prev) => [clone, ...prev]);
  };

  const handleWarmCookies = (profileIds: string[]) => {
    setBrowserProfiles((prev) =>
      prev.map((p) => {
        if (profileIds.includes(p.id)) {
          return {
            ...p,
            cookieCount: p.cookieCount + 15,
            notes: (p.notes ? p.notes + ' • ' : '') + 'Warmed +15 cookies',
          };
        }
        return p;
      })
    );

    // Also trigger task or log
    const updatedTasks = tasks.map((t) => {
      if (t.scriptType === 'cookie_warm') {
        return {
          ...t,
          lastRun: 'Just now',
          logs: [
            ...t.logs,
            {
              id: `log-${Date.now()}`,
              timestamp: new Date().toLocaleTimeString(),
              type: 'success' as const,
              message: `Quick cookie warming triggered for ${profileIds.length} profile(s). Injected 15 authentic tracking cookies.`,
            },
          ],
        };
      }
      return t;
    });
    setTasks(updatedTasks);
  };

  const handleUpdateCookiesCount = (newCount: number) => {
    if (activeBrowserProfile) {
      setBrowserProfiles((prev) =>
        prev.map((p) => (p.id === activeBrowserProfile.id ? { ...p, cookieCount: newCount } : p))
      );
      setActiveBrowserProfile((prev) => (prev ? { ...prev, cookieCount: newCount } : null));
    }
  };

  // Handlers for Cloud Phones
  const handleLaunchPhone = (device: CloudPhoneDevice) => {
    setActiveCloudPhone(device);
    setCloudPhones((prev) =>
      prev.map((d) => (d.id === device.id ? { ...d, status: 'running', lastLaunched: 'Just now' } : d))
    );
  };

  const handleClosePhone = () => {
    if (activeCloudPhone) {
      setCloudPhones((prev) =>
        prev.map((d) => (d.id === activeCloudPhone.id ? { ...d, status: 'ready' } : d))
      );
    }
    setActiveCloudPhone(null);
  };

  const handleDeletePhone = (id: string) => {
    setCloudPhones((prev) => prev.filter((d) => d.id !== id));
  };

  // Handlers for Proxies
  const handleAddProxy = (newProxy: ProxyConfig) => {
    setProxies((prev) => [newProxy, ...prev]);
  };

  const handleDeleteProxy = (proxyId: string) => {
    setProxies((prev) => prev.filter((p) => p.id !== proxyId));
  };

  const handleTestProxies = () => {
    setIsTestingProxies(true);
    setTimeout(() => {
      setProxies((prev) =>
        prev.map((p) => ({
          ...p,
          pingMs: Math.floor(Math.random() * 45) + 20,
          status: 'active',
          lastChecked: 'Just now',
        }))
      );
      setIsTestingProxies(false);
    }, 1200);
  };

  // Handlers for Tasks
  const handleRunTask = (taskId: string) => {
    const targetTask = tasks.find((t) => t.id === taskId);
    if (!targetTask) return;

    // Step progression animation
    const steps = [
      { progress: 20, step: 'Initializing sandboxed antidetect container...' },
      { progress: 45, step: 'Tunneling through residential proxy with DNS leak shield...' },
      { progress: 70, step: 'Simulating organic human mouse bezier curves & delays...' },
      { progress: 90, step: 'Harvesting & AES-256 encrypting session cookies...' },
      { progress: 100, step: 'Execution complete. Profile synchronized to vault.' },
    ];

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: 'running', progress: 10 } : t))
    );

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        const current = steps[stepIndex];
        const newLogMessage = `[Step ${stepIndex + 1}/${steps.length}] ${current.step}`;

        setTasks((prev) =>
          prev.map((t) => {
            if (t.id === taskId) {
              return {
                ...t,
                progress: current.progress,
                currentStep: current.step,
                logs: [
                  ...t.logs,
                  {
                    id: `log-${Date.now()}-${stepIndex}`,
                    timestamp: new Date().toLocaleTimeString(),
                    type: stepIndex === steps.length - 1 ? 'success' : 'info',
                    message: newLogMessage,
                  },
                ],
              };
            }
            return t;
          })
        );
        stepIndex++;
      } else {
        clearInterval(interval);
        setTasks((prev) =>
          prev.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  status: 'completed',
                  lastRun: 'Just now (Success)',
                }
              : t
          )
        );
      }
    }, 800);
  };

  const handleAddTask = (newTask: AutomationTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#0d0f17] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header */}
      <Navbar
        activeSessionsCount={(activeBrowserProfile ? 1 : 0) + (activeCloudPhone ? 1 : 0)}
        totalProfilesCount={browserProfiles.length}
        cloudPhonesCount={cloudPhones.length}
        proxiesOnlineCount={proxies.length}
        onNewProfile={() => {
          setCreateModalType('browser');
          setShowCreateModal(true);
        }}
        onNewCloudPhone={() => {
          setCreateModalType('cloud_phone');
          setShowCreateModal(true);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Workspace Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          browserProfilesCount={browserProfiles.length}
          cloudPhonesCount={cloudPhones.length}
          activeTasksCount={tasks.filter((t) => t.status === 'running').length}
          proxiesCount={proxies.length}
        />

        {/* Dynamic Content View */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {currentTab === 'profiles' && (
              <ProfileList
                profiles={browserProfiles}
                onLaunchProfile={handleLaunchBrowser}
                onDeleteProfile={handleDeleteBrowserProfile}
                onCloneProfile={handleCloneProfile}
                onWarmCookies={handleWarmCookies}
                onNewProfile={() => {
                  setCreateModalType('browser');
                  setShowCreateModal(true);
                }}
              />
            )}

            {currentTab === 'cloud_phones' && (
              <CloudPhoneList
                devices={cloudPhones}
                onLaunchPhone={handleLaunchPhone}
                onDeletePhone={handleDeletePhone}
                onNewPhone={() => {
                  setCreateModalType('cloud_phone');
                  setShowCreateModal(true);
                }}
              />
            )}

            {currentTab === 'tasks' && (
              <TasksAutomation
                tasks={tasks}
                profiles={browserProfiles}
                devices={cloudPhones}
                onRunTask={handleRunTask}
                onAddTask={handleAddTask}
              />
            )}

            {currentTab === 'proxies' && (
              <ProxyManager
                proxies={proxies}
                onAddProxy={handleAddProxy}
                onDeleteProxy={handleDeleteProxy}
                onTestProxies={handleTestProxies}
                isTesting={isTestingProxies}
              />
            )}

            {currentTab === 'fingerprints' && <FingerprintAuditor />}
          </div>
        </main>
      </div>

      {/* Interactive Browser Session Modal */}
      {activeBrowserProfile && (
        <BrowserViewportModal
          profile={activeBrowserProfile}
          onClose={handleCloseBrowser}
          onUpdateCookiesCount={handleUpdateCookiesCount}
        />
      )}

      {/* Interactive Cloud Phone Stream Modal */}
      {activeCloudPhone && (
        <CloudPhoneModal
          device={activeCloudPhone}
          onClose={handleClosePhone}
        />
      )}

      {/* Create Profile / Cloud Phone Wizard Modal */}
      {showCreateModal && (
        <CreateProfileModal
          initialType={createModalType}
          proxies={proxies}
          onClose={() => setShowCreateModal(false)}
          onCreateBrowserProfile={(p) => setBrowserProfiles((prev) => [p, ...prev])}
          onCreateCloudPhone={(cp) => setCloudPhones((prev) => [cp, ...prev])}
        />
      )}
    </div>
  );
}
