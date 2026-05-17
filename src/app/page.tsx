'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GardenView } from '@/components/GardenView';
import { FlowerShow } from '@/components/FlowerShow';
import { DataSteward } from '@/lib/types';
import { mockStewards } from '@/lib/mockData';
import { LogOut, BarChart3 } from 'lucide-react';

type ViewType = 'home' | 'garden' | 'rankings';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedSteward, setSelectedSteward] = useState<DataSteward | null>(null);

  return (
    <main className="min-h-screen bg-navy-900 text-slate-100 flex flex-col">
      {currentView === 'home' && (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="border-b border-slate-700/50 bg-navy-900/80 backdrop-blur-sm sticky top-0 z-40 flex-shrink-0">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-100">Data Stewardship Platform</h1>
                <p className="text-sm text-slate-400">Monitor and manage your data gardens</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-slate-800 rounded transition-colors">
                  <BarChart3 size={20} className="text-slate-400" />
                </button>
                <button className="p-2 hover:bg-slate-800 rounded transition-colors">
                  <LogOut size={20} className="text-slate-400" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto max-w-7xl mx-auto w-full px-6 py-12">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h2 className="text-4xl font-bold text-slate-100 mb-3">Welcome to Data Stewardship</h2>
              <p className="text-lg text-slate-400 max-w-2xl">
                Monitor data quality, identify issues, and maintain healthy data assets across your organization. 
                Each data asset is visualized as a plant – healthy plants indicate good data quality, while issues are shown as threats to manage.
              </p>
            </motion.div>

            {/* KPI Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12"
            >
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                <p className="text-sm text-slate-400 mb-2">Active Stewards</p>
                <p className="text-3xl font-bold text-emerald-400">{mockStewards.length}</p>
                <p className="text-xs text-slate-500 mt-2">Managing data quality</p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                <p className="text-sm text-slate-400 mb-2">Total Assets</p>
                <p className="text-3xl font-bold text-blue-400">
                  {mockStewards.reduce((sum, s) => sum + s.assets.length, 0)}
                </p>
                <p className="text-xs text-slate-500 mt-2">Monitored datasets</p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                <p className="text-sm text-slate-400 mb-2">Active Issues</p>
                <p className="text-3xl font-bold text-red-400">
                  {mockStewards.reduce((sum, s) => sum + s.assets.reduce((aSum, a) => aSum + a.anomalyCount, 0), 0)}
                </p>
                <p className="text-xs text-slate-500 mt-2">Requiring attention</p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                <p className="text-sm text-slate-400 mb-2">Org. Health</p>
                <p className="text-3xl font-bold text-emerald-400">
                  {Math.round(mockStewards.reduce((sum, s) => sum + s.overallHealth, 0) / mockStewards.length)}%
                </p>
                <p className="text-xs text-slate-500 mt-2">Average score</p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <button
                onClick={() => {
                  setSelectedSteward(mockStewards[0]);
                  setCurrentView('garden');
                }}
                className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
              >
                Explore Your Data Garden
              </button>

              <button
                onClick={() => setCurrentView('rankings')}
                className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
              >
                View Stewardship Rankings
              </button>
            </motion.div>

            {/* Quick Access - Stewards Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-slate-100 mb-4">Quick Access</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
                {mockStewards.map((steward, idx) => {
                  const healthStatus = steward.overallHealth >= 85 ? 'Excellent' : 
                                     steward.overallHealth >= 70 ? 'Good' : 
                                     steward.overallHealth >= 55 ? 'Fair' : 
                                     steward.overallHealth >= 40 ? 'At Risk' : 'Critical';
                  
                  const healthColor = steward.overallHealth >= 85 ? 'text-green-400' : 
                                    steward.overallHealth >= 70 ? 'text-emerald-400' : 
                                    steward.overallHealth >= 55 ? 'text-yellow-400' : 
                                    steward.overallHealth >= 40 ? 'text-orange-400' : 'text-red-400';

                  return (
                    <motion.button
                      key={steward.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        setSelectedSteward(steward);
                        setCurrentView('garden');
                      }}
                      className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 text-left hover:border-slate-600 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-100">{steward.name}</p>
                          <p className="text-sm text-slate-400 mt-1">{steward.department}</p>
                        </div>
                      </div>
                      <div className="space-y-2 pt-3 border-t border-slate-600/30">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">Health Status</span>
                          <span className={`text-xs font-bold ${healthColor}`}>{healthStatus}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">Overall Score</span>
                          <span className={`text-lg font-bold ${healthColor}`}>{steward.overallHealth}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">Assets</span>
                          <span className="text-xs font-semibold text-slate-300">{steward.assets.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">Issues</span>
                          <span className={`text-xs font-semibold ${steward.assets.reduce((sum, a) => sum + a.anomalyCount, 0) > 0 ? 'text-red-400' : 'text-green-400'}`}>
                            {steward.assets.reduce((sum, a) => sum + a.anomalyCount, 0)}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {currentView === 'garden' && selectedSteward && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="sticky top-0 z-10 bg-navy-900 border-b border-slate-700/50 flex-shrink-0">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <button
                onClick={() => setCurrentView('home')}
                className="px-4 py-2 text-slate-400 hover:text-slate-100 transition-colors"
              >
                ← Back
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentView('home')}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded transition-colors text-sm"
                >
                  Home
                </button>
                <button
                  onClick={() => setCurrentView('rankings')}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded transition-colors text-sm"
                >
                  Rankings
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <GardenView steward={selectedSteward} />
          </div>
        </div>
      )}

      {currentView === 'rankings' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="sticky top-0 z-10 bg-navy-900 border-b border-slate-700/50 flex-shrink-0">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
              <button
                onClick={() => setCurrentView('home')}
                className="px-4 py-2 text-slate-400 hover:text-slate-100 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={() => setCurrentView('home')}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded transition-colors text-sm"
              >
                Home
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <FlowerShow
              stewards={mockStewards}
              onSelectSteward={(steward) => {
                setSelectedSteward(steward);
                setCurrentView('garden');
              }}
            />
          </div>
        </div>
      )}
    </main>
  );
}
