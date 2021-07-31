// {
//   'use strict';

//   const select = {
//     templatesOf: {
//       book: '#template-book',
//     },
//     listOf: {
//       books: '.books-panel .books-list',
//     }
//   };
//   const classNames = {
//     book: {
//       favoriteImage: 'favorite',
//     },
//   };

//   const templates = {
//     bookLink: Handlebars.compile(document.querySelector(select.templatesOf.book).innerHTML),
//   };


//   const render = function () {

//     for (let book in dataSource.books) {
//       const generatedHTML = templates.bookLink(dataSource.books[book]);
//       //console.log(`generatedHTML:`, generatedHTML);
//       book = utils.createDOMFromHTML(generatedHTML);
//       console.log(`bookHTML:`, book);
//       const booksList = document.querySelector(select.listOf.books);

//       booksList.appendChild(book);
//     }

//   };

//   render();

//   const favouriteBooks = [];
//   const initActions = function () {
//     const bookImages = document.querySelectorAll('.books-list  .book__image');
//     console.log(bookImages);
//     for (let bookImage of bookImages) {
//       console.log(bookImage);
//       bookImage.addEventListener('dblclick', function (event) {
//         event.preventDefault();

//         const bookId = bookImage.getAttribute('data-id');
//         console.log(bookId);

//         if (!bookImage.classList.contains(classNames.book.favoriteImage)) {
//           bookImage.classList.add(classNames.book.favoriteImage);
//           favouriteBooks.push(bookImage);
//         } else if (bookImage.classList.contains(classNames.book.favoriteImage)) {
//           bookImage.classList.remove(classNames.book.favoriteImage);
//           favouriteBooks.splice(favouriteBooks.indexOf(bookImage), 1);
//         }
//         console.log(favouriteBooks);
//       });
//     }
//   };


//   initActions();


// }

