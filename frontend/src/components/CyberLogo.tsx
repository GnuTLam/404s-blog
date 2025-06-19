import React, { useEffect, useState } from 'react';

interface CyberLogoProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  glitchIntensity?: 'low' | 'medium' | 'high';
}

const CyberLogo: React.FC<CyberLogoProps> = ({ 
  text, 
  className = '', 
  size = 'md',
  glitchIntensity = 'medium'
}) => {
  const [glitchText, setGlitchText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchType, setGlitchType] = useState<'normal' | 'colorShift' | 'dataCorruption' | 'matrix'>('normal');
  const [ghostText, setGhostText] = useState('');

  const colors = [
    'text-cyber-600 dark:text-cyber-200', 'text-cyber-700 dark:text-cyber-100', 'text-cyber-500 dark:text-cyber-300', 
    'text-light-700 dark:text-dark-100', 'text-cyber-600 dark:text-cyber-50', 'text-light-600 dark:text-dark-200',
    'text-cyber-700 dark:text-cyber-200', 'text-light-700 dark:text-dark-100', 'text-cyber-600 dark:text-cyber-100'
  ];

  const glitchColors = [
    'text-cyber-500 dark:text-cyber-200', 'text-cyber-600 dark:text-cyber-100', 'text-cyber-700 dark:text-cyber-200',
    'text-light-600 dark:text-dark-100', 'text-cyber-600 dark:text-cyber-50', 'text-light-700 dark:text-dark-50'
  ];

  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-6xl'
  };

  const glitchChars = '!<>-_\\@#$%&()=+*^?;:[]{}~`|'.split('');
  const matrixChars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ0123456789'.split('');
  const hexChars = '0123456789ABCDEF'.split('');
  const binaryChars = '01'.split('');

  const intensitySettings = {
    low:    { chance: 0.022, duration: 50, interval: 1800 },
    medium: { chance: 0.055, duration: 50, interval: 1350 },
    high:   { chance: 0.088, duration: 50, interval: 900 }
  };

  const intensity = intensitySettings[glitchIntensity];

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.65) {
        setIsGlitching(true);
        
        // Random glitch type
        const types: Array<'normal' | 'colorShift' | 'dataCorruption' | 'matrix'> = 
          ['normal', 'colorShift', 'dataCorruption', 'matrix'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        setGlitchType(randomType);
        
        let step = 0;
        const maxStep = 10; // 10 steps * 50ms = 500ms total duration

        const glitchStep = setInterval(() => {
          let newText = '';
          let ghostTextGen = '';
          
          switch (randomType) {
            case 'matrix':
              newText = text.split('').map(char => {
                if (Math.random() < intensity.chance * 1.5 && char !== ' ') {
                  return matrixChars[Math.floor(Math.random() * matrixChars.length)];
                }
                return char;
              }).join('');
              break;
              
            case 'dataCorruption':
              newText = text.split('').map(char => {
                if (Math.random() < intensity.chance && char !== ' ') {
                  if (Math.random() < 0.3) {
                    return `[${hexChars[Math.floor(Math.random() * hexChars.length)]}${hexChars[Math.floor(Math.random() * hexChars.length)]}]`;
                  } else if (Math.random() < 0.5) {
                    return binaryChars[Math.floor(Math.random() * binaryChars.length)].repeat(Math.floor(Math.random() * 3) + 1);
                  }
                  return '█';
                }
                return char;
              }).join('');
              break;
              
            case 'colorShift':
              newText = text;
              // Create ghost text effect
              ghostTextGen = text.split('').map(char => {
                if (Math.random() < 0.4) {
                  return char;
                }
                return ' ';
              }).join('');
              setGhostText(ghostTextGen);
              break;
              
            default:
              newText = text.split('').map(char => {
                if (Math.random() < intensity.chance && char !== ' ') {
                  return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                }
                return char;
              }).join('');
          }
          
          setGlitchText(newText);
          step++;
          
          if (step >= maxStep) {
            clearInterval(glitchStep);
            setGlitchText(text);
            setGhostText('');
            setIsGlitching(false);
            setGlitchType('normal');
          }
        }, intensity.duration);
      }
    }, intensity.interval);

    return () => clearInterval(glitchInterval);
  }, [text, intensity, binaryChars, glitchChars, hexChars, matrixChars]);

  const getGlitchStyle = (char: string, index: number) => {
    const baseStyle = {
      transition: 'all 0.1s ease-in-out',
      position: 'relative' as const,
    };

    switch (glitchType) {
      case 'matrix':
        return {
          ...baseStyle,
          color: '#0284c7', // cyber-600 color - bold but not dark
          animation: isGlitching ? 'matrix-rain 0.3s infinite' : 'none',
        };
      
      case 'dataCorruption':
        return {
          ...baseStyle,
          filter: 'contrast(1.5) saturate(1.8)',
          transform: isGlitching ? `skew(${Math.random() * 10 - 5}deg)` : 'none',
        };
      
      case 'colorShift':
        return {
          ...baseStyle,
          animation: isGlitching ? 'color-shift 0.2s infinite' : 'none',
        };
      
      default:
        return {
          ...baseStyle,
        };
    }
  };

  return (
    <div className={`font-['Orbitron'] font-bold tracking-wide ${sizeClasses[size]} ${className} relative`}>
      {/* Digital Rain Background Effect */}
      {glitchType === 'matrix' && isGlitching && (
        <div className="absolute -inset-2 overflow-hidden pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-20px',
                color: '#0284c7',
                fontSize: '0.5em',
                opacity: 0.3,
                animation: `matrix-fall 0.5s linear infinite ${i * 0.1}s`,
              }}
            >
              {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
            </div>
          ))}
        </div>
      )}

             {/* Ghost Text Layer for ColorShift effect */}
       {glitchType === 'colorShift' && ghostText && (
         <div className="absolute inset-0 pointer-events-none">
           {ghostText.split('').map((char, index) => (
             <span
               key={`ghost-${index}`}
               className="inline-block text-cyber-600 dark:text-cyber-200"
               style={{
                 opacity: 0.3,
                 transform: 'translate(-1px, -1px)',
               }}
             >
               {char}
             </span>
           ))}
         </div>
       )}

      {/* Main Text */}
      {glitchText.split('').map((char, index) => {
        const colorClass = isGlitching && glitchType !== 'matrix' && glitchType !== 'dataCorruption' 
          ? glitchColors[index % glitchColors.length]
          : colors[index % colors.length];
        
        return (
          <span
            key={index}
            data-text={char}
            className={`glitch-text inline-block ${colorClass} ${isGlitching ? 'glitch-active' : ''}`}
            style={getGlitchStyle(char, index)}
          >
            {char}
          </span>
        );
      })}

      {/* CSS Animations */}
      <style>{`
        @keyframes matrix-rain {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }
        
        @keyframes matrix-fall {
          0% { transform: translateY(-20px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(60px); opacity: 0; }
        }
        
        @keyframes color-shift {
          0% { filter: hue-rotate(0deg); }
          25% { filter: hue-rotate(90deg); }
          50% { filter: hue-rotate(180deg); }
          75% { filter: hue-rotate(270deg); }
          100% { filter: hue-rotate(360deg); }
        }
        
        .glitch-active {
          animation: glitch-shake 0.1s infinite;
        }
        
        @keyframes glitch-shake {
          0% { transform: translate(0); }
          20% { transform: translate(-1px, 1px); }
          40% { transform: translate(-1px, -1px); }
          60% { transform: translate(1px, 1px); }
          80% { transform: translate(1px, -1px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </div>
  );
};

export default CyberLogo;
