const books = [];
const RENDER_BOOK = "render-book";
const STORAGE_KEY = "Bookshelf";
const form = document.getElementById("inputBook");
const formSearchBook = document.getElementById("searchBook");
const bookId = () => +new Date();

formSearchBook.addEventListener("submit", (e) => {
  e.preventDefault();
  searchBooks();
});

// check webstorage browser
function checkWebStorage() {
  return typeof Storage !== "undefined"
    ? true
    : (swal("Your browser does not support web storage"), false);
}

// generate book object
const createBookObject = (id, title, author, year, bookStatus) => {
  return {
    id,
    title,
    author,
    year,
    bookStatus,
  };
};

// checkbox function
function checkStatusBook() {
  const isChecked = document.getElementById("inputBookStatus");
  if (isChecked.checked) {
    return true;
  }
  return false;
}

// add book to bookshelf
function addBook() {
  const bookTitle = document.getElementById("inputTitle").value;
  const bookAuthor = document.getElementById("inputAuthor").value;
  const bookYear = document.getElementById("inputYear").value;
  const bookStatus = checkStatusBook();

  const id = bookId();
  const newBook = createBookObject(
    id,
    bookTitle,
    bookAuthor,
    bookYear,
    bookStatus
  );

  books.unshift(newBook);
  document.dispatchEvent(new Event(RENDER_BOOK));
  saveData();

  swal("Success", "Book successfully added", "success");
}

// find book index using book id
function searchBookIndex(bookId) {
  for (const i in books) {
    if (books[i].id == bookId) {
      return i;
    }
  }
  return null;
}

// function remove book
function removeBook(bookId) {
  const bookTarget = searchBookIndex(bookId);
  swal({
    title: "Are you sure want to delete ?",
    text: "After deleting the book can't be restore",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      books.splice(bookTarget, 1);
      document.dispatchEvent(new Event(RENDER_BOOK));
      saveData();

      swal("Success", "Book successfully deleted", "success");
    }
  });
}

// reset bookshelf to empety
function resetRak() {
  swal({
    title: "Are you sure want to delete all book ?",
    text: "All book's will be deleted and deleted book can't be restore !",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      books.splice(0, books.length);
      document.dispatchEvent(new Event(RENDER_BOOK));
      saveData();

      swal(
        "Success",
        "All book's successfully deleted from the shelf",
        "success"
      );
    }
  });
}

//change status book (read or unread) / click the button
function changeBookStatus(bookId) {
  const bookIndex = searchBookIndex(bookId);
  for (const i in books) {
    if (i === bookIndex) {
      if (books[i].bookStatus === true) {
        books[i].bookStatus = false;
      } else {
        books[i].bookStatus = true;
      }
    }
  }

  document.dispatchEvent(new Event(RENDER_BOOK));
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
    document.dispatchEvent(new Event(RENDER_BOOK));
    return;
  }

  for (const book of books) {
    if (book.title.toLowerCase().includes(inputSearchValue)) {
      if (book.bookStatus == false) {
        let el = `
            <article class="book_item">
               <h3>${book.title}</h3>
               <p>Penulis : ${book.author}</p>
               <p>Tahun Terbit : ${book.year}</p>

               <div class="action">
                  <button class="btn-green" onclick="changeBookStatus(${book.id})">Done read</button>
                  <button class="btn-red" onclick="removeBook(${book.id})">Delete book</button>
                  <button class="btn-orange" onclick="editBook(${book.id})">Edit book</button>
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
                  <button class="btn-green" onclick="changeBookStatus(${book.id})">Not yet read</button>
                  <button class="btn-red" onclick="removeBook(${book.id})">Delete book</button>
                  <button class="btn-orange" onclick="editBook(${book.id})">Edit book</button>
                  </div>
            </article>
            `;

        completeBookShelf.innerHTML += el;
      }
    }
  }
}

// function edit book data
function editBook(bookId) {
  const sectionEdit = document.querySelector(".input_edit_section");
  sectionEdit.style.display = "flex";
  const editTitle = document.getElementById("inputEditTitle");
  const editAuthor = document.getElementById("inputEditAuthor");
  const editYear = document.getElementById("inputEditYear");
  const formEditData = document.getElementById("editData");
  const cancelEdit = document.getElementById("bookEditCancel");
  const SubmitEdit = document.getElementById("bookEditSubmit");

  bookTarget = searchBookIndex(bookId);

  // set old value
  editTitle.setAttribute("value", books[bookTarget].title);
  editAuthor.setAttribute("value", books[bookTarget].author);
  editYear.setAttribute("value", books[bookTarget].year);

  // update data
  SubmitEdit.addEventListener("click", (e) => {
    books[bookTarget].title = editTitle.value;
    books[bookTarget].author = editAuthor.value;
    books[bookTarget].year = editYear.value;

    document.dispatchEvent(new Event(RENDER_BOOK));
    saveData();
    formEditData.reset();
    sectionEdit.style.display = "none";
    swal("Success", "Book data has been edited", "success");
  });

  cancelEdit.addEventListener("click", (e) => {
    e.preventDefault();
    sectionEdit.style.display = "none";
    formEditData.reset();
    swal("Cancel !");
  });
}

// function save data to local storage
function saveData() {
  if (checkWebStorage()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);

    document.dispatchEvent(new Event(RENDER_BOOK));
  }
}

// load data from storage
function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    data.forEach((book) => {
      books.unshift(book);
    });
  }
  document.dispatchEvent(new Event(RENDER_BOOK));
  return books;
}

// show data
function showBook(books = []) {
  const incompleteBookShelf = document.getElementById(
    "incompleteBookshelfList"
  );
  const completeBookShelf = document.getElementById("completeBookshelfList");

  incompleteBookShelf.innerHTML = "";
  completeBookShelf.innerHTML = "";

  books.forEach((book) => {
    if (book.bookStatus == false) {
      let el = `
            <article class="book_item">
               <h3>${book.title}</h3>
               <p>Penulis : ${book.author}</p>
               <p>Tahun Terbit : ${book.year}</p>

               <div class="action">
                  <button class="btn-green" onclick="changeBookStatus(${book.id})"><i class="fa-solid fa-circle-check"></i></button>
                  <button class="btn-red" onclick="removeBook(${book.id})"><i class="fa-solid fa-trash"></i></button>
                  <button class="btn-orange" onclick="editBook(${book.id})"><i class="fa-solid fa-pen-to-square"></i></button>
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
                  <button class="btn-green" onclick="changeBookStatus(${book.id})"><i class="fa-solid fa-rotate-left"></i></button>
                  <button class="btn-red" onclick="removeBook(${book.id})"><i class="fa-solid fa-trash"></i></button>
                  <button class="btn-orange" onclick="editBook(${book.id})"><i class="fa-solid fa-pen-to-square"></i></button>
                  </div>
            </article>
            `;

      completeBookShelf.innerHTML += el;
    }
  });
}

// content loaded & submit form
document.addEventListener("DOMContentLoaded", function () {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    addBook();

    form.reset();
  });

  if (checkWebStorage()) {
    loadDataFromStorage();
  }
});

// render event addeventlistener
document.addEventListener(RENDER_BOOK, () => {
  const btnResetRack = document.getElementById("resetRack");
  if (books.length <= 0) {
    btnResetRack.style.display = "none";
  } else {
    btnResetRack.style.display = "block";
  }

  showBook(books);
});
