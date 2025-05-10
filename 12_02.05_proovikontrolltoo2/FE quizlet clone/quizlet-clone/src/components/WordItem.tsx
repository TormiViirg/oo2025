import type { Word } from '../models/Words';

type Props = {
  word: Word;
  isVisible: boolean;
  onToggle: () => void;
};

export default function WordItem({ word, isVisible, onToggle }: Props) {
  return (
    <div className="word-item">
      <div>{word.word}</div>
      <button onClick={onToggle}>
        {isVisible ? 'Hide definition' : 'Show definition'}
      </button>
      {isVisible && <div className="definition">{word.definition}</div>}
    </div>
  );
}