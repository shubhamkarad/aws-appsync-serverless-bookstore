export const getBookById = `query getBookById($id: String!) {
    getBookById(bookId: $id) {
      title
      imageUrl
      author
      bookId
      createdAt
      description
      price
      updatedAt
    }
  }
  `;

export const createBook = `mutation createBook($author: String!, $description: String, $imageUrl: AWSURL, $price: Float!, $title: String!) {
  createBook(newBook: {author: $author, description: $description, imageUrl: $imageUrl, price: $price, title: $title}) {
    author
    createdAt
    bookId
    description
    imageUrl
    price
    title
    updatedAt
  }
}
`;

export const listBooks = `query listBooks($limit: Int!) {
  listBooks(limit: $limit) {
    books {
      author
      bookId
      createdAt
      description
      imageUrl
      price
      title
      updatedAt
    }
    nextToken
  }
}`;
