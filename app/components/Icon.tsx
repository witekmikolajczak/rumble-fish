import React from 'react';

// Omit the SVG-specific attributes to avoid type conflicts
interface IconProps {
  /**
   * Path to the SVG file
   */
  src: string;
  /**
   * Width of the icon
   */
  width?: number | string;
  /**
   * Height of the icon, defaults to width if not provided
   */
  height?: number | string;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Alt text for accessibility
   */
  alt?: string;
  /**
   * Stroke color for the SVG
   */
  stroke?: string;
  /**
   * Fill color for the SVG
   */
  fill?: string;
  /**
   * Whether the icon should adapt its color when in active/selected state
   */
  isActive?: boolean;
  /**
   * Color to use when icon is active
   */
  activeColor?: string;
  /**
   * Additional CSS styles
   */
  style?: React.CSSProperties;
}

/**
 * A reusable Icon component that renders SVG icons with customizable properties
 */
const Icon: React.FC<IconProps> = ({
  src,
  width = 24,
  height,
  className = '',
  alt = '',
  stroke,
  fill,
  isActive = false,
  activeColor = '#000',
  style
}) => {
  // Combine styles with any passed in through props
  const combinedStyles: React.CSSProperties = {
    width,
    height: height || width,
    ...(isActive && { filter: `brightness(0)` }),
    ...style,
  };

  // If active and activeColor is provided, override the filter
  if (isActive && activeColor) {
    // We'll use maskImage for more control over coloring
    combinedStyles.WebkitMaskImage = `url(${src})`;
    combinedStyles.maskImage = `url(${src})`;
    combinedStyles.WebkitMaskSize = 'contain';
    combinedStyles.maskSize = 'contain';
    combinedStyles.WebkitMaskRepeat = 'no-repeat';
    combinedStyles.maskRepeat = 'no-repeat';
    combinedStyles.WebkitMaskPosition = 'center';
    combinedStyles.maskPosition = 'center';
    combinedStyles.backgroundColor = activeColor;
    
    // Render a div with the SVG as a mask
    return (
      <div 
        className={`icon ${className}`}
        style={combinedStyles}
        role="img"
        aria-label={alt}
      />
    );
  }

  // Standard rendering via img tag with custom styling
  return (
    <img
      src={src}
      alt={alt}
      className={`icon ${className}`}
      style={combinedStyles}
    />
  );
};

export default Icon;
