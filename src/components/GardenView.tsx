'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plant } from './Plant';
import { DataAsset, DataSteward } from '@/lib/types';
import { X, ExternalLink, AlertTriangle } from 'lucide-react';

interface GardenViewProps {
  steward: DataSteward;
}

const ISSUE_TYPES = [
  { type: 'Stale Data', severity: 'high', description: 'Data not updated in 7+ days', link: '/admin/refresh-data' },
  { type: 'Missing Lineage', severity: 'medium', description: 'Lineage metadata incomplete', link: '/data-catalog/lineage' },
  { type: 'Schema Drift', severity: 'critical', description: 'Unexpected column changes detected', link: '/quality/schema-rules' },
  { type: 'High Anomalies', severity: 'high', description: 'Statistical outliers detected in dataset', link: '/quality/anomalies' },
  { type: 'Access Control Issues', severity: 'medium', description: 'Permission boundaries not enforced', link: '/governance/access' },
];

export function GardenView({ steward }: GardenViewProps) {
  const [selectedAsset, setSelectedAsset] = useState(steward.assets[0]);
  const [showIssuesPanel, setShowIssuesPanel] = useState(false);
  const [selectedIssueAsset, setSelectedIssueAsset] = useState<DataAsset | null>(null);

  const handleIssuesClick = (asset: DataAsset) => {
    setSelectedIssueAsset(asset);
    setShowIssuesPanel(true);
  };

  const getIssuesForAsset = (asset: DataAsset): typeof ISSUE_TYPES[0][] => {
    if (asset.anomalyCount === 0) return [];
    const issueCount = asset.anomalyCount;
    return ISSUE_TYPES.slice(0, Math.min(issueCount, ISSUE_TYPES.length));
  };

  const getHealthStatus = (score: number) => {
    if (score >= 85) return { label: 'Healthy', color: 'text-emerald-400' };
    if (score >= 70) return { label: 'Good', color: 'text-cyan-400' };
    if (score >= 55) return { label: 'Fair', color: 'text-yellow-400' };
    if (score >= 40) return { label: 'At Risk', color: 'text-orange-400' };
    return { label: 'Critical', color: 'text-red-400' };
  };

  const healthStatus = getHealthStatus(steward.overallHealth);

  return (
    <div className="w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-700/30 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">{steward.name}'s Data Garden</h1>
              <p className="text-sm text-slate-400 mt-3">{steward.department}</p>
            </div>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="text-right"
            >
              <div className={`text-4xl font-bold ${healthStatus.color}`}>
                {steward.overallHealth}%
              </div>
              <p className={`text-sm font-medium ${healthStatus.color} mt-1`}>{healthStatus.label}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Overall Health Summary */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-8 mb-12 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-100">Garden Status</h2>
            <div className="text-3xl font-bold text-cyan-400">{steward.assets.filter(a => a.anomalyCount === 0).length}/{steward.assets.length} thriving</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-slate-700/40 to-slate-800/40 rounded-xl p-5 border border-slate-600/20">
              <p className="text-sm text-slate-400 mb-2">Total Assets</p>
              <p className="text-3xl font-bold text-cyan-400">{steward.assets.length}</p>
            </div>
            <div className="bg-gradient-to-br from-slate-700/40 to-slate-800/40 rounded-xl p-5 border border-slate-600/20">
              <p className="text-sm text-slate-400 mb-2">Active Issues</p>
              <p className="text-3xl font-bold text-red-400">
                {steward.assets.reduce((sum, a) => sum + a.anomalyCount, 0)}
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-700/40 to-slate-800/40 rounded-xl p-5 border border-slate-600/20">
              <p className="text-sm text-slate-400 mb-2">Avg Health</p>
              <p className="text-3xl font-bold text-emerald-400">
                {Math.round(steward.assets.reduce((sum, a) => sum + a.healthScore, 0) / steward.assets.length)}%
              </p>
            </div>
          </div>
        </motion.div>

        {/* Assets Grid */}
        <div>
          <h3 className="text-2xl font-bold text-slate-100 mb-6">Your Assets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {steward.assets.map((asset, idx) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Plant
                  asset={asset}
                  onClick={() => setSelectedAsset(asset)}
                  onIssuesClick={() => handleIssuesClick(asset)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Details Panel */}
        {selectedAsset && !showIssuesPanel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-8 shadow-2xl"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-8">{selectedAsset.name}</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-xl p-4 border border-emerald-500/30">
                <p className="text-xs text-slate-400 mb-2">Health Score</p>
                <p className="text-2xl font-bold text-emerald-400">{selectedAsset.healthScore}%</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl p-4 border border-blue-500/30">
                <p className="text-xs text-slate-400 mb-2">Freshness</p>
                <p className="text-2xl font-bold text-blue-400">{selectedAsset.freshness}%</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl p-4 border border-purple-500/30">
                <p className="text-xs text-slate-400 mb-2">Lineage Quality</p>
                <p className="text-2xl font-bold text-purple-400">{selectedAsset.lineageQuality}%</p>
              </div>

              <div className={`bg-gradient-to-br ${selectedAsset.anomalyCount > 0 ? 'from-red-500/20 to-red-600/10' : 'from-slate-500/20 to-slate-600/10'} rounded-xl p-4 border ${selectedAsset.anomalyCount > 0 ? 'border-red-500/30' : 'border-slate-500/30'}`}>
                <p className="text-xs text-slate-400 mb-2">Issues</p>
                <p className={`text-2xl font-bold ${selectedAsset.anomalyCount > 0 ? 'text-red-400' : 'text-slate-400'}`}>
                  {selectedAsset.anomalyCount}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-600/30">
              <p className="text-sm text-slate-400">
                <strong>Type:</strong> {selectedAsset.type} | <strong>Last Updated:</strong> {selectedAsset.lastUpdated}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Issues Detail Panel */}
      <AnimatePresence>
        {showIssuesPanel && selectedIssueAsset && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="fixed inset-y-0 right-0 w-full md:w-96 bg-gradient-to-b from-slate-800 to-slate-900 border-l border-slate-700/50 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="sticky top-0 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700/50 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-100">Issues 🧟</h2>
              <button
                onClick={() => setShowIssuesPanel(false)}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-gradient-to-br from-slate-700/40 to-slate-800/40 rounded-lg p-4 border border-slate-600/20">
                <h3 className="font-semibold text-slate-100">{selectedIssueAsset.name}</h3>
                <p className="text-sm text-slate-400 mt-1">{selectedIssueAsset.type}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-100 mb-3 flex items-center gap-2">
                  <AlertTriangle size={18} className="text-red-500" />
                  Active Issues ({selectedIssueAsset.anomalyCount})
                </h4>
                <div className="space-y-3">
                  {getIssuesForAsset(selectedIssueAsset).map((issue, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`p-4 rounded-lg border transition-all ${
                        issue.severity === 'critical'
                          ? 'bg-red-500/10 border-red-500/30'
                          : issue.severity === 'high'
                            ? 'bg-orange-500/10 border-orange-500/30'
                            : 'bg-yellow-500/10 border-yellow-500/30'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-semibold text-slate-100">{issue.type}</h5>
                        <span
                          className={`text-xs font-bold px-2 py-1 rounded ${
                            issue.severity === 'critical'
                              ? 'bg-red-500/20 text-red-400'
                              : issue.severity === 'high'
                                ? 'bg-orange-500/20 text-orange-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {issue.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 mb-3">{issue.description}</p>
                      <a
                        href={issue.link}
                        className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Investigate & Resolve
                        <ExternalLink size={14} />
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-600/30 mt-6">
                <h4 className="font-semibold text-slate-100 mb-2">Recommended Actions</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold mt-0.5">→</span>
                    <span>Review data quality rules in Data Catalog</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold mt-0.5">→</span>
                    <span>Run validation jobs to detect issues early</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold mt-0.5">→</span>
                    <span>Set up alerts for critical metrics</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
