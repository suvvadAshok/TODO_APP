import React from "react";

function App() {
  const [notes, setNotes] = React.useState([]);
  const [form, setForm] = React.useState({ description: "" });

  const API_URL = "http://localhost:5038";

  React.useEffect(() => {
    fetch(`${API_URL}/api/todoapp/getnotes`)
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, []);

  function takeNotes(e) {
    e.preventDefault();

    setForm(new FormData());

    fetch(`${API_URL}/api/todoapp/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((result) => alert(result))
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to add note");
      });
  }

  console.log("---", notes);
  console.log("form", form);

  return (
    <>
      <h1>Todo</h1>
      <form onSubmit={takeNotes} className="flex gap-2">
        <input type="text" name="" id="" />
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



