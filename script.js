const addBook = document.querySelector("#addBook");
const bookName = document.querySelector('#name');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
const bookContainer = document.querySelector('#bookContainer');

let books = [];

function Book(name="Book Name", author="Author", pages="Pages"){
  this.name = name;
  this.author = author;
  this.pages = pages;
}

addBook.addEventListener('click', function(){
  let bookNm = bookName.value;
  let bookAth = bookAuthor.value;
  let bookPg = bookPages.value;
  let book = new Book(bookNm, bookAth, bookPg);
  addBookToLibrary(book);
})

function addBookToLibrary(literature){
  books.push(literature);
  let newBook = document.createElement('div');
  for(let key in literature){
    const attribute = document.createElement('p');
    attribute.textContent = literature[key];
    newBook.appendChild(attribute);
  }
  let readBtn = document.createElement('button');
  readBtn.textContent = 'Read';
  readBtn.className = 'read-button';
  readBtn.addEventListener('click', function(){
  if(readBtn.classList.contains('unread-button')){
    readBtn.classList.remove('unread-button');
    newBook.classList.remove('unread-book');
  }
  else{
    readBtn.classList.add('unread-button');
    newBook.classList.add('unread-book');
  }
  })
  newBook.appendChild(readBtn);
  let deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-button';
  newBook.appendChild(deleteBtn);
  newBook.className = 'book';
  deleteBtn.addEventListener('click', function(){
    bookContainer.removeChild(newBook);
  })
  bookContainer.appendChild(newBook);
}
