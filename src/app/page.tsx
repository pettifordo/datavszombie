'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GardenView } from '@/components/GardenView';
import { FlowerShow } from '@/components/FlowerShow';
import { DataSteward } from '@/lib/types';
import { mockStewards } from '@/lib/mockData';
import { TrendingUp, Zap, Shield } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-x-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl top-10 -left-48"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl bottom-10 -right-48"
        />
      </div>

      {/* Header */}
      <div className="border-b border-slate-700/30 bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl sticky top-0 z-40 relative">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="text-3xl"
              >
                🌱
              </motion.div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Data Stewardship Platform
              </h1>
            </div>
            <p className="text-slate-400 text-lg">Cultivate healthy data gardens. Defend against quality threats.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-20"
        >
          <h2 className="text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Monitor.</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Manage.</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Thrive.</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
            Your data is the lifeblood of innovation. We help stewards cultivate thriving digital gardens by tracking health metrics, identifying threats, and maintaining quality at every level.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {[
            { 
              label: 'Active Stewards', 
              value: mockStewards.length, 
              icon: Shield,
              gradient: 'from-emerald-500 to-emerald-600',
              accent: 'emerald'
            },
            { 
              label: 'Data Assets', 
              value: mockStewards.reduce((sum, s) => sum + s.assets.length, 0), 
              icon: TrendingUp,
              gradient: 'from-cyan-500 to-cyan-600',
              accent: 'cyan'
            },
            { 
              label: 'Active Issues', 
              value: mockStewards.reduce((sum, s) => sum + s.assets.reduce((aSum, a) => aSum + a.anomalyCount, 0), 0), 
              icon: Zap,
              gradient: 'from-red-500 to-red-600',
              accent: 'red'
            },
            { 
              label: 'Org. Health', 
              value: `${Math.round(mockStewards.reduce((sum, s) => sum + s.overallHealth, 0) / mockStewards.length)}%`, 
              icon: null,
              gradient: 'from-purple-500 to-purple-600',
              accent: 'purple'
            },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative bg-gradient-to-br ${stat.gradient} bg-opacity-10 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/40 shadow-xl hover:shadow-2xl transition-all overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    {Icon && <Icon className={`w-6 h-6 text-${stat.accent}-400`} />}
                  </div>
                  <p className="text-sm text-slate-400 mb-3 font-medium">{stat.label}</p>
                  <p className={`text-5xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6 mb-24"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedSteward(mockStewards[0]);
              setCurrentView('garden');
            }}
            className="flex-1 px-8 py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 text-white font-bold rounded-xl transition-all shadow-2xl hover:shadow-cyan-500/50 text-lg group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              🌱 Explore Your Data Garden
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentView('rankings')}
            className="flex-1 px-8 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-500 hover:via-pink-500 hover:to-red-500 text-white font-bold rounded-xl transition-all shadow-2xl hover:shadow-purple-500/50 text-lg group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-red-700 opacity-0 group-hover:opacity-20 transition-opacity" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              🏆 View Stewardship Rankings
            </span>
          </motion.button>
        </motion.div>

        {/* Stewards Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="mb-8">
            <h3 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">Your Stewards</h3>
            <p className="text-slate-400 text-lg">Track performance across teams and departments</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {mockStewards.map((steward, idx) => {
              const healthScore = steward.overallHealth;
              let gradientClass, healthColor, badge;
              
              if (healthScore >= 85) {
                gradientClass = 'from-emerald-500 to-cyan-500';
                healthColor = 'emerald';
                badge = '🌻';
              } else if (healthScore >= 70) {
                gradientClass = 'from-cyan-500 to-blue-500';
                healthColor = 'cyan';
                badge = '🌺';
              } else if (healthScore >= 55) {
                gradientClass = 'from-yellow-500 to-yellow-600';
                healthColor = 'yellow';
                badge = '🌾';
              } else if (healthScore >= 40) {
                gradientClass = 'from-orange-500 to-red-500';
                healthColor = 'orange';
                badge = '🌱';
              } else {
                gradientClass = 'from-red-500 to-red-600';
                healthColor = 'red';
                badge = '💀';
              }

              const issueCount = steward.assets.reduce((sum, a) => sum + a.anomalyCount, 0);

              return (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.05 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  onClick={() => {
                    setSelectedSteward(steward);
                    setCurrentView('garden');
                  }}
                  className={`text-left group relative bg-gradient-to-br ${gradientClass} bg-opacity-[0.08] backdrop-blur-xl rounded-2xl p-8 border border-slate-700/40 hover:border-slate-600/60 transition-all shadow-xl hover:shadow-2xl overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity" />
                  
                  <div className="relative z-10">
                    {/* Header with badge */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h4 className="text-xl font-bold text-slate-100 mb-1">{steward.name}</h4>
                        <p className="text-sm text-slate-400">{steward.department}</p>
                      </div>
                      <div className="text-4xl">{badge}</div>
                    </div>

                    {/* Stats Row 1 */}
                    <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-slate-600/30">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Assets</p>
                        <p className="text-lg font-bold text-slate-200">{steward.assets.length}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Issues</p>
                        <p className={`text-lg font-bold ${issueCount > 0 ? 'text-red-400' : 'text-green-400'}`}>
                          {issueCount}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Health</p>
                        <p className={`text-lg font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
                          {healthScore}%
                        </p>
                      </div>
                    </div>

                    {/* Health Bar */}
                    <div>
                      <div className="w-full h-3 bg-slate-700/50 rounded-full overflow-hidden mb-3">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${gradientClass}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${healthScore}%` }}
                          transition={{ duration: 1, delay: 0.4 + idx * 0.05 }}
                        />
                      </div>
                      <p className="text-xs text-slate-400 text-center">
                        {healthScore >= 85 ? 'Excellent' : healthScore >= 70 ? 'Good' : healthScore >= 55 ? 'Fair' : healthScore >= 40 ? 'At Risk' : 'Critical'}
                      </p>
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
