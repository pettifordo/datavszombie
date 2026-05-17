'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Droplet, GitBranch, RefreshCw } from 'lucide-react';
import { DataAsset, PlantStage } from '@/lib/types';

interface PlantProps {
  asset: DataAsset;
  onClick?: () => void;
}

export function Plant({ asset, onClick }: PlantProps) {
  const stage = useMemo((): PlantStage => {
    if (asset.healthScore >= 85) return 'flowering';
    if (asset.healthScore >= 70) return 'blooming';
    if (asset.healthScore >= 55) return 'growing';
    if (asset.healthScore >= 40) return 'sprout';
    if (asset.healthScore >= 20) return 'wilting';
    return 'dead';
  }, [asset.healthScore]);

  const getPlantColor = () => {
    if (stage === 'dead') return 'text-gray-400';
    if (stage === 'wilting') return 'text-amber-600';
    if (stage === 'sprout') return 'text-yellow-500';
    if (stage === 'growing') return 'text-lime-500';
    if (stage === 'blooming') return 'text-green-500';
    return 'text-emerald-500';
  };

  const getBackgroundColor = () => {
    if (stage === 'dead') return 'bg-gray-100';
    if (stage === 'wilting') return 'bg-amber-50';
    if (stage === 'sprout') return 'bg-yellow-50';
    if (stage === 'growing') return 'bg-lime-50';
    if (stage === 'blooming') return 'bg-green-50';
    return 'bg-emerald-50';
  };

  const getZombieIntensity = asset.anomalyCount > 0 ? Math.min(asset.anomalyCount / 20, 1) : 0;

  return (
    <motion.div
      onClick={onClick}
      className={`relative p-4 rounded-xl ${getBackgroundColor()} border-2 border-gray-200 cursor-pointer overflow-hidden`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Zombie attack indicator */}
      {getZombieIntensity > 0 && (
        <motion.div
          className="absolute inset-0 bg-red-500 opacity-10"
          animate={{
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      <div className="flex flex-col items-center h-full">
        {/* Plant visualization */}
        <motion.div
          className={`text-6xl mb-2 ${getPlantColor()}`}
          animate={{
            scale: [1, 1.05, 1],
            rotate: stage === 'dead' || stage === 'wilting' ? -15 : 0,
          }}
          transition={{
            duration: stage === 'dead' ? 0 : 3,
            repeat: stage === 'dead' ? 0 : Infinity,
          }}
        >
          {stage === 'dead' && '☠️'}
          {stage === 'wilting' && '🌱'}
          {stage === 'sprout' && '🌿'}
          {stage === 'growing' && '🌾'}
          {stage === 'blooming' && '🌺'}
          {stage === 'flowering' && '🌻'}
        </motion.div>

        {/* Asset name */}
        <h3 className="font-semibold text-gray-800 text-center text-sm mb-2 line-clamp-2">
          {asset.name}
        </h3>

        {/* Health bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${
              stage === 'dead'
                ? 'bg-gray-400'
                : stage === 'wilting'
                  ? 'bg-amber-500'
                  : stage === 'sprout'
                    ? 'bg-yellow-500'
                    : stage === 'growing'
                      ? 'bg-lime-500'
                      : stage === 'blooming'
                        ? 'bg-green-500'
                        : 'bg-emerald-500'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${asset.healthScore}%` }}
            transition={{ duration: 0.8, delay: 0.1 }}
          />
        </div>

        {/* Health score */}
        <p className="text-xs font-bold text-gray-700">{asset.healthScore}% Health</p>

        {/* Issue indicators */}
        {getZombieIntensity > 0 && (
          <motion.div
            className="flex items-center gap-1 mt-2 text-red-600 text-xs"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <AlertCircle size={14} />
            <span>{asset.anomalyCount} issues</span>
          </motion.div>
        )}

        {/* Data quality indicators */}
        <div className="flex gap-3 mt-3 text-xs text-gray-600 justify-center">
          <div className="flex items-center gap-1">
            <Droplet size={12} className="text-blue-500" />
            <span>{asset.freshness}%</span>
          </div>
          <div className="flex items-center gap-1">
            <GitBranch size={12} className="text-purple-500" />
            <span>{asset.lineageQuality}%</span>
          </div>
          <div className="flex items-center gap-1">
            <RefreshCw size={12} className="text-gray-500" />
            <span>{asset.lastUpdated}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
