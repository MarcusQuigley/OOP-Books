class Book {
  constructor(title, author, isbn) {
    this.Author = author;
    this.Title = title;
    this.ISBN = isbn;
  }
}

class BookStorage {

  static addBookToStorage(book) {
    let storage = BookStorage.getBooks();// JSON.parse(localStorage.getItem('books'));
    if (storage === null) {
      storage = [];
    }


    storage.push(book);
    localStorage.setItem('books', JSON.stringify(storage));

  }

  static displayBooks() {
    let books = BookStorage.getBooks();
    if (books != null) {
      let ui = new UI();
      ui.displayBooks(books);
    }
  }

  static getBooks() {
    return JSON.parse(localStorage.getItem('books'));
  }

  static hasBooks() {
    return BookStorage.getBooks() != null;
  }


  static removeBooks() {
    localStorage.removeItem('books');
  }

  static removeBook(isbn) {
    let storage = BookStorage.getBooks();// JSON.parse(localStorage.getItem('books'));

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
}

class UI {
  constructor() {
    this.messageEl = document.getElementById('infoMessage');
    this.titleInput = document.getElementById('book-title');
    this.authorInput = document.getElementById('book-author');
    this.isbnInput = document.getElementById('book-isbn');
    this.bookList = document.getElementById('book-list');
  }

  isDataLegit() {
    if (this.titleInput.value != '' && this.authorInput.value != '' && this.isbnInput.value != '') {
      return true;
    }
    return false;
  }

  clearMessage() {
    var element = document.getElementById('infoMessage');
    element.textContent = '';
    element.className = '';
  }

  addMessage(message, className) {
    this.messageEl.textContent = message;
    this.messageEl.className = className;
    setTimeout(this.clearMessage, 3000);
  }

  clearFields() {
    this.titleInput.value = '';
    this.authorInput.value = '';
    this.isbnInput.value = '';
  }

  createRow(book) {
    var row = document.createElement('tr');
    row.appendChild(this.createCell(book.Title));
    row.appendChild(this.createCell(book.Author));
    row.appendChild(this.createCell(book.ISBN));
    row.appendChild(this.createCell('<a href="#" class=delete>X</a>', true));

    return row;
  }

  createCell(value, isHtml = false) {
    var cell = document.createElement('td');
    if (isHtml) {
      cell.innerHTML = value;
    }
    else {
      cell.innerText = value;
    }
    return cell;
  }

  displayBooks(books) {
    this.bookList.cle
    for (var i = 0; i < books.length; i++) {
      var book = books[i];
      var row = this.createRow(book);
      this.bookList.appendChild(row);
    }
  }
  displayBook(book) {
    this.bookList.appendChild(this.createRow(book));
  }

  clearBooks() {
    while (this.bookList.firstChild) {
      this.bookList.removeChild(this.bookList.firstChild);
    }
  }

  clearBook(target) {
    target.remove();
  }

}

const bookTable = document.getElementById('book-list');
const submitBtn = document.getElementById('submit-btn');
const clearBtn = document.getElementById('clear-btn');
//const storageObj = new BookStorage();
const ui = new UI();

setup();

function setup() {
  submitBtn.addEventListener('click', onAddBook);
  clearBtn.addEventListener('click', onClearStorage);
  bookTable.addEventListener('mouseup', onDeleteClicked)
  document.addEventListener('DOMContentLoaded', BookStorage.displayBooks());

  // displayBooks();
}

function onAddBook(e) {
  if (ui.isDataLegit()) {
    const book = new Book(ui.titleInput.value, ui.authorInput.value, ui.isbnInput.value);
    BookStorage.addBookToStorage(book);
    ui.displayBook(book);
    ui.clearFields();
    ui.addMessage('Book added', 'success');
  }
  else {
    ui.addMessage('Please fill in all fields!', 'error');
  }

  e.preventDefault();
}

// function displayBooks() {
//   let books = BookStorage.getBooks();
//   if (books != null) {
//     ui.displayBooks(books);
//   }
// }

function onClearStorage(e) {
  if (BookStorage.hasBooks) {
    if (confirm('Are you sure you want to clear all books?') === true) {
      BookStorage.removeBooks();
      ui.clearBooks();
    }
  }
  e.preventDefault()
}

function onDeleteClicked(e) {
  if (e.target.className === 'delete') {
    try {
      //var isbn = e.target.parentElement.parentElement.childNodes[2].innerText;
      var isbn = e.target.parentElement.previousElementSibling.textContent;

      if (isbn != '') {
        if (BookStorage.removeBook(isbn) === true) {
          ui.clearBook(e.target.parentElement.parentElement);
        }

      }
    } catch (error) {
      console.error(`Error when deleting book: ${error.message}`);
    }
  }
  e.preventDefault();
}
