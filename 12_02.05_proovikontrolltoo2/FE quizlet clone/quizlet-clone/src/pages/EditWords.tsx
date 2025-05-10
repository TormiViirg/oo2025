import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import type { Word } from '../models/Words'

export default function EditWord() {
  const { wordId } = useParams<{ wordId: string }>()
  const navigate = useNavigate()
  const [word, setWord] = useState<string>('')
  const [definition, setDefinition] = useState<string>('')

  useEffect(() => {
    if (!wordId) return
    fetch(`http://localhost:8080/words/${wordId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch word')
        return res.json()
      })
      .then((data: Word) => {
        setWord(data.word)
        setDefinition(data.definition)
      })
      .catch(err => {
        console.error(err)
        toast.error('Could not load word')
      })
  }, [wordId])

  const saveChanges = () => {
    if (!word.trim() || !definition.trim()) {
      toast.error('Both fields are required.')
      return
    }
    fetch(`http://localhost:8080/words/${wordId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word: word.trim(), definition: definition.trim() }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Update failed')
        return res.json()
      })
      .then(() => {
        toast.success('Word updated successfully!')
        navigate('/admin/words')
      })
      .catch(err => {
        console.error(err)
        toast.error('Error updating word')
      })
  }

  return (
    <div>
      <h2>Edit Word</h2>

      <div>
        <label>Word</label>
        <input
          type="text"
          value={word}
          onChange={e => setWord(e.target.value)}
        />
      </div>

      <div>
        <label>Definition</label>
        <input
          type="text"
          value={definition}
          onChange={e => setDefinition(e.target.value)}
        />
      </div>

      <button onClick={saveChanges}>Save Changes</button>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  )
}
