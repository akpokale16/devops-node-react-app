
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/notes")
      .then(res => setNotes(res.data));
  }, []);

  const addNote = async () => {
    await axios.post("http://localhost:5000/api/notes", { note });
    setNote("");
    const res = await axios.get("http://localhost:5000/api/notes");
    setNotes(res.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>DevOps Notes</h2>
      <input value={note} onChange={e => setNote(e.target.value)} />
      <button onClick={addNote}>Add</button>
      <ul>{notes.map((n, i) => <li key={i}>{n}</li>)}</ul>
    </div>
  );
}

export default App;
