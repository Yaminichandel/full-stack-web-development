import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-solidity';
import 'ace-builds/src-noconflict/mode-rust';
import 'ace-builds/src-noconflict/mode-motoko';
import 'ace-builds/src-noconflict/theme-monokai';

const App = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('solidity');
  const [difficulty, setDifficulty] = useState('easy');
  const [output, setOutput] = useState('');

  const compileCode = async () => {
    try {
      // Send code, language, and difficulty level to backend for compilation
      const response = await fetch('http://localhost:3001/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language, difficulty }),
      });
      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      console.error('Error compiling code:', error);
    }
  };

  return (
    <div>
      <h1>Web-Based Compiler</h1>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="solidity">Solidity</option>
        <option value="rust">Rust</option>
        <option value="motoko">Motoko</option>
      </select>
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <AceEditor
        mode={language}
        theme="monokai"
        value={code}
        onChange={(newCode) => setCode(newCode)}
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
      />
      <button onClick={compileCode}>Compile</button>
      <div>
        <h2>Output:</h2>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default App;
