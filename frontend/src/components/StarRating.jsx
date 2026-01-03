import React from 'react';
import { Star, StarHalf } from 'lucide-react';

export default function StarRating({ value, onChange, readOnly = false }) {
  // value is 0-5
  // onChange(newValue)

  const stars = [1, 2, 3, 4, 5];

  const handleStarClick = (starIndex, isLeft) => {
    if (readOnly) return;
    const newValue = isLeft ? starIndex - 0.5 : starIndex;
    onChange(newValue);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {stars.map((starIndex) => {
        const isFull = value >= starIndex;
        const isHalf = !isFull && value >= starIndex - 0.5;
        
        return (
          <div 
            key={starIndex} 
            style={{ position: 'relative', cursor: readOnly ? 'default' : 'pointer', width: '24px', height: '24px' }}
          >
            {/* Click targets */}
            {!readOnly && (
              <>
                <div 
                  onClick={() => handleStarClick(starIndex, true)}
                  style={{ position: 'absolute', left: 0, top: 0, width: '50%', height: '100%', zIndex: 10 }}
                />
                <div 
                  onClick={() => handleStarClick(starIndex, false)}
                  style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', zIndex: 10 }}
                />
              </>
            )}

            {/* Icons */}
            {isFull ? (
              <Star fill="#F4C430" color="#F4C430" size={24} />
            ) : isHalf ? (
              <div style={{position: 'relative'}}>
                 <Star color="#F4C430" size={24} style={{ opacity: 0.3 }} />
                 <StarHalf fill="#F4C430" color="#F4C430" size={24} style={{ position: 'absolute', top: 0, left: 0 }} />
              </div>
            ) : (
              <Star color="#F4C430" size={24} style={{ opacity: 0.3 }} />
            )}
          </div>
        );
      })}
      <span style={{ marginLeft: '8px', fontSize: '0.9em', color: '#F4C430' }}>{value}</span>
    </div>
  );
}

