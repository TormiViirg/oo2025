import { useEffect, useRef, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import type { Word } from '../models/Words';

function EditWords() {
    
    const [words, setWords] = useState<Word[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/words")
            .then(res=>res.json())
            .then(json=> setWords(json))
    }, []);

    const wordRef = useRef<HTMLInputElement>(null);
    const definitionRef = useRef<HTMLInputElement>(null);

    const addWord = () => {

        const newWord = {
          word: wordRef.current?.value,
          definition: definitionRef.current?.value,
        }
    
        fetch(`http://localhost:8080/words`, {
            method: "POST",
            body: JSON.stringify(newWord),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res=>res.json())
        .then(json=> {
            if (json.message === undefined && json.timestamp === undefined && json.status === undefined) {
                setWords(json);
                toast.success("New word sucessfully added!");
            } else {
                toast.error(json.message);
            }
        })
    }

    return (
        <div>
            <h2>Manage Products</h2>

            <label>Word</label> <br />
            <input ref={wordRef} type="text" /> <br />
            <label>Definition</label> <br />
            <input ref={definitionRef} type="text" /> <br />

            <button onClick={() => addWord()}>Add word and definition</button>

            <table>
                <thead>
                <tr>
                    <th>Word</th>
                    <th>|Definition</th>
                </tr>
                </thead>
                <tbody>
                {words.map((word) => (
                    <tr key={word.wordId}>
                    <td>{word.word}</td>
                    <td>{word.definition}</td>
                    <td>
                        <Link to={"/admin/words/" + word.wordId}>
                        <button>Edit</button>
                        </Link>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <ToastContainer/>
        </div>
    );
}

export default EditWords;