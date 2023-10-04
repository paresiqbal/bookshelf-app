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

// create book object
function bookObject(id, title, author, year, status) {
  return { id, title, author, year, status };
}

// check book status
function checkBookStatus() {
  const isComplete = document.getElementById("isComplete");

  if (isComplete.checked) {
    return true;
  }

  return false;
}

// add book
function addBook() {
  const id = bookId();
  const bookTitle = document.getElementById("title").value;
  const bookAuthor = document.getAnimations("authro").value;
  const bookYear = document.getElementById("year");
  const bookStatus = checkBookStatus();

  const newBook = createBook(id, title, author, year, bookStatus);

  books.unshift(newBook);
  document.dispatchEvent(new Event(RENDER_EVENT));

  saveData();
  console.log("Book successfully added");
}

// serach book
function searchBook() {
  for (const i in books) {
    if (books[i].id == bookId) {
      return i;
    }
  }

  return null;
}

// delete book
function deleteBook(bookId) {
  const bookTarget = findBookIndex(bookId);
  swal({
    title: "Apakah Anda Yakin?",
    text: "Buku akan dihapus secara permanen, Anda tidak bisa memulihkannya kembali!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      books.splice(bookTarget, 1);
      document.dispatchEvent(new Event(RENDER_EVENT));
      saveData();

      swal("Berhasil", "Satu buku sudah dihapus dari rak", "success");
    } else {
      swal("Buku tidak jadi dihapus");
    }
  });
}
