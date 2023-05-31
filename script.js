const addBook = document.querySelector("#enterBook");
const bookName = document.querySelector('#name');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
const bookContainer = document.querySelector('#bookContainer');
const bookIsRead = document.querySelector("#isRead");

let count = 0;

let books = [];

window.onload = function(){
 books = JSON.parse(localStorage.getItem("Books")) || []; 
 renderBooks();
}
class Book{
  constructor(_name, _author, _pages, _isRead){
    this.name = _name;
    this.author = _author;
    this.pages = _pages;
    this.isRead = _isRead; 
  }
}

addBook.addEventListener('submit', function(e){
  e.preventDefault();
  const book = getBookDetails();
  books.push(book);
  localStorage.setItem("Books", JSON.stringify(books));
  renderBooks();
})

function getBookDetails(){
  let bookNm = bookName.value;
  let bookAth = bookAuthor.value;
  let bookPg = bookPages.value;
  let isRead = bookIsRead.checked;
  let book = new Book(bookNm, bookAth, bookPg, isRead);
  return book;
}

function createReadBtn(newBook){
  let readBtn = document.createElement('button');
  readBtn.textContent = 'Read';
  readBtn.classList.add('read-button');
  readBtn.addEventListener('click', () => {
    changeReadStatus(readBtn, newBook)
  })
  return readBtn;
}

function createDeleteBtn(newBook){
  let deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-button';
  deleteBtn.addEventListener('click', function(){
    books.splice(newBook.id, 1)
    localStorage.setItem("Books", JSON.stringify(books));
    bookContainer.removeChild(newBook);
  })
  return deleteBtn;
}

function renderBooks(){
  bookContainer.innerHTML = "";
  books.forEach(book => {
      let newBook = document.createElement('div');
      newBook.setAttribute("id", count);
      count++;
      bookDetails(book, newBook);
      readBtn = createReadBtn(newBook);
      newBook.appendChild(readBtn);
      deleteBtn = createDeleteBtn(newBook);
      newBook.appendChild(deleteBtn);
      newBook.classList.add("book");
      if(!book.isRead){
          newBook.classList.add("unread-book");
          readBtn.classList.add("unread-button");
        }
      bookContainer.append(newBook);      
  })
}

function bookDetails(literature, newBook){
  for(let key in literature){
    if(key !== "isRead"){
    const attribute = document.createElement('p');
    attribute.textContent = literature[key];
    newBook.appendChild(attribute);
    }
  }
}

function changeReadStatus(readBtn, newBook){
  const changedBookId = newBook.id;
  const changedBook = books.splice(changedBookId, 1);
  changedBook[0].isRead = !changedBook[0].isRead;
  books = [...changedBook, ...books];
  localStorage.setItem("Books", JSON.stringify(books));
  if(changedBook[0].isRead){
        readBtn.classList.remove('unread-button');
        newBook.classList.remove('unread-book');
      }
      else{
        readBtn.classList.add('unread-button');
        newBook.classList.add('unread-book');
  }    
}