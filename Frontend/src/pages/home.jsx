
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Home() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Request handler
  const handleRequest = async (book_id) => {
    try {
      const res = await API.post("/exchange", {
        book_id,
        requester_id: 1
      });

      alert(res.data.message || "Request sent");

    } catch (error) {
      console.error(error.response?.data || error);

      alert(
        error.response?.data?.message || "Request failed"
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      {/* 🔝 Navbar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px"
      }}>
        <h2>📚 Book Exchange</h2>

        <div>
          <Link to="/">Home</Link>{" "}
          <Link to="/dashboard">Dashboard</Link>{" "}
          <Link to="/add-book">Add Book</Link>{" "}
          <Link to="/login">Login</Link>
        </div>
      </div>

      {/* 🔥 Loading & Error */}
      {loading && <p>Loading books...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 📚 Books Grid */}
      {!loading && books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px"
        }}>
          {books.map((book) => (
            <div key={book.id} style={{
              backgroundColor: "#1e293b",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)"
            }}>
              <h3>{book.title}</h3>
              <p><b>Author:</b> {book.author}</p>
              <p><b>Subject:</b> {book.subject}</p>
              <p><b>Condition:</b> {book.condition}</p>

              <button
                onClick={() => handleRequest(book.id)}
                style={{
                  backgroundColor: "#3b82f6",
                  color: "white",
                  marginTop: "10px"
                }}
              >
                Request
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Home;