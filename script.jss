
const bookForm = document.getElementById("book-form");
const titleInput = document.getElementById("book-title");
const authorInput = document.getElementById("book-author");
const bookList = document.getElementById("book-list");
const emptyMessage = document.getElementById("empty-message");
const bookCount = document.getElementById("book-count");

let books = [];

function updateBookList() {
  bookList.innerHTML = "";

  emptyMessage.hidden = books.length > 0;

  books.forEach((book) => {
    const item = document.createElement("li");

    const title = document.createElement("span");
    title.className = "book-title";
    title.textContent = book.title;

    if (book.isRead) {
      title.classList.add("read");
    }

    const author = document.createElement("p");
    author.className = "book-author";
    author.textContent = `Author: ${book.author}`;

    const statusButton = document.createElement("button");
    statusButton.className = "status-btn";
    statusButton.textContent = book.isRead
      ? "Mark as Unread"
      : "Mark as Read";

    statusButton.addEventListener("click", () => {
      book.isRead = !book.isRead;
      updateBookList();
    });

    const removeButton = document.createElement("button");
    removeButton.className = "remove-btn";
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", () => {
      books = books.filter((currentBook) => currentBook.id !== book.id);
      updateBookList();
    });

    item.append(title, author, statusButton, removeButton);
    bookList.appendChild(item);
  });

  bookCount.textContent = `Total books: ${books.length}`;
}

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (!title || !author) {
    return;
  }

  books.push({
    id: Date.now(),
    title,
    author,
    isRead: false
  });

  bookForm.reset();
  updateBookList();
});

updateBookList();