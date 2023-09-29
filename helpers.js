const FINISH_READ_BOOK = "finish";
const NOT_FINISH_READ_BOOK = "notFinish";
const BOOK_ID = "bookId";

const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const bookYear = document.getElementById("year");
let bookStatus = false;

function addBook() {
  const notFinishReadBook = document.getElementById(NOT_FINISH_READ_BOOK);

  const book = createBook(bookTitle, bookAuthor, bookYear, bookStatus);
  const bookObject = addBookObject(bookTitle, bookAuthor, bookYear, bookStatus);

  book[BOOK_ID] = bookObject.id;
  book.push(bookObject);

  notFinishReadBook.append(book);
}

function createBook(bookTitle, bookAuthor, bookYear, bookStatus) {
  const createCoverBook = document.createElement("img");
  createBook.setAttribute("src", "assests/book-close.png");

  const bookImage = document.createElement("div");
  bookImage.classList.add("book-image");
  bookImage.append(createCoverBook);

  const title = document.createElement("h3");
  title.innerText = bookTitle;

  const author = document.createElement("p");
  author.innerText = bookAuthor;

  const year = document.createElement("p");
  year.innerText = `Release in ${year}`;

  const description = document.createElement("div");
  description.classList.add("description");
  description.append(title, author, year);

  const button = document.createElement("div");
  button.classList.add("button");

  if (bookStatus) {
    button.classList.add("completed");
    button.append(createUncompletedButton(), createTrashButton());
  } else {
    button.classList.add("uncompleted");
    button.append(createCompletedButton(), createTrashButton());
  }
}
