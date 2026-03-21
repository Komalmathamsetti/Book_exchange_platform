import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get("/books")
      .then(res => {
        console.log(res.data);
        setBooks(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Books</h1>

      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        books.map(book => (
          <div key={book.id}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;