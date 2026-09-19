import React, { useState } from 'react';
import CopyButton from '../components/CopyButton.jsx';

const WORDS =
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'.split(
    ' '
  );

function randomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function makeSentence(minWords = 6, maxWords = 16) {
  const len = minWords + Math.floor(Math.random() * (maxWords - minWords));
  const words = Array.from({ length: len }, randomWord);
  const sentence = words.join(' ');
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
}

function makeParagraph(sentenceCount, isFirst) {
  const sentences = [];
  if (isFirst) {
    sentences.push('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
    sentenceCount -= 1;
  }
  for (let i = 0; i < Math.max(sentenceCount, 1); i += 1) sentences.push(makeSentence());
  return sentences.join(' ');
}

export default function LoremIpsum({ onUse }) {
  const [unit, setUnit] = useState('paragraphs');
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState('');

  function generate() {
    onUse?.();
    const n = Math.min(Math.max(parseInt(count, 10) || 1, 1), 50);
    if (unit === 'words') {
      const words = Array.from({ length: n }, randomWord);
      words[0] = 'Lorem';
      const text = words.join(' ') + '.';
      setOutput(text);
    } else if (unit === 'sentences') {
      const sentences = Array.from({ length: n }, (_, i) => (i === 0 ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' : makeSentence()));
      setOutput(sentences.join(' '));
    } else {
      const paragraphs = Array.from({ length: n }, (_, i) => makeParagraph(5, i === 0));
      setOutput(paragraphs.join('\n\n'));
    }
  }

  return (
    <div>
      <div className="field-row">
        <div>
          <label className="field-label" htmlFor="li-unit">Generate by</label>
          <select id="li-unit" className="field-select" value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="li-count">Amount</label>
          <input
            id="li-count"
            type="number"
            min="1"
            max="50"
            className="field-input"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </div>
      </div>
      <button type="button" className="btn btn-primary" onClick={generate}>Generate</button>
      {output && (
        <>
          <div className="result-box" style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-body)' }}>{output}</div>
          <CopyButton getText={() => output} />
        </>
      )}
    </div>
  );
}
