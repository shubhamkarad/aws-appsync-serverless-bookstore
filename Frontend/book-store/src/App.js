import "./App.css";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { getBookById, createBook, listBooks } from "./graphql/queries/book";
import React, { useEffect, useState } from "react";
function App() {
  const [book, setBook] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [books, setBookDetails] = useState("");
  useEffect(() => {
    console.log(books);
    const fetchBooks = async () => {
      await API.graphql({
        query: listBooks,
        variables: { limit: 5 },
        authMode: "AWS_IAM",
      }).then((res) => {
        console.log("res", res);
        setBookDetails(res.data.listBooks.books);
        console.log(books);
      });
    };
    fetchBooks();
  }, []);

  const getBook = async () => {
    const book = await API.graphql({
      query: getBookById,
      variables: { id: "ae4fca2b-507b-4fcd-a406-4171ca0f0074" },
      authMode: "AWS_IAM",
    });
    setBook(book.data.getBookById);
  };
  const getFormattedDate = (date) => {
    let theDate = new Date(Date.parse(date));
    return theDate.toLocaleString();
  };
  const bookDetails = () => {
    if (book) {
      return (
        <div className="container">
          <div className="card">
            <article>
              <img src={book.imageUrl} />
              <h3>{book.title}</h3>
              <p>{book.price}</p>
              <p>{getFormattedDate(book.createdAt)}</p>
              <p>{getFormattedDate(book.updatedAt)}</p>
              <h4>{book.author}</h4>
            </article>
          </div>
        </div>
      );
    }
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await API.graphql({
      query: createBook,
      variables: {
        author: `${author}`,
        description: `${description}`,
        price: `${price}`,
        imageUrl:
          "https://images-na.ssl-images-amazon.com/images/I/71PNGYHykrL._AC_UL254_SR254,254_.jpg",
        title: `${title}`,
      },
      authMode: "AWS_IAM",
    });
    setAuthor("");
    setDescription("");
    setPrice("");
    setTitle("");
  };
  return (
    // <AmplifyAuthenticator>
    <div>
      My App
      {/* <AmplifySignOut /> */}
      <section>
        <button onClick={() => getBook()}>Get Book Details</button>
        <hr />
        {bookDetails()}
      </section>
      <section>
        <hr />
        <div className="container">
          {books
            ? books.map((book, index) => (
                <div className="card" key={index}>
                  <article>
                    <img src={book.imageUrl} />
                    <h3>{book.title}</h3>
                    <p>{book.price}</p>
                    <p>{getFormattedDate(book.createdAt)}</p>
                    <p>{getFormattedDate(book.updatedAt)}</p>
                    <h4>{book.author}</h4>
                  </article>
                </div>
              ))
            : ""}
        </div>
      </section>
      <section>
        <form onSubmit={onSubmitHandler}>
          <h1>Add a new Book</h1>
          <div className="info">
            <input
              type="text"
              name="name"
              placeholder="Book Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              name="name"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              type="number"
              name="name"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <p>Description</p>
          <div>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
    //{" "}
    // </AmplifyAuthenticator>
  );
}

export default App;
