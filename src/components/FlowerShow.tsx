'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { DataSteward } from '@/lib/types';

interface FlowerShowProps {
  stewards: DataSteward[];
  onSelectSteward: (steward: DataSteward) => void;
}

export function FlowerShow({ stewards, onSelectSteward }: FlowerShowProps) {
  const sorted = [...stewards].sort((a, b) => b.overallHealth - a.overallHealth);

  const getHealthStatus = (health: number) => {
    if (health >= 85) return { label: 'Excellent', color: 'text-green-400', bg: 'bg-green-500/10' };
    if (health >= 70) return { label: 'Good', color: 'text-emerald-400', bg: 'bg-emerald-500/10' };
    if (health >= 55) return { label: 'Fair', color: 'text-yellow-400', bg: 'bg-yellow-500/10' };
    if (health >= 40) return { label: 'At Risk', color: 'text-orange-400', bg: 'bg-orange-500/10' };
    return { label: 'Critical', color: 'text-red-400', bg: 'bg-red-500/10' };
  };

  return (
    <div className="min-h-screen bg-navy-900 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-700/50 sticky top-0 z-40 bg-navy-900/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Data Stewardship Rankings</h1>
          <p className="text-sm text-slate-400">Benchmark your data garden against organizational peers</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
            <p className="text-sm text-slate-400 mb-2">Total Stewards</p>
            <p className="text-3xl font-bold text-slate-100">{stewards.length}</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
            <p className="text-sm text-slate-400 mb-2">Total Assets</p>
            <p className="text-3xl font-bold text-blue-400">
              {stewards.reduce((sum, s) => sum + s.assets.length, 0)}
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
            <p className="text-sm text-slate-400 mb-2">Org. Avg Health</p>
            <p className="text-3xl font-bold text-emerald-400">
              {Math.round(stewards.reduce((sum, s) => sum + s.overallHealth, 0) / stewards.length)}%
            </p>
          </div>
        </motion.div>

        {/* Rankings Table */}
        <div className="space-y-3">
          {sorted.map((steward, idx) => {
            const healthStatus = getHealthStatus(steward.overallHealth);
            const medalEmoji = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : null;

            return (
              <motion.button
                key={steward.id}
                onClick={() => onSelectSteward(steward)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className="w-full text-left"
              >
                <div
                  className={`relative border rounded-lg p-4 transition-all hover:border-slate-600 ${
                    idx < 3
                      ? 'bg-slate-800/30 border-slate-700/50'
                      : 'bg-slate-800/10 border-slate-700/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank Badge */}
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-slate-700/50 rounded-lg">
                      {medalEmoji ? (
                        <motion.div
                          className="text-2xl"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                        >
                          {medalEmoji}
                        </motion.div>
                      ) : (
                        <span className="text-lg font-bold text-slate-400">#{idx + 1}</span>
                      )}
                    </div>

                    {/* Steward Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-100 text-base">{steward.name}</h3>
                      <p className="text-sm text-slate-400">{steward.department}</p>
                    </div>

                    {/* Metrics */}
                    <div className="flex-shrink-0 flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs text-slate-400 mb-1">Assets</p>
                        <p className="text-lg font-bold text-slate-300">{steward.assets.length}</p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-slate-400 mb-1">Issues</p>
                        <p className={`text-lg font-bold ${steward.assets.reduce((sum, a) => sum + a.anomalyCount, 0) > 0 ? 'text-red-400' : 'text-green-400'}`}>
                          {steward.assets.reduce((sum, a) => sum + a.anomalyCount, 0)}
                        </p>
                      </div>

                      <div className="text-right min-w-32">
                        <p className="text-xs text-slate-400 mb-2">Overall Health</p>
                        <div className="space-y-1">
                          <div className="w-24 bg-slate-700 rounded-full h-2 overflow-hidden">
                            <motion.div
                              className={`h-full ${
                                steward.overallHealth >= 85
                                  ? 'bg-green-500'
                                  : steward.overallHealth >= 70
                                    ? 'bg-emerald-500'
                                    : steward.overallHealth >= 55
                                      ? 'bg-yellow-500'
                                      : steward.overallHealth >= 40
                                        ? 'bg-orange-500'
                                        : 'bg-red-500'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${steward.overallHealth}%` }}
                              transition={{ duration: 0.8, delay: idx * 0.05 + 0.2 }}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-bold ${healthStatus.color}`}>
                              {steward.overallHealth}%
                            </p>
                            <p className={`text-xs ${healthStatus.color}`}>
                              {healthStatus.label}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0 text-slate-600">
                      <motion.div whileHover={{ x: 4 }}>
                        <TrendingUp size={20} />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-slate-800/50 border border-slate-700/50 rounded-lg p-6"
        >
          <h3 className="font-semibold text-slate-100 mb-4">Health Status Reference</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <p className="text-sm font-medium text-slate-100">Excellent</p>
              </div>
              <p className="text-xs text-slate-400">85-100%</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <p className="text-sm font-medium text-slate-100">Good</p>
              </div>
              <p className="text-xs text-slate-400">70-84%</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <p className="text-sm font-medium text-slate-100">Fair</p>
              </div>
              <p className="text-xs text-slate-400">55-69%</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <p className="text-sm font-medium text-slate-100">At Risk</p>
              </div>
              <p className="text-xs text-slate-400">40-54%</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <p className="text-sm font-medium text-slate-100">Critical</p>
              </div>
              <p className="text-xs text-slate-400">0-39%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
