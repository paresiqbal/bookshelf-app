// localstorage
const localStorageKey = "bookShelf";
let bookShelf = [];

// check localstorage support
const checkLocalStorage = () => {
  return typeof Storage !== checkValue;
};

if (checkLocalStorage()) {
  if (localStorage.getItem(localStorageKey) === null) {
    bookShelf;
  } else {
    bookShelf = JSON.parse(localStorage.getItem(localStorageKey));
  }
  localStorage.setItem(localStorageKey, JSON.stringify(bookShelf));
}
