import React from "react";

function App() {
  const [notes, setNotes] = React.useState([]);
  // const [form, setForm] = React.useState({ newNotes: "" });
  const [isState, setIsState] = React.useState(false);

  const API_URL = "http://localhost:5038";

  React.useEffect(() => {
    fetch(`${API_URL}/api/todoapp/getnotes`)
      .then((response) => {
        return response.json();
      })
      .then((data) => setNotes(data));
  }, [isState]);

  function takeNotes(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    fetch(`${API_URL}/api/todoapp/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    })
      .then((response) => response.json())
      .then((result) => {
        setIsState(true);
        alert(result);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to add note");
      });
  }

  return (
    <>
      <h1>Todo</h1>
      <form onSubmit={takeNotes} className="flex gap-2">
        <input type="text" name="newNotes" />
        <button type="submit">Add notes</button>
      </form>
      <ul>
        {notes &&
          notes.map((i, index) => (
            <li key={index} className="">
              {i.description}
            </li>
          ))}
      </ul>
    </>
  );
}

export default App;
