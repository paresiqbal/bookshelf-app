const books = [];
const RENDER_EVENT = "displayBook";
const STORAGE = "Bookshelf";
const form = document.getElementById("addBook");
const searchBookTitle = document.getElementById("searchTitle");
const searchBook = document.getElementById("searchBook");
const bookId = () => +new Date();

searchBookTitle.addEventListener("keyup", (event) => {
  event.preventDefault();
  searchBooks();
});

searchBook.addEventListener("submit", (event) => {
  event.preventDefault();
  searchBooks();
});

// check webstorage
function webstorage() {
  if (typeof Storage === "undefined") {
    console.log("Sorry Web Storage Doesn't Exists");
    return false;
  }

  return true;
}
