import React from 'react';

export default function UserSelect({ currentUser, onSelect }) {
  const users = ['Max', 'Mia', 'Jeanine', 'Andi'];
  return (
    <div className="user-section">
      <h3 style={{marginBottom: '10px'}}>Who are you?</h3>
      <div className="user-grid">
        {users.map(u => (
          <button 
            key={u} 
            className={currentUser === u ? 'active' : 'secondary'}
            onClick={() => onSelect(u)}
            style={{
              flex: 1,
              borderColor: currentUser === u ? 'var(--cheese-yellow)' : '#555',
              background: currentUser === u ? 'var(--cheese-yellow)' : 'transparent',
              color: currentUser === u ? 'black' : 'var(--cheese-yellow)'
            }}
          >
            {u}
          </button>
        ))}
      </div>
    </div>
  );
}

