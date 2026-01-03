import React, { useState } from 'react';
import { X } from 'lucide-react';

// --- CONFIGURATION ---
// Developer: Set passwords for users here
const USER_PASSWORDS = {
  'Max': 'max',
  'Mia': '1804',
  'Jeanine': 'andi',
  'Andi': 'aer'
};
// ---------------------

export default function UserSelect({ currentUser, onSelect }) {
  const users = ['Max', 'Mia', 'Jeanine', 'Andi'];
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [candidateUser, setCandidateUser] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState(false);

  const handleUserClick = (user) => {
    if (user === currentUser) return; // Already logged in
    setCandidateUser(user);
    setPasswordInput('');
    setError(false);
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (USER_PASSWORDS[candidateUser] === passwordInput) {
      onSelect(candidateUser);
      setShowPasswordModal(false);
      setCandidateUser(null);
    } else {
      setError(true);
      setPasswordInput('');
    }
  };

  const closeModal = () => {
    setShowPasswordModal(false);
    setCandidateUser(null);
  };

  return (
    <>
      <div className="user-section">
        <h3 style={{marginBottom: '10px'}}>Who are you?</h3>
        <div className="user-grid">
          {users.map(u => (
            <button 
              key={u} 
              className={currentUser === u ? 'active' : 'secondary'}
              onClick={() => handleUserClick(u)}
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

      {showPasswordModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px'
        }}>
          <div style={{
            background: '#222',
            border: '1px solid var(--cheese-yellow)',
            padding: '25px',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '350px',
            position: 'relative',
            boxShadow: '0 0 30px rgba(244, 196, 48, 0.2)'
          }}>
             <button 
              onClick={closeModal}
              style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', padding: 0 }}
            >
              <X color="var(--cheese-yellow)" />
            </button>

            <h3 style={{ marginBottom: '20px', color: 'var(--cheese-yellow)' }}>
              Hello {candidateUser}!
            </h3>
            <p style={{ marginBottom: '15px', fontSize: '0.9rem' }}>Please enter your password:</p>

            <form onSubmit={handlePasswordSubmit}>
              <input 
                type="password" 
                value={passwordInput}
                onChange={e => { setPasswordInput(e.target.value); setError(false); }}
                autoFocus
                placeholder="Password"
                style={{ 
                  marginBottom: '15px', 
                  borderColor: error ? '#ff4444' : 'var(--cheese-yellow)'
                }}
              />
              {error && <p style={{ color: '#ff4444', fontSize: '0.8rem', marginBottom: '10px' }}>Wrong password</p>}
              
              <button type="submit" style={{ width: '100%' }}>Login</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

