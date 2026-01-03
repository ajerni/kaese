import React, { useState, useEffect } from 'react';
import { getCheeses, addCheese, updateCheese, updateRating, deleteCheese } from './api';
import UserSelect from './components/UserSelect';
import CheeseList from './components/CheeseList';
import CheeseForm from './components/CheeseForm';
import { Plus, Loader } from 'lucide-react';

function App() {
  const [cheeses, setCheeses] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCheese, setEditingCheese] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCheeses();
  }, []);

  const loadCheeses = async () => {
    try {
      const res = await getCheeses();
      // Ensure data is array (api might return error object if fail)
      if (Array.isArray(res.data)) {
        setCheeses(res.data);
      } else {
        console.error("API returned non-array", res.data);
      }
    } catch (err) {
      console.error("Failed to load cheeses", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRate = async (id, rating) => {
    if (!currentUser) return alert('Select a user (Max, Mia, Jeanine, Andi) at the top first!');
    
    // Optimistic update
    setCheeses(prev => prev.map(c => {
      if (c.id === id) {
        const r = c.ratings ? (typeof c.ratings === 'string' ? JSON.parse(c.ratings) : c.ratings) : {};
        return { ...c, ratings: { ...r, [currentUser]: rating } };
      }
      return c;
    }));

    try {
      await updateRating(id, currentUser, rating);
      // Ideally we don't need to reload if optimistic update was correct, 
      // but reloading ensures consistency with DB triggers (changed_on)
      loadCheeses();
    } catch (err) {
      console.error(err);
      loadCheeses(); // Revert on error
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Really delete this cheese?')) return;
    try {
      await deleteCheese(id);
      setCheeses(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (data) => {
    try {
      if (editingCheese) {
        // Merge existing cheese data (including ratings) with the new form data
        await updateCheese({ ...editingCheese, ...data });
      } else {
        await addCheese(data);
      }
      setShowForm(false);
      setEditingCheese(null);
      loadCheeses();
    } catch (err) {
      console.error(err);
      alert('Failed to save');
    }
  };

  const openAdd = () => {
    setEditingCheese(null);
    setShowForm(true);
  };

  const openEdit = (cheese) => {
    setEditingCheese(cheese);
    setShowForm(true);
  };

  return (
    <div className="app-container">
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '30px',
        borderBottom: '1px solid var(--cheese-yellow)',
        paddingBottom: '20px'
      }}>
        <h1 style={{ fontSize: '2rem', textShadow: '0 0 10px #F4C430' }}>🧀 Käse App</h1>
        <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Plus size={20} /> Add Cheese
        </button>
      </header>

      <UserSelect currentUser={currentUser} onSelect={setCurrentUser} />
      
      <div style={{ margin: '20px 0', height: '1px', background: 'rgba(255,255,255,0.1)' }} />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Loader className="animate-spin" size={40} color="var(--cheese-yellow)" />
        </div>
      ) : (
        <CheeseList 
          cheeses={cheeses} 
          currentUser={currentUser} 
          onRate={handleRate}
          onDelete={handleDelete}
          onEdit={openEdit}
        />
      )}

      {showForm && (
        <CheeseForm 
          initialData={editingCheese} 
          onSubmit={handleSave} 
          onCancel={() => { setShowForm(false); setEditingCheese(null); }} 
        />
      )}
    </div>
  );
}

export default App;
