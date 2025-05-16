import { useEffect, useState } from 'react';
import type { FormEvent } from 'react'
import type { ToDos } from '../models/ToDos';
import '../components/Menu.tsx';

function MainPage() {
  const [toDos, setToDos] = useState<ToDos[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // fetch whenever the component mounts or searchTerm changes
  useEffect(() => {
    const query = searchTerm.trim()
      ? `?title=${encodeURIComponent(searchTerm.trim())}`
      : '';
    fetch(`http://localhost:8080/ToDos${query}`)
      .then(res => res.json())
      .then(json => setToDos(json))
      .catch(err => console.error('Failed to fetch To-Dos:', err));
  }, [searchTerm]);

  // handle form submission (we actually don't need it if we're auto-fetching on change,
  // but it prevents a full-page reload if you wrap in a <form>)
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    // nothing else to do—useEffect will run because searchTerm has been set
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="main-page">
      <div className="toDo-list">
        <h1>All To-Dos</h1>

        <form onSubmit={handleSearch} style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Search by title…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ padding: '0.5rem', width: '200px' }}
          />
          <button type="submit" style={{ marginLeft: '0.5rem' }}>
            Search
          </button>
          <button 
            type="button" 
            onClick={clearSearch} 
            style={{ marginLeft: '0.5rem' }}
            disabled={!searchTerm.trim()}
          >
            Clear
          </button>
        </form>

        <div className="todo-list">
          {toDos.length === 0 ? (
            <p>No matching to-dos found.</p>
          ) : (
            toDos.map(todo => (
              <div key={todo.id} className="todo-item">
                <h2>{todo.title}</h2>
                <p>ID: {todo.id}</p>
                <p style={{ color: todo.completed ? 'green' : 'inherit' }}>
                  {todo.completed ? 'Completed' : 'Pending'}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
