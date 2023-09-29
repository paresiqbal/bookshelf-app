const FINISH_READ_BOOK = "finish";
const NOT_FINISH_READ_BOOK = "notFinish";
const BOOK_ID = "bookId";

const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const bookYear = document.getElementById("year");
const bookStatus = false;

function addBook() {
  const notFinishReadBook = document.getElementById(NOT_FINISH_READ_BOOK);

  const book = createBook(bookTitle, bookAuthor, bookYear, bookStatus);
  const bookObject = addBookObject(bookTitle, bookAuthor, bookYear, bookStatus);

  book[BOOK_ID] = bookObject.id;
  book.push(bookObject);

  notFinishReadBook.append(book);
}
