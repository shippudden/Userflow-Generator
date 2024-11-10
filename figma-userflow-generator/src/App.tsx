import { useState } from 'react';
import './App.css';

interface Requirement {
  id: string;
  title: string;
  description: string;
}

function App() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addRequirement = () => {
    if (title && description) {
      setRequirements([
        ...requirements,
        {
          id: Date.now().toString(),
          title,
          description,
        },
      ]);
      setTitle('');
      setDescription('');
    }
  };

  const generateFlow = () => {
    parent.postMessage(
      { pluginMessage: { type: 'generate-flow', requirements } },
      '*'
    );
  };

  return (
    <div className="container">
      <h1>UserFlow Generator</h1>
      
      <div className="input-group">
        <input
          type="text"
          placeholder="Step Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />
        <textarea
          placeholder="Step Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea"
        />
        <button onClick={addRequirement} className="button">
          Add Step
        </button>
      </div>

      <div className="requirements-list">
        {requirements.map((req) => (
          <div key={req.id} className="requirement-item">
            <h3>{req.title}</h3>
            <p>{req.description}</p>
          </div>
        ))}
      </div>

      {requirements.length > 0 && (
        <button onClick={generateFlow} className="button generate">
          Generate User Flow
        </button>
      )}
    </div>
  );
}

export default App;