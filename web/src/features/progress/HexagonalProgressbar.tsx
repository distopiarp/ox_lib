import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

export type HexagonalProgressbarProps = {
  value: number;
  pathColor: string;
  width: number;
  height: number;
};

const HexagonalProgressbar: React.FC<HexagonalProgressbarProps> = ({ value, pathColor, width, height }) => {
  const [pathLength, setPathLength] = useState(0);
  const hexagonRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (hexagonRef.current) {
      setPathLength(hexagonRef.current.getTotalLength());
    }
  }, []);

  const minValue = 0;
  const maxValue = 100;
  const boundedValue = Math.min(Math.max(value, minValue), maxValue);
  const pathRatio = (boundedValue - minValue) / (maxValue - minValue);

  const { progress } = useSpring({
    progress: pathRatio,
    config: { duration: 600 },
  });

  const strokeDashoffset = progress.to(p => pathLength - p * pathLength);

  const hexagonPath = "M11.7 1.1732C11.8856 1.06603 12.1144 1.06603 12.3 1.17321L21.2263 6.3268C21.4119 6.43397 21.5263 6.63205 21.5263 6.84641V17.1536C21.5263 17.3679 21.4119 17.566 21.2263 17.6732L12.3 22.8268C12.1144 22.934 11.8856 22.934 11.7 22.8268L2.77372 17.6732C2.58808 17.566 2.47372 17.3679 2.47372 17.1536V6.84641C2.47372 6.63205 2.58808 6.43397 2.77372 6.32679L11.7 1.1732Z";

  const randomName = (Math.random() + 1).toString(36).substring(7);

  return (
    <svg className="hexagon-ring" viewBox="0 0 24 24" width={width} height={height}>
      <defs>
        <clipPath id={randomName}>
          <path d={hexagonPath} />
        </clipPath>
        <radialGradient id="background" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0d0d0d66" />
          <stop offset="100%" stopColor="#0d0d0d1A" />
        </radialGradient>
      </defs>
      <g clipPath={`url(#${randomName})`}>
        <path
          ref={hexagonRef}
          d={hexagonPath}
          className="stroke-cap-round"
          stroke='#000000ee'
          fill='transparent'
          strokeWidth='3'
          strokeDasharray={`${pathLength} ${pathLength}`}
        />
        <animated.path
          d={hexagonPath}
          className="stroke-cap-round"
          stroke={pathColor}
          fill="transparent"
          strokeWidth={3}
          strokeDasharray={`${pathLength} ${pathLength}`}
          strokeDashoffset={strokeDashoffset}
          style={{ filter: `drop-shadow(0px 0px 2px ${pathColor}) contrast(100%)` }}
        />
        <svg viewBox="0 0 26.38 26.38">
          <path
            d={hexagonPath}
            className="stroke-cap-round"
            fill="url(#background)"
            transform="translate(1.25, 1.25)"
          />
        </svg>
      </g>
      <g className="icon"></g>
    </svg>
  );
};

export default HexagonalProgressbar;
