const books = [];
const RENDER_EVENT = "displayBook";
const STORAGE = "Bookshelf";
const form = document.getElementById("addBook");
const searchBookTitle = document.getElementById("searchTitle");
const searchBook = document.getElementById("searchBook");

inputSearchBook.addEventListener("keyup", (e) => {
  e.preventDefault();
  searchBooks();
});

formSearchBook.addEventListener("submit", (e) => {
  e.preventDefault();
  searchBooks();
});
