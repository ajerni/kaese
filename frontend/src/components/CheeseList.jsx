import React, { useState, useMemo } from 'react';
import CheeseCard from './CheeseCard';
import { Search, ArrowUpDown, X } from 'lucide-react';

export default function CheeseList({ cheeses, currentUser, onRate, onDelete, onEdit }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredAndSortedCheeses = useMemo(() => {
    let result = [...cheeses];

    // Filter
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(q) || 
        (c.art && c.art.toLowerCase().includes(q)) || 
        (c.lieferant && c.lieferant.toLowerCase().includes(q))
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      
      const getAvg = (c) => {
        const r = c.ratings ? (typeof c.ratings === 'string' ? JSON.parse(c.ratings) : c.ratings) : {};
        const vals = Object.values(r);
        return vals.length ? vals.reduce((x, y) => x + y, 0) / vals.length : 0;
      };

      if (sortBy === 'rating_desc') return getAvg(b) - getAvg(a);
      if (sortBy === 'rating_asc') return getAvg(a) - getAvg(b);
      // Assuming higher ID is newer
      if (sortBy === 'newest') return b.id - a.id;
      
      return 0;
    });

    return result;
  }, [cheeses, search, sortBy]);

  return (
    <div>
      <div className="controls" style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px', 
        flexWrap: 'wrap',
        background: 'rgba(0,0,0,0.4)',
        padding: '10px',
        borderRadius: '8px'
      }}>
        <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--cheese-yellow)' }} />
          <input 
            type="text" 
            placeholder="Search cheese..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: '35px', paddingRight: '35px' }}
          />
          {search && (
            <button 
              onClick={() => setSearch('')}
              style={{ 
                position: 'absolute', 
                right: '5px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                background: 'transparent', 
                border: 'none', 
                padding: '5px',
                minWidth: 'auto',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={16} color="var(--cheese-yellow)" />
            </button>
          )}
        </div>
        
        <div style={{ width: '150px', position: 'relative' }}>
           <ArrowUpDown size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--cheese-yellow)' }} />
           <select 
             value={sortBy} 
             onChange={e => setSortBy(e.target.value)}
             style={{ paddingLeft: '35px' }}
           >
             <option value="name">Name (A-Z)</option>
             <option value="rating_desc">Rating (High-Low)</option>
             <option value="rating_asc">Rating (Low-High)</option>
             <option value="newest">Newest First</option>
           </select>
        </div>
      </div>

      <div className="list">
        {filteredAndSortedCheeses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
            No cheese found. Add one!
          </div>
        ) : (
          filteredAndSortedCheeses.map(cheese => (
            <CheeseCard 
              key={cheese.id} 
              cheese={cheese} 
              currentUser={currentUser}
              onRate={onRate}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </div>
  );
}

