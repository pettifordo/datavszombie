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
    { x: 35, y: 8 },
    { x: 18, y: 35 },
    { x: -28, y: 12 },
    { x: 30, y: -18 },
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
            y: [0, -4, 0],
            x: [0, 3, 0],
            rotate: [0, 2, 0],
          }}
          transition={{
            duration: 2.5 + idx * 0.3,
            repeat: Infinity,
            delay: idx * 0.25,
          }}
        >
          <svg
            width={size}
            height={size}
            viewBox="0 0 48 56"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-xl filter hue-rotate-[80deg] saturate-50"
          >
            {/* Head */}
            <ellipse cx="24" cy="14" rx="12" ry="13" fill="#6B8B5B" stroke="#4A5B3B" strokeWidth="1.5" />

            {/* Rotting skin texture - patches */}
            <circle cx="18" cy="10" r="2.5" fill="#5A7B3B" opacity="0.6" />
            <circle cx="28" cy="12" r="2" fill="#5A7B3B" opacity="0.6" />
            <circle cx="22" cy="18" r="1.5" fill="#5A7B3B" opacity="0.6" />

            {/* Left eye - hollow/dead */}
            <circle cx="18" cy="12" r="3" fill="#1a1a1a" />
            <circle cx="18" cy="12" r="1.5" fill="#FF4444" opacity="0.7" />

            {/* Right eye - missing/sunken */}
            <circle cx="30" cy="12" r="3" fill="#1a1a1a" />
            <path d="M 28 13 L 32 11" stroke="#FF4444" strokeWidth="1" opacity="0.7" />

            {/* Nose - rotting */}
            <path d="M 24 15 L 22 17 M 24 15 L 26 17" stroke="#4A5B3B" strokeWidth="1.5" />

            {/* Mouth - menacing grin with teeth */}
            <path d="M 19 19 Q 24 22 29 19" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
            {/* Teeth marks */}
            <line x1="20" y1="18.5" x2="20" y2="20" stroke="#FFF" strokeWidth="0.5" opacity="0.7" />
            <line x1="23" y1="18" x2="23" y2="20.5" stroke="#FFF" strokeWidth="0.5" opacity="0.7" />
            <line x1="26" y1="18" x2="26" y2="20.5" stroke="#FFF" strokeWidth="0.5" opacity="0.7" />
            <line x1="29" y1="18.5" x2="29" y2="20" stroke="#FFF" strokeWidth="0.5" opacity="0.7" />

            {/* Jaw drop - undead look */}
            <path d="M 19 20 L 18 23" stroke="#4A5B3B" strokeWidth="1" />
            <path d="M 29 20 L 30 23" stroke="#4A5B3B" strokeWidth="1" />

            {/* Neck - torn/damaged */}
            <line x1="19" y1="26" x2="17" y2="30" stroke="#5A7B3B" strokeWidth="1.5" opacity="0.8" />
            <line x1="29" y1="26" x2="31" y2="30" stroke="#5A7B3B" strokeWidth="1.5" opacity="0.8" />
            <path d="M 22 26 L 21 28 M 26 26 L 27 28" stroke="#4A5B3B" strokeWidth="1" opacity="0.6" />

            {/* Body - hunched, decaying */}
            <ellipse cx="24" cy="37" rx="13" ry="15" fill="#5A7B3B" stroke="#4A5B3B" strokeWidth="1.5" />
            
            {/* Rotten patches on body */}
            <circle cx="18" cy="35" r="2.5" fill="#4A5B3B" opacity="0.7" />
            <circle cx="30" cy="38" r="2" fill="#4A5B3B" opacity="0.7" />
            <circle cx="24" cy="42" r="2" fill="#4A5B3B" opacity="0.7" />

            {/* Tattered clothing/decay lines */}
            <path d="M 15 32 L 13 38" stroke="#4A5B3B" strokeWidth="1" opacity="0.7" />
            <path d="M 24 30 L 24 36" stroke="#4A5B3B" strokeWidth="1" opacity="0.7" />
            <path d="M 33 32 L 35 38" stroke="#4A5B3B" strokeWidth="1" opacity="0.7" />

            {/* Left arm - twisted */}
            <path d="M 14 34 Q 6 35 4 42" stroke="#5A7B3B" strokeWidth="2.5" strokeLinecap="round" />
            {/* Left hand - clawed */}
            <ellipse cx="3" cy="43" rx="2.5" ry="3" fill="#6B8B5B" transform="rotate(-25 3 43)" />
            <path d="M 1 40 L 0 38 M 3 40 L 3 37 M 5 40 L 6 38" stroke="#5A7B3B" strokeWidth="1" strokeLinecap="round" />

            {/* Right arm - reaching */}
            <path d="M 34 34 Q 42 35 44 42" stroke="#5A7B3B" strokeWidth="2.5" strokeLinecap="round" />
            {/* Right hand - clawed */}
            <ellipse cx="45" cy="43" rx="2.5" ry="3" fill="#6B8B5B" transform="rotate(25 45 43)" />
            <path d="M 43 40 L 44 38 M 45 40 L 45 37 M 47 40 L 48 38" stroke="#5A7B3B" strokeWidth="1" strokeLinecap="round" />

            {/* Left leg - broken/dragging */}
            <path d="M 18 52 L 16 56" stroke="#4A7B3B" strokeWidth="2.5" strokeLinecap="round" />
            {/* Left foot */}
            <ellipse cx="15" cy="56" rx="2.5" ry="1.5" fill="#3A5B2B" />

            {/* Right leg - normal */}
            <path d="M 30 52 L 32 56" stroke="#4A7B3B" strokeWidth="2.5" strokeLinecap="round" />
            {/* Right foot */}
            <ellipse cx="32" cy="56" rx="2.5" ry="1.5" fill="#3A5B2B" />

            {/* Gaping wound on chest */}
            <ellipse cx="24" cy="40" rx="2.5" ry="3.5" fill="#8B4444" opacity="0.8" />
            <path d="M 21 38 Q 24 41 27 38" stroke="#8B4444" strokeWidth="0.5" opacity="0.6" />
          </svg>
        </motion.div>
      ))}

      {count > 5 && (
        <motion.div
          className="absolute text-sm font-black text-red-500 drop-shadow-lg"
          style={{ right: -20, top: -5 }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          +{count - 5}
        </motion.div>
      )}
    </div>
  );
}
