import { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
//import { Link } from "react-router-dom"
import type { ToDos } from '../models/ToDos'

function ManageToDos() {
    const [toDos, setToDos] = useState<ToDos[]>([])

    useEffect(() => {
        fetch('http://localhost:8080/ToDos')
            .then(res => res.json())
            .then(json => setToDos(json))
    }, [])

    const titleRef = useRef<HTMLInputElement>(null)
    const completedRef = useRef<HTMLInputElement>(null)
    const userRef = useRef<HTMLInputElement>(null)

    const addToDo = () => {
        const newToDo = {
            title: titleRef.current?.value,
            completed: completedRef.current?.checked,
            userId: Number(userRef.current?.value),
        }

        fetch('http://localhost:8080/ToDos', {
            method: 'POST',
            body: JSON.stringify(newToDo),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(json => {
                if (!json.message && !json.timestamp && !json.status) {
                    setToDos(prev => [...prev, json])
                    toast.success('New ToDo successfully added!')
                } else {
                    toast.error(json.message)
                }
            })
    }

    const toggleCompleted = (id: number, completed: boolean) => {
        fetch(`http://localhost:8080/ToDos?id=${id}&field=completed&value=${completed}`, {
            method: 'PATCH',
        })
            .then(res => res.json())
            .then(json => {
                setToDos(json)
                toast.info(`ToDo ${id} marked as ${completed ? 'completed' : 'pending'}`)
            })
            .catch(err => {
                console.error(err)
                toast.error('Failed to update status')
            })
    }

    return (
        <div>
            <h2>Manage ToDos</h2>

            <label htmlFor="title">Title:</label><br />
            <input id="title" ref={titleRef} type="text" /><br />

            <label htmlFor="completed">Completed:</label><br />
            <input id="completed" ref={completedRef} type="checkbox" /><br />

            <label htmlFor="userId">Creator (User ID):</label><br />
            <input id="userId" ref={userRef} type="number" /><br />

            <button onClick={addToDo}>Add ToDo</button>

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Toggle</th>
                        <th>Creator</th>
                    </tr>
                </thead>
                <tbody>
                    {toDos.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.title}</td>
                            <td>{todo.completed ? 'Completed' : 'Pending'}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={!!todo.completed}               
                                    onChange={() => toggleCompleted(todo.id, !todo.completed)}
                                />

                            </td>
                            <td>{todo.userId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ToastContainer />
        </div>
    )
}

export default ManageToDos
