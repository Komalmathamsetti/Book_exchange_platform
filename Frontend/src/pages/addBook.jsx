import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AddBook() {

  const [form, setForm] = useState({
    title: "",
    author: "",
    subject: "",
    condition: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/books", {
        ...form,
        owner_id: 1
      });

      alert("Book added successfully");
      navigate("/");

    } catch (error) {
      console.error(error);
      alert("Failed to add book");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh"
    }}>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#1e293b",
          padding: "30px",
          borderRadius: "10px",
          width: "350px",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)"
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>📚 Add Book</h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="text"
          name="condition"
          placeholder="Condition"
          value={form.condition}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "20px", padding: "8px" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            backgroundColor: "#3b82f6",
            color: "white"
          }}
        >
          Add Book
        </button>

      </form>

    </div>
  );
}

export default AddBook;