'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GardenView } from '@/components/GardenView';
import { FlowerShow } from '@/components/FlowerShow';
import { DataSteward } from '@/lib/types';
import { mockStewards } from '@/lib/mockData';

type ViewType = 'home' | 'garden' | 'flower-show';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedSteward, setSelectedSteward] = useState<DataSteward | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {currentView === 'home' && (
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              className="text-8xl mb-6"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -10, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              🌻
            </motion.div>

            <h1 className="text-6xl font-black bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-3">
              Data vs. Zombies
            </h1>

            <p className="text-2xl text-gray-300 mb-2">Protect Your Data Garden</p>

            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-4">
              Your data is the lifeblood of innovation. Help your data stewards cultivate healthy,
              thriving gardens while defending against the zombie apocalypse of poor data quality.
            </p>

            <div className="flex flex-wrap gap-3 justify-center text-sm text-gray-300 mt-6">
              <span className="flex items-center gap-1">
                🌻 Plant healthy data assets
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                ⚔️ Fight quality zombies
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                🏆 Compete in flower shows
              </span>
            </div>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-3xl"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20">
              <div className="text-4xl font-bold text-emerald-400">{mockStewards.length}</div>
              <p className="text-gray-300 mt-2">Data Stewards</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20">
              <div className="text-4xl font-bold text-blue-400">
                {mockStewards.reduce((sum, s) => sum + s.assets.length, 0)}
              </div>
              <p className="text-gray-300 mt-2">Data Assets</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20">
              <div className="text-4xl font-bold text-yellow-400">
                {Math.round(mockStewards.reduce((sum, s) => sum + s.overallHealth, 0) / mockStewards.length)}
              </div>
              <p className="text-gray-300 mt-2">Avg Garden Health</p>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedSteward(mockStewards[0]);
                setCurrentView('garden');
              }}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg text-lg hover:shadow-lg transition-shadow"
            >
              👤 Explore a Garden
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView('flower-show')}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg text-lg hover:shadow-lg transition-shadow"
            >
              🏆 View Flower Show
            </motion.button>
          </motion.div>

          {/* Steward list */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-16 w-full max-w-3xl"
          >
            <h2 className="text-2xl font-bold text-gray-200 mb-4">Quick Access</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mockStewards.map((steward, idx) => (
                <motion.button
                  key={steward.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setSelectedSteward(steward);
                    setCurrentView('garden');
                  }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 text-left hover:bg-white/20 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white group-hover:text-emerald-300">{steward.name}</p>
                      <p className="text-sm text-gray-400">{steward.department}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-emerald-400">{steward.overallHealth}%</p>
                      <p className="text-xs text-gray-400">{steward.assets.length} assets</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {currentView === 'garden' && selectedSteward && (
        <div>
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md shadow-md">
            <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">{selectedSteward.name}'s Garden</h1>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentView('home')}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  ← Home
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentView('flower-show')}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors"
                >
                  🏆 Flower Show
                </motion.button>
              </div>
            </div>
          </div>
          <GardenView steward={selectedSteward} />
        </div>
      )}

      {currentView === 'flower-show' && (
        <div>
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md shadow-md">
            <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">🏆 Flower Show</h1>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView('home')}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                ← Home
              </motion.button>
            </div>
          </div>
          <FlowerShow
            stewards={mockStewards}
            onSelectSteward={(steward) => {
              setSelectedSteward(steward);
              setCurrentView('garden');
            }}
          />
        </div>
      )}
    </main>
  );
}
