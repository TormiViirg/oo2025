import { useEffect, useRef, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
//import { Link } from "react-router-dom";
import type { ToDos } from '../models/ToDos';


function ManageWords() {
    
    const [toDos, setToDos] = useState<ToDos[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/todos")
            .then(res=>res.json())
            .then(json=> setToDos(json))
    }, []);

    const titleRef = useRef<HTMLInputElement>(null);
    const completedRef = useRef<HTMLInputElement>(null);
    const userRef = useRef<HTMLInputElement>(null);

    const addToDo = () => {

        const newToDo = {
          title: titleRef.current?.value,
          completed: completedRef.current?.value,
          user: userRef.current?.value
        }
    
        fetch(`http://localhost:8080/toDos`, {
            method: "POST",
            body: JSON.stringify(newToDo),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res=>res.json())
        .then(json=> {
            if (json.message === undefined && json.timestamp === undefined && json.status === undefined) {
                setToDos(json);
                toast.success("New word sucessfully added!");
            } else {
                toast.error(json.message);
            }
        })
    }

    return (
        <div>
            <h2>Manage ToDos</h2>

            <label>Title:</label> <br />
            <input ref={titleRef} type="text" /> <br />
            <label>Completed</label> <br />
            <input ref={completedRef} type="boolean" /> <br />
            <label>userRef</label> <br />
            <input ref={userRef} type="string" /> <br />

            <button onClick={() => addToDo()}>Add Title, status, and creator</button>

            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>|Status</th>
                    <th>|Creator</th>
                </tr>
                </thead>
                <tbody>
                {toDos.map((toDo) => (
                    <tr key={toDo.id}>
                    <td>{toDo.title}</td>
                    <td>{toDo.completed}</td>
                    {/* <td>
                        <Link to={"/admin/words/" + word.wordId}>
                        <button>Edit</button>
                        </Link>
                    </td> */}
                    </tr>
                ))}
                </tbody>
            </table>
            <ToastContainer/>
        </div>
    );
}

export default ManageWords;