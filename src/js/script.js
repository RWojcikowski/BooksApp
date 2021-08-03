{
  'use strict';
  const select = {
    templatesOf: {
      book: '#template-book',
    },
    listOf: {
      books: '.books-panel .books-list',
    },
    bookProperties: {
      book: '.book',
      image: 'book__image',
      id: 'data-id',
      rating: '.book__rating',
    },
    form: '.filters form',
  };

  const classNames = {
    book: {
      favoriteImage: 'favorite',
      hidden: 'hidden',
    },
  };

  const templates = {
    bookLink: Handlebars.compile(document.querySelector(select.templatesOf.book).innerHTML),
  };

  class BooksList {
    constructor(data) {
      const thisBooksList = this;
      thisBooksList.data = data;
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.initActions();
    }

    initData() {
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
      for (let book of thisBooksList.data) {
        /* generate HTML based on template */
        const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;
        const bookData = {
          id: book.id,
          name: book.name,
          price: book.price,
          rating: book.rating,
          image: book.image,
          details: book.details,
          ratingWidth: ratingWidth,
          ratingBgc: ratingBgc,
        };

        const generatedHTML = templates.bookLink(bookData);
        thisBooksList.element = utils.createDOMFromHTML(generatedHTML);
        const booksList = document.querySelector(select.listOf.books);
        booksList.appendChild(thisBooksList.element);
      }
    }
    getElements() {
      const thisBooksList = this;
      thisBooksList.dom = {};
      thisBooksList.dom.booksList = document.querySelector(select.listOf.books);
      thisBooksList.dom.form = document.querySelector(select.form);
    }

    initActions() {
      const thisBooksList = this;
      const filters = [];
      const bookImages = document.querySelectorAll('.books-list  .book__image');
      console.log(bookImages);
      for (let bookImage of bookImages) {
        console.log(bookImage);
        bookImage.addEventListener('dblclick', function (event) {
          event.preventDefault();



          if (!bookImage.classList.contains(classNames.book.favoriteImage)) {
            bookImage.classList.add(classNames.book.favoriteImage);
            thisBooksList.favouriteBooks.push(bookImage);
          } else if (bookImage.classList.contains(classNames.book.favoriteImage)) {
            bookImage.classList.remove(classNames.book.favoriteImage);
            thisBooksList.favouriteBooks.splice(thisBooksList.favouriteBooks.indexOf(bookImage), 1);
          }
          console.log(thisBooksList.favouriteBooks);
        });
        thisBooksList.dom.form.addEventListener('click', function (event) {
          //event.preventDefault();
          const checkbox = event.target;
          if (checkbox.tagName === 'INPUT' && checkbox.type === 'checkbox' && checkbox.name === 'filter') {
            if (checkbox.checked === true) {
              thisBooksList.filters.push(checkbox.value);
            } else if (checkbox.checked === false) {
              thisBooksList.filters.splice(thisBooksList.filters.indexOf(checkbox.value), 1);
            }
          }
          thisBooksList.filterBooks();
        });
      }
    }

    filterBooks() {
      const thisBooksList = this;
      for (let book of thisBooksList.data) {
        let shouldBeHidden = false;
        const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');

        for (let filter of thisBooksList.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }

        if (shouldBeHidden) {
          bookImage.classList.add(classNames.book.hidden);
        } else if (!shouldBeHidden) {
          bookImage.classList.remove(classNames.book.hidden);
        }
      }
    }
    determineRatingBgc(rating) {

      let background = '';

      if (rating < 6) {
        background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return background;
    }
  }


  const app = new BooksList();
}