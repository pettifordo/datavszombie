'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Zap } from 'lucide-react';
import { DataSteward } from '@/lib/types';

interface FlowerShowProps {
  stewards: DataSteward[];
  onSelectSteward: (steward: DataSteward) => void;
}

export function FlowerShow({ stewards, onSelectSteward }: FlowerShowProps) {
  const sorted = [...stewards].sort((a, b) => b.overallHealth - a.overallHealth);

  const getMedalEmoji = (rank: number) => {
    if (rank === 0) return '🥇';
    if (rank === 1) return '🥈';
    if (rank === 2) return '🥉';
    return null;
  };

  const getStatusEmoji = (health: number) => {
    if (health >= 85) return '🌻';
    if (health >= 70) return '🌺';
    if (health >= 55) return '🌾';
    if (health >= 40) return '🌿';
    if (health >= 20) return '🍃';
    return '💀';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-yellow-50 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🌸 🌼 🌷 🌹 🌺
        </motion.div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Data Steward Flower Show
        </h1>
        <p className="text-gray-600 text-lg">
          Celebrating the healthiest data gardens across the organization
        </p>
      </motion.div>

      {/* Leaderboard */}
      <div className="max-w-4xl mx-auto">
        {sorted.map((steward, idx) => (
          <motion.button
            key={steward.id}
            onClick={() => onSelectSteward(steward)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02, x: 10 }}
            className="w-full mb-4 text-left cursor-pointer group"
          >
            <div
              className={`relative rounded-xl p-6 overflow-hidden transition-all ${
                idx === 0
                  ? 'bg-gradient-to-r from-yellow-200 to-yellow-100 border-2 border-yellow-400 shadow-2xl'
                  : idx === 1
                    ? 'bg-gradient-to-r from-gray-200 to-gray-100 border-2 border-gray-400 shadow-lg'
                    : idx === 2
                      ? 'bg-gradient-to-r from-orange-200 to-orange-100 border-2 border-orange-400 shadow-lg'
                      : 'bg-white border-2 border-gray-200 shadow-md hover:shadow-lg'
              }`}
            >
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-10 overflow-hidden">
                <div className="absolute top-2 right-8 text-4xl">🌻</div>
                <div className="absolute bottom-2 left-4 text-3xl">🌺</div>
              </div>

              <div className="relative flex items-center justify-between">
                {/* Rank and name */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center justify-center">
                    {getMedalEmoji(idx) && (
                      <motion.div
                        className="text-3xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                      >
                        {getMedalEmoji(idx)}
                      </motion.div>
                    )}
                    {!getMedalEmoji(idx) && (
                      <div className="text-2xl font-bold text-gray-500 w-8 text-center">{idx + 1}</div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{steward.name}</h3>
                    <p className="text-sm text-gray-600">{steward.department}</p>
                  </div>
                </div>

                {/* Health visualization */}
                <div className="flex items-center gap-4 ml-4">
                  <div className="text-right">
                    <div className="w-32 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className={`h-full ${
                          steward.overallHealth >= 85
                            ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                            : steward.overallHealth >= 70
                              ? 'bg-gradient-to-r from-lime-400 to-green-500'
                              : steward.overallHealth >= 55
                                ? 'bg-gradient-to-r from-yellow-400 to-lime-500'
                                : 'bg-gradient-to-r from-red-400 to-yellow-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${steward.overallHealth}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1 + 0.2 }}
                      />
                    </div>
                    <p className="text-xl font-bold text-gray-800 mt-1">{steward.overallHealth}%</p>
                  </div>

                  <div className="text-4xl">{getStatusEmoji(steward.overallHealth)}</div>
                </div>
              </div>

              {/* Asset count */}
              <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                <Zap size={14} className="text-yellow-500" />
                <span>{steward.assets.length} data assets</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 max-w-4xl mx-auto bg-white rounded-xl p-6 border-2 border-gray-200"
      >
        <h3 className="font-bold text-gray-800 mb-3">Garden Health Stages</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
          <div>
            <div className="text-2xl mb-1">🌻</div>
            <p className="text-xs text-gray-600">Flourishing (85+%)</p>
          </div>
          <div>
            <div className="text-2xl mb-1">🌺</div>
            <p className="text-xs text-gray-600">Blooming (70-84%)</p>
          </div>
          <div>
            <div className="text-2xl mb-1">🌾</div>
            <p className="text-xs text-gray-600">Growing (55-69%)</p>
          </div>
          <div>
            <div className="text-2xl mb-1">🌿</div>
            <p className="text-xs text-gray-600">Sprouting (40-54%)</p>
          </div>
          <div>
            <div className="text-2xl mb-1">🍃</div>
            <p className="text-xs text-gray-600">Wilting (20-39%)</p>
          </div>
          <div>
            <div className="text-2xl mb-1">💀</div>
            <p className="text-xs text-gray-600">Dead (0-19%)</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
