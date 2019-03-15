// class Book{
//   constructor(title, author, isbn){
//     this.Author = author;
//     this.Title = title;
//     this.ISBN = isbn;
//   }
// }

const titleInput = document.getElementById('book-title'),
      authorInput = document.getElementById('book-author'),
      isbnInput = document.getElementById('book-isbn'),
      formDiv = document.querySelector('.form'),
      messageEl = document.querySelector('.infoMessage'),
      submitBtn = document.getElementById('submit-btn');
      clearBtn = document.getElementById('clear-btn');

function Book(title, author, isbn){
  this.Author = author,
  this.Title = title,
  this.ISBN = isbn;
}

setup();

function setup(){
  submitBtn.addEventListener('click', onAddBook);
  clearBtn.addEventListener('click', clearStorage);
}

function onAddBook(e){
  
  if (isDataLegit()){
    const book = new Book(titleInput.value, authorInput.value, isbnInput.value);
    console.log(book);
    addBookToStorage(book);
    displayBooks();
    addMessage('good data',false);
  }
  else{
    addMessage('bad data',true);
  }
  //displayBooks();
  setTimeout(clearMessage,3000);

  e.preventDefault();
}

function isDataLegit(){
  if (titleInput.value != '' && authorInput.value != '' && isbnInput.value != ''){
    return true;
  }
  return false;
}

function addMessage(message, isError){
  messageEl.textContent = message;
  if (isError){
    messageEl.style.color = 'red';
  }
  else{
    messageEl.style.color = 'green';
  }
}

function clearMessage(){
  messageEl.textContent = '';
}

function clearStorage(e){
  if (confirm('Are you sure you want to clear all books?') === true){
    localStorage.removeItem('books');
    displayBooks();
  }
  e.preventDefault()
}

function addBookToStorage(book){
  let storage = JSON.parse(localStorage.getItem('books'));
  if (storage === null){
      storage = [];
  }

  storage.push(book);
  //console.log(book);
  localStorage.setItem('books',JSON.stringify(storage));
}

function displayBooks(){
    const books = JSON.parse(localStorage.getItem('books'));
    console.log(books);
//  books.forEach(element => {
//    console.log(element);
//   });
  
}