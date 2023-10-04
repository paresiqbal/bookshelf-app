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

// delete one book
function deleteBook(bookId) {
  const bookTarget = findBookIndex(bookId);
  swal({
    title: "Delete this book ?",
    text: "Once it's deleted cannot be restore",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      books.splice(bookTarget, 1);
      document.dispatchEvent(new Event(RENDER_EVENT));
      saveData();

      swal("Success", "Book deleted", "success");
    } else {
      swal("Book not deleted");
    }
  });
}

// delete all book
function deleteAllBook() {
  swal({
    title: "Apakah Anda Yakin?",
    text: "Semua buku akan dihapus secara permanen dari rak, Anda tidak bisa memulihkannya kembali!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      books.splice(0, books.length);
      document.dispatchEvent(new Event(RENDER_EVENT));
      saveData();

      swal("Berhasil", "Semua buku sudah dihapus dari rak", "success");
    } else {
      swal("Rak batal dikosongkan");
    }
  });
}

// change status of the book
function changeBookStatus(bookId) {
  const bookId = bookId;

  for (const i in books) {
    if (i === bookId) {
      books[i].isComplete = false;
    } else {
      books[i].isComplete = true;
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// function search book
function searchBooks() {
  const inputSearchValue = document
    .getElementById("searchBookTitle")
    .value.toLowerCase();
  const incompleteBookShelf = document.getElementById(
    "incompleteBookshelfList"
  );
  const completeBookShelf = document.getElementById("completeBookshelfList");
  incompleteBookShelf.innerHTML = "";
  completeBookShelf.innerHTML = "";

  if (inputSearchValue == "") {
    document.dispatchEvent(new Event(RENDER_EVENT));
    return;
  }

  for (const book of books) {
    if (book.title.toLowerCase().includes(inputSearchValue)) {
      if (book.isCompleted == false) {
        let el = `
           <article class="book_item">
              <h3>${book.title}</h3>
              <p>Penulis : ${book.author}</p>
              <p>Tahun Terbit : ${book.year}</p>

              <div class="action">
                 <button class="btn-green" onclick="changeBookStatus(${book.id})">Selesai di Baca</button>
                 <button class="btn-red" onclick="removeBook(${book.id})">Hapus Buku</button>
                 <button class="btn-orange" onclick="editBookData(${book.id})">Edit buku</button>
                 </div>
           </article>
           `;

        incompleteBookShelf.innerHTML += el;
      } else {
        let el = `
           <article class="book_item">
              <h3>${book.title}</h3>
              <p>Penulis : ${book.author}</p>
              <p>Tahun Terbit : ${book.year}</p>

              <div class="action">
                 <button class="btn-green" onclick="changeBookStatus(${book.id})">Belum selesai di Baca</button>
                 <button class="btn-red" onclick="removeBook(${book.id})">Hapus Buku</button>
                 <button class="btn-orange" onclick="editBookData(${book.id})">Edit buku</button>
                 </div>
           </article>
           `;

        completeBookShelf.innerHTML += el;
      }
    }
  }
}
