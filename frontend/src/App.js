import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState(""); // Task added/deleted message
  const [backendStatus, setBackendStatus] = useState("Checking..."); // ✅ Backend status

  // Load tasks from backend
  const loadTasks = () => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch(() => setBackendStatus("❌ Backend not reachable"));
  };

  // Check backend connection
  const checkBackend = () => {
    fetch("http://localhost:5000/test-db")
      .then((res) => res.text())
      .then(() => setBackendStatus("✅ Backend connected"))
      .catch(() => setBackendStatus("❌ Backend not reachable"));
  };

  // Add task
  const addTask = () => {
    if (!title || !description) return alert("Please fill all fields");

    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTitle("");
        setDescription("");
        setMessage(data.message); // Show task added message
        loadTasks();

        setTimeout(() => setMessage(""), 3000);
      })
      .catch(() => setBackendStatus("❌ Backend not reachable"));
  };

  // Delete task
  const deleteTask = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        loadTasks();
        setTimeout(() => setMessage(""), 3000);
      })
      .catch(() => setBackendStatus("❌ Backend not reachable"));
  };

  useEffect(() => {
    loadTasks();
    checkBackend();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 p-10 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
        📝 Task Manager
      </h1>

      {/* Backend status */}
      <div
        className={`mb-4 p-3 rounded-lg shadow-lg text-white ${
          backendStatus.includes("✅") ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {backendStatus}
      </div>

      {/* Task added/deleted message */}
      {message && (
        <div className="mb-4 p-3 bg-yellow-500 text-white rounded-lg shadow-lg">
          {message}
        </div>
      )}

      {/* Add Task Form */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl mb-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Add New Task</h2>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
        />
        <button
          onClick={addTask}
          className="w-full bg-indigo-500 text-white font-bold py-3 rounded-lg hover:bg-indigo-600 transition-colors"
        >
          Add Task
        </button>
      </div>

      {/* Tasks List */}
      <div className="w-full max-w-4xl grid grid-cols-3 gap-6">
        {tasks.length === 0 && (
          <p className="text-white col-span-3 text-center">No tasks yet!</p>
        )}

        {tasks.map((t) => (
          <div
            key={t.id}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold text-indigo-700 mb-2">{t.title}</h3>
              <p className="text-gray-600">{t.description}</p>
            </div>
            <button
              onClick={() => deleteTask(t.id)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors self-start"
            >
               Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
