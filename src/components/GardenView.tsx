'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plant } from './Plant';
import { DataSteward } from '@/lib/types';

interface GardenViewProps {
  steward: DataSteward;
}

export function GardenView({ steward }: GardenViewProps) {
  const [selectedAsset, setSelectedAsset] = useState(steward.assets[0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{steward.name}'s Data Garden</h1>
        <p className="text-gray-600">{steward.department}</p>
      </motion.div>

      {/* Overall health */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-6 mb-8 shadow-lg border-2 border-green-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Garden Health</h2>
          <motion.div
            className="text-5xl"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🌻
          </motion.div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${steward.overallHealth}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>
          <div className="text-4xl font-bold text-green-600 w-20 text-right">
            {steward.overallHealth}%
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-3">
          {steward.assets.length} data assets in this garden
        </p>
      </motion.div>

      {/* Plants grid */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Data Assets</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {steward.assets.map((asset, idx) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Plant asset={asset} onClick={() => setSelectedAsset(asset)} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Details panel */}
      {selectedAsset && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">{selectedAsset.name}</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Health Score</p>
              <p className="text-2xl font-bold text-blue-600">{selectedAsset.healthScore}%</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Freshness</p>
              <p className="text-2xl font-bold text-green-600">{selectedAsset.freshness}%</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Lineage Quality</p>
              <p className="text-2xl font-bold text-purple-600">{selectedAsset.lineageQuality}%</p>
            </div>

            <div className={`${selectedAsset.anomalyCount > 0 ? 'bg-red-50' : 'bg-green-50'} p-4 rounded-lg`}>
              <p className="text-sm text-gray-600 mb-1">Anomalies</p>
              <p className={`text-2xl font-bold ${selectedAsset.anomalyCount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {selectedAsset.anomalyCount}
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Type:</strong> {selectedAsset.type} | <strong>Last Updated:</strong> {selectedAsset.lastUpdated}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
