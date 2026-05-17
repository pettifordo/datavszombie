'use client';

import { motion } from 'framer-motion';

interface ZombieVisualProps {
  count: number;
  size?: number;
}

export function ZombieVisual({ count, size = 40 }: ZombieVisualProps) {
  if (count === 0) return null;

  const positions = [
    { x: 0, y: 0 },
    { x: 30, y: 10 },
    { x: 15, y: 30 },
    { x: -20, y: 15 },
    { x: 25, y: -15 },
  ];

  return (
    <div className="relative">
      {Array.from({ length: Math.min(count, 5) }).map((_, idx) => (
        <motion.div
          key={idx}
          className="absolute"
          style={{
            left: `${positions[idx % positions.length].x}px`,
            top: `${positions[idx % positions.length].y}px`,
          }}
          animate={{
            y: [0, -3, 0],
            x: [0, 2, 0],
          }}
          transition={{
            duration: 2 + idx * 0.3,
            repeat: Infinity,
            delay: idx * 0.2,
          }}
        >
          <svg
            width={size}
            height={size}
            viewBox="0 0 40 50"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg"
          >
            {/* Head */}
            <circle cx="20" cy="12" r="10" fill="#7A9B5B" stroke="#5A7B3B" strokeWidth="1" />

            {/* Eyes - dead/hollow */}
            <circle cx="16" cy="10" r="2" fill="#1a1a1a" />
            <circle cx="24" cy="10" r="2" fill="#1a1a1a" />
            <line x1="15" y1="12" x2="25" y2="12" stroke="#1a1a1a" strokeWidth="0.5" />

            {/* Mouth - menacing grin */}
            <path
              d="M 17 14 Q 20 16 23 14"
              fill="none"
              stroke="#3A4B1B"
              strokeWidth="1"
              strokeLinecap="round"
            />

            {/* Body */}
            <rect x="14" y="22" width="12" height="14" fill="#6B8B4B" stroke="#5A7B3B" strokeWidth="1" />

            {/* Tattered clothing lines */}
            <line x1="15" y1="25" x2="14" y2="28" stroke="#5A7B3B" strokeWidth="0.5" opacity="0.6" />
            <line x1="20" y1="25" x2="21" y2="29" stroke="#5A7B3B" strokeWidth="0.5" opacity="0.6" />
            <line x1="25" y1="25" x2="26" y2="28" stroke="#5A7B3B" strokeWidth="0.5" opacity="0.6" />

            {/* Left arm */}
            <line x1="14" y1="25" x2="6" y2="28" stroke="#6B8B4B" strokeWidth="2" strokeLinecap="round" />
            {/* Left hand */}
            <circle cx="5" cy="28" r="2" fill="#7A9B5B" />

            {/* Right arm */}
            <line x1="26" y1="25" x2="34" y2="28" stroke="#6B8B4B" strokeWidth="2" strokeLinecap="round" />
            {/* Right hand */}
            <circle cx="35" cy="28" r="2" fill="#7A9B5B" />

            {/* Left leg */}
            <line x1="16" y1="36" x2="14" y2="48" stroke="#5A6B3B" strokeWidth="2" strokeLinecap="round" />
            {/* Left foot */}
            <ellipse cx="14" cy="48" rx="3" ry="2" fill="#4A5B2B" />

            {/* Right leg */}
            <line x1="24" y1="36" x2="26" y2="48" stroke="#5A6B3B" strokeWidth="2" strokeLinecap="round" />
            {/* Right foot */}
            <ellipse cx="26" cy="48" rx="3" ry="2" fill="#4A5B2B" />

            {/* Deterioration - cracks/scars */}
            <path
              d="M 18 8 L 16 6"
              stroke="#5A7B3B"
              strokeWidth="0.5"
              opacity="0.5"
              strokeDasharray="1,1"
            />
            <path
              d="M 22 15 L 24 17"
              stroke="#5A7B3B"
              strokeWidth="0.5"
              opacity="0.5"
              strokeDasharray="1,1"
            />
          </svg>
        </motion.div>
      ))}

      {count > 5 && (
        <motion.div
          className="absolute text-xs font-bold text-red-400"
          style={{ right: -15, top: 0 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          +{count - 5}
        </motion.div>
      )}
    </div>
  );
}
