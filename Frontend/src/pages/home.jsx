/*import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Home() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get("/books")
      .then(res => {
        console.log(res.data);
        setBooks(Array.isArray(res.data) ? res.data : res.data.books || []);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Home Page</h1>

      <Link to="/login">Login</Link> |{" "}
      <Link to="/register">Register</Link>

      <h2>Books</h2>

      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        books.map(book => (
          <div key={book.id}>
            <h3>{book.title}</h3>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;*/
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

  // 🔥 Improved request handler
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

      {/* 🔗 Navigation */}
      <div style={{ marginBottom: "20px" }}>
        <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
        <Link to="/add-book">Add Book</Link>
        <Link to="/dashBoard">Dashboard</Link>
      </div>

      <h1>📚 Book Exchange</h1>

      {/* ⏳ Loading */}
      {loading && <p>Loading Books...</p>}

      {/* ❌ Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 📭 Empty */}
      {!loading && books.length === 0 && (
        <p>No books available</p>
      )}

      {/* 📚 Book List */}
      <div>
        {books.map((book) => (
          <div
            key={book.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}
          >
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Subject:</strong> {book.subject}</p>
            <p><strong>Condition:</strong> {book.condition}</p>

            {/* 🔥 Improved Button */}
            <button
              onClick={() => handleRequest(book.id)}
              disabled={book.status === "EXCHANGED"}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                backgroundColor:
                  book.status === "EXCHANGED" ? "gray" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor:
                  book.status === "EXCHANGED"
                    ? "not-allowed"
                    : "pointer"
              }}
            >
              {book.status === "EXCHANGED"
                ? "Unavailable"
                : "Request"}
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;