import React from 'react';
import StarRating from './StarRating';
import { Trash2, Edit2 } from 'lucide-react';

export default function CheeseCard({ cheese, currentUser, onRate, onDelete, onEdit }) {
  const ratings = cheese.ratings ? (typeof cheese.ratings === 'string' ? JSON.parse(cheese.ratings) : cheese.ratings) : {};
  const users = ['Max', 'Mia', 'Jeanine', 'Andi'];
  
  const myRating = ratings[currentUser] || 0;

  // Calculate Average
  const ratingValues = Object.values(ratings);
  const avgRating = ratingValues.length > 0 
    ? (ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length).toFixed(1)
    : '-';

  return (
    <div className="cheese-card" style={{ 
      background: 'var(--bg-card-trans)', 
      padding: '15px', 
      marginBottom: '15px', 
      borderRadius: '8px',
      border: '1px solid rgba(244, 196, 48, 0.3)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{cheese.name}</h2>
          <div style={{ fontSize: '0.8rem', color: '#ccc', marginBottom: '8px' }}>
            {cheese.art} • {cheese.lieferant}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="secondary" style={{ padding: '4px' }} onClick={() => onEdit(cheese)}>
            <Edit2 size={16} />
          </button>
          <button className="secondary" style={{ padding: '4px', borderColor: '#ff4444', color: '#ff4444' }} onClick={() => onDelete(cheese.id)}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {cheese.beschrieb && (
        <p style={{ fontSize: '0.9rem', marginBottom: '12px', fontStyle: 'italic', opacity: 0.9 }}>
          {cheese.beschrieb}
        </p>
      )}

      <div style={{ marginBottom: '12px', background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <span style={{ fontWeight: 'bold', color: 'var(--cheese-yellow)' }}>Your Rating:</span>
          {currentUser ? (
            <StarRating value={myRating} onChange={(val) => onRate(cheese.id, val)} />
          ) : (
            <span style={{fontSize: '0.8rem'}}>Select user to rate</span>
          )}
        </div>
      </div>

      <div style={{ fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '4px' }}>
          <span>Overall:</span>
          <strong style={{ color: 'var(--cheese-yellow)' }}>{avgRating} / 5</strong>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
          {users.map(u => (
            <div key={u} style={{ display: 'flex', justifyContent: 'space-between', opacity: ratings[u] ? 1 : 0.5 }}>
              <span>{u}:</span>
              <span>{ratings[u] ? ratings[u] : '-'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

