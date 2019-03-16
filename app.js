// class Book{
//   constructor(title, author, isbn){
//     this.Author = author;
//     this.Title = title;
//     this.ISBN = isbn;
//   }
// }

function Book(title, author, isbn) {
  this.Author = author;
  this.Title = title;
  this.ISBN = isbn;
}

function BookStorage() { }

BookStorage.prototype.addBookToStorage = function (book) {
  let storage = JSON.parse(localStorage.getItem('books'));
  if (storage === null) {
    storage = [];
  }

  storage.push(book);
  localStorage.setItem('books', JSON.stringify(storage));
}

BookStorage.prototype.getBooks = function () {
  return JSON.parse(localStorage.getItem('books'));
}

BookStorage.prototype.removeBooks = function () {
  localStorage.removeItem('books');
}

BookStorage.prototype.removeBook = function (isbn) {
  let storage = JSON.parse(localStorage.getItem('books'));

  if (storage != null) {
    for (var i = storage.length - 1; i >= 0; i--) {
      var book = storage[i];
      if (book.ISBN === isbn) {
        var answer = storage.splice(i, 1);
        localStorage.setItem('books', JSON.stringify(storage));
        return (answer.length === 1);
      }
    }
  }
  return false;
}


function UI() {
  this.messageEl = document.getElementById('infoMessage');
  this.titleInput = document.getElementById('book-title');
  this.authorInput = document.getElementById('book-author');
  this.isbnInput = document.getElementById('book-isbn');
  this.bookList = document.getElementById('book-list');
}

UI.prototype.isDataLegit = function () {
  if (this.titleInput.value != '' && this.authorInput.value != '' && this.isbnInput.value != '') {
    return true;
  }
  return false;
}

UI.prototype.clearMessage = function () { //HACK
  var element = document.getElementById('infoMessage');
  element.textContent = '';
  element.className = '';
}

UI.prototype.addMessage = function (message, className) {
  this.messageEl.textContent = message;
  this.messageEl.className = className;
  setTimeout(this.clearMessage, 3000);
}

UI.prototype.clearFields = function () {
  this.titleInput.value = '';
  this.authorInput.value = '';
  this.isbnInput.value = '';
}

UI.prototype.createRow = function (book) {
  var row = document.createElement('tr');
  row.appendChild(this.createCell(book.Title));
  row.appendChild(this.createCell(book.Author));
  row.appendChild(this.createCell(book.ISBN));
  row.appendChild(this.createCell('<a href="#" class=delete>X</a>', true));

  return row;
}

UI.prototype.createCell = function (value, isHtml = false) {
  var cell = document.createElement('td');
  if (isHtml) {
    cell.innerHTML = value;
  }
  else {
    cell.innerText = value;
  }
  return cell;
}

UI.prototype.displayBooks = function (books) {
  this.bookList.cle
  for (var i = 0; i < books.length; i++) {
    var book = books[i];
    var row = this.createRow(book);
    this.bookList.appendChild(row);
  }
}
UI.prototype.displayBook = function (book) {
  this.bookList.appendChild(this.createRow(book));
}

UI.prototype.clearBooks = function () {
  while (this.bookList.firstChild) {
    this.bookList.removeChild(this.bookList.firstChild);
  }
}

UI.prototype.clearBook = function (target) {

  target.remove();
}

const bookTable = document.getElementById('book-list');
const submitBtn = document.getElementById('submit-btn');
const clearBtn = document.getElementById('clear-btn');
const storageObj = new BookStorage();
const ui = new UI();

setup();

function setup() {
  submitBtn.addEventListener('click', onAddBook);
  clearBtn.addEventListener('click', onClearStorage);
  bookTable.addEventListener('mouseup', onDeleteClicked)


  displayBooks();
}

function onAddBook(e) {
  if (ui.isDataLegit()) {
    const book = new Book(ui.titleInput.value, ui.authorInput.value, ui.isbnInput.value);
    storageObj.addBookToStorage(book);
    ui.displayBook(book);
    ui.clearFields();
    ui.addMessage('Book added', 'success');
  }
  else {
    ui.addMessage('Please fill in all fields!', 'error');
  }

  e.preventDefault();
}

function displayBooks() {
  let books = storageObj.getBooks();
  if (books != null) {
    ui.displayBooks(books);
  }
}

function onClearStorage(e) {
  if (confirm('Are you sure you want to clear all books?') === true) {
    storageObj.removeBooks();
    ui.clearBooks();
  }
  e.preventDefault()
}

function onDeleteClicked(e) {
  if (e.target.className === 'delete') {
    try {
      var isbn = e.target.parentElement.parentElement.childNodes[2].innerText;
      if (isbn != '') {
        if (storageObj.removeBook(isbn) === true) {
          ui.clearBook(e.target.parentElement.parentElement);
        }

      }
    } catch (error) {
      console.error(`Error when deleting book: ${error.message}`);
    }
  }
  e.preventDefault();
}
