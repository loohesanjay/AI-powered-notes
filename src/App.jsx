import { useState } from "react";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  function addNote() {
    if (text === "") return;
    setNotes([...notes, text]);
    setText("");
  }
  function startListening() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.start();

    recognition.onresult = (event) => {
      setText(event.results[0][0].transcript);
    };
  }

  return (
    <div className="app">

      <h1>AI Notes App</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your note..."
        rows="4"
        style={{ width: "100%" }}
      />
      <button onClick={startListening}>Speak</button>

      <input
        placeholder="Search notes..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {notes
          .filter(note => note.toLowerCase().includes(search.toLowerCase()))
          .map((note, i) => (
            <li key={i}>{note}</li>
          ))}
      </ul>
    </div>
  );
}
