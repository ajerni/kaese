import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function CheeseForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    beschrieb: '',
    art: '',
    lieferant: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        beschrieb: initialData.beschrieb || '',
        art: initialData.art || '',
        lieferant: initialData.lieferant || ''
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: '#222',
        border: '1px solid var(--cheese-yellow)',
        padding: '25px',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '500px',
        position: 'relative',
        boxShadow: '0 0 30px rgba(244, 196, 48, 0.2)'
      }}>
        <button 
          onClick={onCancel}
          style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', padding: 0 }}
        >
          <X color="var(--cheese-yellow)" />
        </button>

        <h2 style={{ marginBottom: '20px' }}>
          {initialData ? 'Edit Cheese' : 'Add New Cheese'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Name *</label>
            <input 
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Gruyère"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Type (Art)</label>
            <input 
              value={formData.art}
              onChange={e => setFormData({...formData, art: e.target.value})}
              placeholder="e.g. Hard cheese"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Supplier (Lieferant)</label>
            <input 
              value={formData.lieferant}
              onChange={e => setFormData({...formData, lieferant: e.target.value})}
              placeholder="e.g. Migros"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Description</label>
            <textarea 
              rows={4}
              value={formData.beschrieb}
              onChange={e => setFormData({...formData, beschrieb: e.target.value})}
              placeholder="Tasting notes..."
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="button" className="secondary" onClick={onCancel} style={{ flex: 1 }}>Cancel</button>
            <button type="submit" style={{ flex: 1 }}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

