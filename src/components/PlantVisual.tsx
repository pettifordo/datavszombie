'use client';

interface PlantVisualProps {
  healthScore: number;
  size?: number;
}

export function PlantVisual({ healthScore, size = 80 }: PlantVisualProps) {
  const getPlantStage = () => {
    if (healthScore >= 85) return 'flowering';
    if (healthScore >= 70) return 'blooming';
    if (healthScore >= 55) return 'growing';
    if (healthScore >= 40) return 'sprout';
    if (healthScore >= 20) return 'wilting';
    return 'dead';
  };

  const stage = getPlantStage();
  const opacity = Math.max(0.3, healthScore / 100);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-md"
    >
      {/* Soil */}
      <ellipse cx="50" cy="95" rx="35" ry="8" fill="#6B5B4C" opacity={opacity} />

      {/* Pot */}
      <path
        d="M 35 85 L 30 70 L 70 70 L 65 85"
        fill="none"
        stroke="#A89070"
        strokeWidth="2"
        opacity={opacity}
      />
      <line x1="30" y1="70" x2="70" y2="70" stroke="#A89070" strokeWidth="1.5" opacity={opacity} />

      {/* Main stem - scales with health */}
      {(stage === 'sprout' || stage === 'growing' || stage === 'blooming' || stage === 'flowering') && (
        <line
          x1="50"
          y1="85"
          x2="50"
          y2={70 - Math.min(healthScore / 10, 20)}
          stroke="#52B788"
          strokeWidth="2"
          opacity={opacity}
        />
      )}

      {/* Wilting stem */}
      {stage === 'wilting' && (
        <path
          d="M 50 85 Q 55 75 60 65"
          fill="none"
          stroke="#A67D5B"
          strokeWidth="2"
          opacity={opacity}
        />
      )}

      {/* Left leaf - appears at growing stage */}
      {(stage === 'growing' || stage === 'blooming' || stage === 'flowering') && (
        <ellipse
          cx="35"
          cy={60 - Math.min(healthScore / 15, 10)}
          rx="8"
          ry="12"
          fill="#52B788"
          opacity={opacity}
          transform={`rotate(-30 35 ${60 - Math.min(healthScore / 15, 10)})`}
        />
      )}

      {/* Right leaf - appears at growing stage */}
      {(stage === 'growing' || stage === 'blooming' || stage === 'flowering') && (
        <ellipse
          cx="65"
          cy={60 - Math.min(healthScore / 15, 10)}
          rx="8"
          ry="12"
          fill="#52B788"
          opacity={opacity}
          transform={`rotate(30 65 ${60 - Math.min(healthScore / 15, 10)})`}
        />
      )}

      {/* Flower petals - only at flowering stage */}
      {stage === 'flowering' && (
        <>
          {/* Petal 1 (top) */}
          <ellipse cx="50" cy="35" rx="6" ry="10" fill="#FFC107" opacity={opacity} />
          {/* Petal 2 (right) */}
          <ellipse cx="62" cy="45" rx="6" ry="10" fill="#FFD700" opacity={opacity} transform="rotate(72 50 50)" />
          {/* Petal 3 (bottom right) */}
          <ellipse cx="62" cy="65" rx="6" ry="10" fill="#FFC107" opacity={opacity} transform="rotate(144 50 50)" />
          {/* Petal 4 (bottom left) */}
          <ellipse cx="38" cy="65" rx="6" ry="10" fill="#FFD700" opacity={opacity} transform="rotate(216 50 50)" />
          {/* Petal 5 (left) */}
          <ellipse cx="38" cy="45" rx="6" ry="10" fill="#FFC107" opacity={opacity} transform="rotate(288 50 50)" />
          {/* Center */}
          <circle cx="50" cy="50" r="5" fill="#FF9800" opacity={opacity} />
        </>
      )}

      {/* Blossom - blooming stage */}
      {stage === 'blooming' && (
        <>
          <circle cx="50" cy="45" r="8" fill="#FF69B4" opacity={opacity} />
          <circle cx="42" cy="50" r="6" fill="#FF1493" opacity={opacity} />
          <circle cx="58" cy="50" r="6" fill="#FF1493" opacity={opacity} />
          <circle cx="46" cy="55" r="6" fill="#FF69B4" opacity={opacity} />
          <circle cx="54" cy="55" r="6" fill="#FF69B4" opacity={opacity} />
          <circle cx="50" cy="50" r="4" fill="#FFB6C1" opacity={opacity} />
        </>
      )}

      {/* Growing shoots */}
      {stage === 'growing' && (
        <>
          <path d="M 45 65 L 40 55" stroke="#52B788" strokeWidth="1.5" opacity={opacity} />
          <path d="M 55 65 L 60 55" stroke="#52B788" strokeWidth="1.5" opacity={opacity} />
        </>
      )}

      {/* Sprout - minimal growth */}
      {stage === 'sprout' && (
        <>
          <circle cx="48" cy="75" r="3" fill="#90EE90" opacity={opacity} />
          <circle cx="52" cy="75" r="3" fill="#90EE90" opacity={opacity} />
        </>
      )}

      {/* Dead plant - skull appearance */}
      {stage === 'dead' && (
        <>
          <circle cx="50" cy="50" r="12" fill="#8B7355" opacity={opacity} />
          <circle cx="43" cy="45" r="3" fill="#333" opacity={opacity} />
          <circle cx="57" cy="45" r="3" fill="#333" opacity={opacity} />
          <path d="M 45 55 L 55 55" stroke="#333" strokeWidth="2" opacity={opacity} />
        </>
      )}
    </svg>
  );
}
