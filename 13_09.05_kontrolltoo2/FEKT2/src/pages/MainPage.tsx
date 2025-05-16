import { useEffect, useState } from 'react'
//import { Link } from 'react-router-dom'
import type { ToDos } from '../models/ToDos';
import '../components/Menu.css';

function MainPage() {
    
    const [toDos, setToDos] = useState<ToDos[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8080/toDos`) 
            .then(res => res.json()) 
            .then(json => setToDos(json)) 
    }, []);


    return (
        <div>
            <div className="main-page">
                <div className="toDo-list">
                    <h1>All To-Dos</h1>
                    <div className="todo-list">
                        {toDos.map(todo => (
                        <div key={todo.id} className="todo-item">
                            <h2>{todo.title}</h2>
                            <p>ID: {todo.id}</p>
                            <p>{todo.completed ? 'Completed' : 'Pending'}</p>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MainPage;