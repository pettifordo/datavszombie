'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GardenView } from '@/components/GardenView';
import { FlowerShow } from '@/components/FlowerShow';
import { DataSteward } from '@/lib/types';
import { mockStewards } from '@/lib/mockData';

type ViewType = 'home' | 'garden' | 'rankings';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedSteward, setSelectedSteward] = useState<DataSteward | null>(null);

  if (currentView === 'garden' && selectedSteward) {
    return (
      <>
        <div className="sticky top-0 z-10 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700/30 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setCurrentView('home')}
              className="px-4 py-2 text-slate-400 hover:text-slate-100 transition-colors font-medium"
            >
              ← Back
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => setCurrentView('home')}
                className="px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-slate-100 rounded-lg transition-all text-sm font-medium shadow-lg"
              >
                Home
              </button>
              <button
                onClick={() => setCurrentView('rankings')}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg transition-all text-sm font-medium shadow-lg"
              >
                Rankings
              </button>
            </div>
          </div>
        </div>
        <GardenView steward={selectedSteward} />
      </>
    );
  }

  if (currentView === 'rankings') {
    return (
      <>
        <div className="sticky top-0 z-10 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700/30 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setCurrentView('home')}
              className="px-4 py-2 text-slate-400 hover:text-slate-100 transition-colors font-medium"
            >
              ← Back
            </button>
            <button
              onClick={() => setCurrentView('home')}
              className="px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-slate-100 rounded-lg transition-all text-sm font-medium shadow-lg"
            >
              Home
            </button>
          </div>
        </div>
        <FlowerShow
          stewards={mockStewards}
          onSelectSteward={(steward) => {
            setSelectedSteward(steward);
            setCurrentView('garden');
          }}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/30 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Data Stewardship Platform</h1>
          <p className="text-sm text-slate-400 mt-2">Monitor and manage your data gardens</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-4">Welcome to Data Stewardship</h2>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            Monitor data quality, identify issues, and maintain healthy data assets across your organization. 
            Each data asset is visualized as a plant – healthy plants indicate good data quality, while issues are shown as threats to manage.
          </p>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-14"
        >
          {[
            { label: 'Active Stewards', value: mockStewards.length, color: 'from-emerald-500 to-emerald-600', icon: '👥' },
            { label: 'Total Assets', value: mockStewards.reduce((sum, s) => sum + s.assets.length, 0), color: 'from-cyan-500 to-cyan-600', icon: '📊' },
            { label: 'Active Issues', value: mockStewards.reduce((sum, s) => sum + s.assets.reduce((aSum, a) => aSum + a.anomalyCount, 0), 0), color: 'from-red-500 to-red-600', icon: '⚠️' },
            { label: 'Org. Health', value: `${Math.round(mockStewards.reduce((sum, s) => sum + s.overallHealth, 0) / mockStewards.length)}%`, color: 'from-purple-500 to-purple-600', icon: '❤️' },
          ].map((kpi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className={`bg-gradient-to-br ${kpi.color} bg-opacity-10 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/40 shadow-xl hover:shadow-2xl transition-all`}
            >
              <div className="text-3xl mb-3">{kpi.icon}</div>
              <p className="text-sm text-slate-400 mb-2">{kpi.label}</p>
              <p className={`text-4xl font-bold bg-gradient-to-r ${kpi.color} bg-clip-text text-transparent`}>{kpi.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-14"
        >
          <button
            onClick={() => {
              setSelectedSteward(mockStewards[0]);
              setCurrentView('garden');
            }}
            className="flex-1 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-xl transition-all shadow-xl hover:shadow-2xl text-lg"
          >
            🌱 Explore Your Data Garden
          </button>

          <button
            onClick={() => setCurrentView('rankings')}
            className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all shadow-xl hover:shadow-2xl text-lg"
          >
            🏆 View Stewardship Rankings
          </button>
        </motion.div>

        {/* Quick Access - Stewards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-3xl font-bold text-slate-100 mb-6">Quick Access</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {mockStewards.map((steward) => {
              const healthColor = steward.overallHealth >= 85 ? 'from-emerald-500 to-emerald-600' : 
                                steward.overallHealth >= 70 ? 'from-cyan-500 to-cyan-600' : 
                                steward.overallHealth >= 55 ? 'from-yellow-500 to-yellow-600' : 
                                steward.overallHealth >= 40 ? 'from-orange-500 to-orange-600' : 'from-red-500 to-red-600';

              return (
                <motion.button
                  key={steward.id}
                  whileHover={{ scale: 1.02, y: -4 }}
                  onClick={() => {
                    setSelectedSteward(steward);
                    setCurrentView('garden');
                  }}
                  className={`text-left bg-gradient-to-br ${healthColor} bg-opacity-10 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/40 hover:border-slate-600/60 transition-all shadow-xl hover:shadow-2xl`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-bold text-slate-100 text-lg">{steward.name}</p>
                      <p className="text-sm text-slate-400 mt-1">{steward.department}</p>
                    </div>
                    <div className="text-2xl">
                      {steward.overallHealth >= 85 ? '🌻' : steward.overallHealth >= 70 ? '🌺' : steward.overallHealth >= 55 ? '🌾' : '🌱'}
                    </div>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-slate-600/30">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Assets</span>
                      <span className="text-sm font-bold text-slate-200">{steward.assets.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Issues</span>
                      <span className="text-sm font-bold text-red-400">{steward.assets.reduce((sum, a) => sum + a.anomalyCount, 0)}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block mb-2">Health Score</span>
                      <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${healthColor}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${steward.overallHealth}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                      <p className={`text-sm font-bold mt-2 bg-gradient-to-r ${healthColor} bg-clip-text text-transparent`}>{steward.overallHealth}%</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
