'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Droplet, GitBranch, Clock, ChevronRight } from 'lucide-react';
import { DataAsset, PlantStage } from '@/lib/types';

interface PlantProps {
  asset: DataAsset;
  onClick?: () => void;
  onIssuesClick?: () => void;
}

export function Plant({ asset, onClick, onIssuesClick }: PlantProps) {
  const stage = useMemo((): PlantStage => {
    if (asset.healthScore >= 85) return 'flowering';
    if (asset.healthScore >= 70) return 'blooming';
    if (asset.healthScore >= 55) return 'growing';
    if (asset.healthScore >= 40) return 'sprout';
    if (asset.healthScore >= 20) return 'wilting';
    return 'dead';
  }, [asset.healthScore]);

  const getHealthColor = () => {
    if (stage === 'dead') return 'text-slate-500 bg-slate-500/10';
    if (stage === 'wilting') return 'text-orange-500 bg-orange-500/10';
    if (stage === 'sprout') return 'text-yellow-500 bg-yellow-500/10';
    if (stage === 'growing') return 'text-lime-500 bg-lime-500/10';
    if (stage === 'blooming') return 'text-emerald-500 bg-emerald-500/10';
    return 'text-green-500 bg-green-500/10';
  };

  const getHealthBorderColor = () => {
    if (stage === 'dead') return 'border-slate-600';
    if (stage === 'wilting') return 'border-orange-600';
    if (stage === 'sprout') return 'border-yellow-600';
    if (stage === 'growing') return 'border-lime-600';
    if (stage === 'blooming') return 'border-emerald-600';
    return 'border-green-600';
  };

  const getHealthBarColor = () => {
    if (stage === 'dead') return 'bg-slate-600';
    if (stage === 'wilting') return 'bg-orange-600';
    if (stage === 'sprout') return 'bg-yellow-600';
    if (stage === 'growing') return 'bg-lime-600';
    if (stage === 'blooming') return 'bg-emerald-600';
    return 'bg-green-600';
  };

  return (
    <motion.div
      onClick={onClick}
      className={`relative p-4 rounded-lg border ${getHealthBorderColor()} ${getHealthColor()} cursor-pointer overflow-hidden transition-all hover:border-opacity-100 border-opacity-50 hover:shadow-lg hover:shadow-slate-500/20`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      <div className="space-y-3">
        {/* Header with asset name and type */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-100 text-sm line-clamp-2">
              {asset.name}
            </h3>
            <p className="text-xs text-slate-400 mt-1 capitalize">{asset.type}</p>
          </div>
          <motion.div
            animate={{
              scale: asset.anomalyCount > 0 ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 1.5, repeat: asset.anomalyCount > 0 ? Infinity : 0 }}
            className="text-lg flex-shrink-0"
          >
            {asset.anomalyCount > 0 ? '🧟' : '🌱'}
          </motion.div>
        </div>

        {/* Health bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Health Status</span>
            <span className={`text-xs font-semibold ${getHealthColor()}`}>
              {asset.healthScore}%
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${getHealthBarColor()}`}
              initial={{ width: 0 }}
              animate={{ width: `${asset.healthScore}%` }}
              transition={{ duration: 0.8, delay: 0.1 }}
            />
          </div>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-600/30">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
              <Droplet size={12} className="text-blue-400" />
            </div>
            <p className="text-xs font-semibold text-slate-200">{asset.freshness}%</p>
            <p className="text-xs text-slate-500">Freshness</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
              <GitBranch size={12} className="text-purple-400" />
            </div>
            <p className="text-xs font-semibold text-slate-200">{asset.lineageQuality}%</p>
            <p className="text-xs text-slate-500">Lineage</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
              <Clock size={12} className="text-slate-400" />
            </div>
            <p className="text-xs font-semibold text-slate-200">{asset.lastUpdated}</p>
            <p className="text-xs text-slate-500">Updated</p>
          </div>
        </div>

        {/* Issues/Zombies */}
        {asset.anomalyCount > 0 && (
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onIssuesClick?.();
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex items-center justify-between px-2 py-1.5 rounded bg-red-500/10 hover:bg-red-500/20 border border-red-600/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <AlertCircle size={14} className="text-red-500" />
              <span className="text-xs font-medium text-red-400">
                {asset.anomalyCount} {asset.anomalyCount === 1 ? 'Issue' : 'Issues'}
              </span>
            </div>
            <ChevronRight size={14} className="text-red-500" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
