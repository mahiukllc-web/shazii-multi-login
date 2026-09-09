import React, { useState, useEffect } from 'react';
import {
  Zap,
  Play,
  Square,
  Clock,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Plus,
  RefreshCw,
  Code,
  Cookie,
  Smartphone,
  Globe,
  Sliders,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { AutomationTask, BrowserProfile, CloudPhoneDevice } from '../types';

interface TasksAutomationProps {
  tasks: AutomationTask[];
  profiles: BrowserProfile[];
  devices: CloudPhoneDevice[];
  onRunTask: (taskId: string) => void;
  onAddTask: (task: AutomationTask) => void;
}

export const TasksAutomation: React.FC<TasksAutomationProps> = ({
  tasks,
  profiles,
  devices,
  onRunTask,
  onAddTask,
}) => {
  const [selectedTaskId, setSelectedTaskId] = useState<string>(tasks[0]?.id || '');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'queue' | 'templates' | 'script_editor'>('queue');
  
  // Custom Script State
  const [scriptCode, setScriptCode] = useState<string>(`// Multilogin Antidetect Automation Script (Puppeteer / Playwright)
const { MultiloginClient } = require('@multilogin/core-sdk');

async function runSessionAutomation() {
  const client = new MultiloginClient({ port: 35000 });
  
  // Connect to target profile via remote debugging port
  const browser = await client.connectProfile('prof-1');
  const page = await browser.newPage();
  
  // Natural human delay helper (500ms - 2200ms)
  const humanDelay = () => new Promise(res => setTimeout(res, Math.floor(Math.random() * 1700) + 500));
  
  console.log('[AUTOMATION] Navigating to verified marketplace...');
  await page.goto('https://sellercentral.amazon.com', { waitUntil: 'networkidle2' });
  await humanDelay();
  
  // Perform organic mouse curve movements
  await page.mouse.move(340, 280, { steps: 25 });
  await page.evaluate(() => window.scrollBy({ top: 400, behavior: 'smooth' }));
  
  console.log('[AUTOMATION] Verified session cookies preserved: 142');
  return { success: true, cookiesCount: 142 };
}

runSessionAutomation();`);

  const [newTitle, setNewTitle] = useState<string>('');
  const [newType, setNewType] = useState<AutomationTask['scriptType']>('cookie_warm');
  const [selectedTargetIds, setSelectedTargetIds] = useState<string[]>([]);

  const selectedTask = tasks.find((t) => t.id === selectedTaskId) || tasks[0];

  const handleStartTask = (id: string) => {
    onRunTask(id);
  };

  const handleCreateTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const created: AutomationTask = {
      id: `task-${Date.now()}`,
      title: newTitle,
      description: 'Custom automated task created for Multilogin profiles and mobile devices.',
      targetProfileIds: selectedTargetIds.length > 0 ? selectedTargetIds : [profiles[0]?.id || 'prof-1'],
      status: 'idle',
      progress: 0,
      currentStep: 'Scheduled & Standby',
      totalSteps: 5,
      currentStepIndex: 0,
      scriptType: newType,
      duration: '~3 minutes',
      logs: [
        {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          type: 'info',
          message: `Task created and assigned to ${selectedTargetIds.length || 1} target(s).`,
        },
      ],
    };

    onAddTask(created);
    setSelectedTaskId(created.id);
    setShowCreateModal(false);
    setNewTitle('');
    setSelectedTargetIds([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center space-x-2">
            <span>Automation &amp; Task Engine</span>
            <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-bold text-amber-300 border border-amber-500/30">
              {tasks.length} Workflows
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Automate cookie warming, multi-account health verification, social engagement, and headless Playwright workflows with randomized human behavior.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-amber-600/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>+ Create Automation Task</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('queue')}
          className={`flex items-center space-x-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            activeTab === 'queue'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
          }`}
        >
          <Zap className="h-3.5 w-3.5" />
          <span>Active Task Queue</span>
        </button>

        <button
          onClick={() => setActiveTab('script_editor')}
          className={`flex items-center space-x-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            activeTab === 'script_editor'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
          }`}
        >
          <Code className="h-3.5 w-3.5" />
          <span>Puppeteer / Playwright IDE</span>
        </button>
      </div>

      {activeTab === 'queue' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tasks List (Left Column) */}
          <div className="space-y-3 lg:col-span-1">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
              Workflow Tasks
            </div>

            <div className="space-y-2.5">
              {tasks.map((task) => {
                const isSelected = task.id === selectedTaskId;
                return (
                  <div
                    key={task.id}
                    onClick={() => setSelectedTaskId(task.id)}
                    className={`rounded-2xl border p-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-indigo-500/80 bg-[#161928] shadow-lg shadow-indigo-950/30'
                        : 'border-slate-800/80 bg-[#12141e] hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                            task.status === 'running'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
                              : 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/30'
                          }`}
                        >
                          <Zap className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{task.title}</h4>
                          <span className="text-[10px] text-slate-400">
                            {task.targetProfileIds.length} target profiles
                          </span>
                        </div>
                      </div>

                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold border ${
                          task.status === 'running'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                            : task.status === 'completed'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {task.status.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 mt-2 line-clamp-2">
                      {task.description}
                    </p>

                    {/* Progress indicator */}
                    {task.status === 'running' && (
                      <div className="mt-3 space-y-1">
                        <div className="flex justify-between text-[10px] text-amber-300 font-semibold">
                          <span>{task.currentStep}</span>
                          <span>{task.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                          <div
                            className="h-full bg-amber-500 transition-all duration-300"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Task Detailed View & Execution Console (Right Column) */}
          {selectedTask && (
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-2xl border border-slate-800 bg-[#12141f] p-5 space-y-5">
                {/* Task details header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-bold text-white">{selectedTask.title}</h3>
                      <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/30 uppercase">
                        {selectedTask.scriptType.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{selectedTask.description}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      id={`btn-run-task-${selectedTask.id}`}
                      onClick={() => handleStartTask(selectedTask.id)}
                      disabled={selectedTask.status === 'running'}
                      className="flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 disabled:opacity-50 px-4 py-2 text-xs font-bold text-white shadow-md shadow-amber-600/30 transition-all"
                    >
                      <Play className="h-3.5 w-3.5 fill-white" />
                      <span>{selectedTask.status === 'running' ? 'Running Task...' : 'Run Task Now'}</span>
                    </button>
                  </div>
                </div>

                {/* Status & Timing Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
                    <div className="text-slate-400 text-[11px]">Execution Status</div>
                    <div className="font-bold text-white capitalize mt-1 flex items-center space-x-1.5">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          selectedTask.status === 'running'
                            ? 'bg-amber-400 animate-ping'
                            : selectedTask.status === 'completed'
                            ? 'bg-emerald-400'
                            : 'bg-slate-500'
                        }`}
                      />
                      <span>{selectedTask.status}</span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
                    <div className="text-slate-400 text-[11px]">Target Count</div>
                    <div className="font-bold text-white mt-1">
                      {selectedTask.targetProfileIds.length} Profiles
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
                    <div className="text-slate-400 text-[11px]">Est. Duration</div>
                    <div className="font-bold text-white mt-1">{selectedTask.duration}</div>
                  </div>

                  <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
                    <div className="text-slate-400 text-[11px]">Last Execution</div>
                    <div className="font-bold text-slate-300 mt-1 truncate">
                      {selectedTask.lastRun || 'Never'}
                    </div>
                  </div>
                </div>

                {/* Real-Time Live Execution Logs Terminal */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center space-x-2 font-bold text-slate-200">
                      <Terminal className="h-4 w-4 text-amber-400" />
                      <span>Automation Execution Console</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">Log Buffer: AES Encrypted</span>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-[#0c0e15] p-4 font-mono text-xs space-y-2 max-h-72 overflow-y-auto">
                    {selectedTask.logs.length === 0 ? (
                      <div className="text-slate-500">No logs generated yet. Click "Run Task Now" to begin.</div>
                    ) : (
                      selectedTask.logs.map((log) => (
                        <div key={log.id} className="flex items-start space-x-3">
                          <span className="text-slate-500 select-none text-[11px]">[{log.timestamp}]</span>
                          <span
                            className={
                              log.type === 'success'
                                ? 'text-emerald-400'
                                : log.type === 'error'
                                ? 'text-rose-400'
                                : log.type === 'warn'
                                ? 'text-amber-400'
                                : 'text-slate-300'
                            }
                          >
                            {log.message}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Puppeteer / Playwright Code IDE */
        <div className="rounded-2xl border border-slate-800 bg-[#12141f] p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2 text-indigo-400">
              <Code className="h-5 w-5" />
              <h3 className="font-bold text-sm text-white">
                Multilogin Headless SDK Script Runner (Node.js)
              </h3>
            </div>
            <button
              onClick={() => {
                if (selectedTask) handleStartTask(selectedTask.id);
              }}
              className="flex items-center space-x-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-bold text-white transition-all shadow-md shadow-indigo-600/30"
            >
              <Play className="h-3.5 w-3.5 fill-white" />
              <span>Execute Playwright Script</span>
            </button>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#0c0e16] p-4 font-mono text-xs text-indigo-200">
            <textarea
              rows={14}
              value={scriptCode}
              onChange={(e) => setScriptCode(e.target.value)}
              className="w-full bg-transparent resize-none focus:outline-none font-mono text-xs text-slate-200"
            />
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-[#151724] p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Create New Automation Task</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTaskSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Organic Cookie Warmer for TikTok Ads"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Automation Workflow Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="cookie_warm">Smart Cookie Warmer (Bypass anti-fraud)</option>
                  <option value="login_verify">Bulk Session &amp; 2FA Status Verification</option>
                  <option value="social_action">Organic Social Feed Scrolling &amp; Engagement</option>
                  <option value="custom_script">Custom Playwright / Puppeteer Script</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Assign Target Profiles</label>
                <div className="max-h-36 overflow-y-auto border border-slate-700 rounded-lg p-2 space-y-1.5 bg-slate-900/60">
                  {profiles.map((p) => (
                    <label key={p.id} className="flex items-center space-x-2 cursor-pointer text-slate-300 hover:text-white">
                      <input
                        type="checkbox"
                        checked={selectedTargetIds.includes(p.id)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedTargetIds([...selectedTargetIds, p.id]);
                          else setSelectedTargetIds(selectedTargetIds.filter((id) => id !== p.id));
                        }}
                        className="rounded border-slate-700 bg-slate-800 text-indigo-600"
                      />
                      <span>{p.name}</span>
                      <span className="text-[10px] text-slate-500">({p.group})</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-lg bg-slate-800 hover:bg-slate-700 px-4 py-2 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-5 py-2 text-white font-bold"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
