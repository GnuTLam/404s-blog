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

  const colors = [
    'text-blue-600', 'text-cyan-500', 'text-indigo-500', 
    'text-purple-600', 'text-blue-400', 'text-indigo-400'
  ];

  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-6xl'
  };

  const glitchChars = '!<>-_\\@#$%&()=+*^?;:[]{}~`|'.split('');

  const intensitySettings = {
    low:    { chance: 0.022, duration: 45, interval: 1800 },
    medium: { chance: 0.055, duration: 72, interval: 1350 },
    high:   { chance: 0.088, duration: 108, interval: 900 }
  };

  const intensity = intensitySettings[glitchIntensity];

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.55) {
        setIsGlitching(true);
        let step = 0;
        const maxStep = 3;

        const glitchStep = setInterval(() => {
          const newText = text.split('').map(char => {
            if (Math.random() < intensity.chance && char !== ' ') {
              return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }
            return char;
          }).join('');
          setGlitchText(newText);
          step++;
          if (step >= maxStep) {
            clearInterval(glitchStep);
            setGlitchText(text);
            setIsGlitching(false);
          }
        }, intensity.duration);
      }
    }, intensity.interval);

    return () => clearInterval(glitchInterval);
  }, [text, intensity]);

  return (
    <div className={`font-['Orbitron'] font-bold tracking-wide ${sizeClasses[size]} ${className}`}>
      {glitchText.split('').map((char, index) => (
        <span
          key={index}
          data-text={char}
          className={`glitch-text inline-block ${colors[index % colors.length]} ${isGlitching ? 'glitch-active' : ''}`}
          style={{
            transition: 'all 0.1s ease-in-out',
            textShadow: '0 0 4px rgba(0,255,136,0.4)'
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default CyberLogo;
