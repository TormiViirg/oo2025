import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import type { Word } from '../models/Words';

function MainPage() {
    
    const [words, setWords] = useState<Word[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [wordsByPage] = useState(10);
    const [page, setPage] = useState(0);
    const [activeWord, setActiveWord] = useState(-1);
    const [sort, setSort] = useState("id,asc");

    useEffect(() => {
        fetch(`http://localhost:8080/words?page=${page}&sort=${sort}`) 
            .then(res => res.json()) 
            .then(json => setWords(json)) 
    }, [page, sort]);

    const showByWord = useCallback((wordId: number, page: number) => {
        setActiveWord(wordId);
        setPage(page);
        fetch("http://localhost:8080/word-definitions?wordId=" + wordId + 
          "&size=" + wordsByPage +
          "&page=" + page +
          "&sort=" + sort
        )
        .then(res=>res.json()) 
        .then(json=> {
            setWords(json.content);
            setTotalPages(json.totalPages);
        }) 
    }, [wordsByPage, sort, setPage]);
    
    useEffect(() => {
        showByWord(activeWord, 0);
    }, [showByWord, activeWord]);

    function updatePage(newPage: number) {
        showByWord(activeWord, newPage);
    }

    return (
        <div>

            <button onClick={() => setSort("name,asc")}>Sort A-Z</button>
            <button onClick={() => setSort("name,desc")}>Sort Z-A</button>

            {words.map(word => 
            <div key={word.wordId}>
                <div>{word.wordId}</div>
                <div>{word.word}</div>
                <div>{word.definition}</div>
                <Link to={"/word/" + word.wordId}>
                <button>Show definition</button>
                </Link>
            </div>
            )}

            <button disabled={page === 0} onClick={() => updatePage(page - 1)}> Previous </button>
            <span>{page + 1}</span>
            <button disabled={page >= totalPages - 1} onClick={() => updatePage(page + 1)}> Next </button>

        </div>
    )
}
export default MainPage;