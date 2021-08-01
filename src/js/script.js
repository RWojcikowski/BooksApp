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


  const render = function () {



    for (let book in dataSource.books) {

      const ratingBgc = determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;
      // console.log(ratingWidth);

      const booksData = {
        id: book.id,
        name: book.name,
        price: book.price,
        rating: book.rating,
        image: book.image,
        details: book.details,
        ratingWidth: ratingWidth,
        ratingBgc: ratingBgc,
      };

      const generatedHTML = templates.bookLink(dataSource.books[book]);
      //console.log(`generatedHTML:`, generatedHTML);
      book = utils.createDOMFromHTML(generatedHTML);
      // console.log(`bookHTML:`, book);
      const booksList = document.querySelector(select.listOf.books);

      booksList.appendChild(book);




    }

  };

  render();

  const favouriteBooks = [];
  const filters = [];
  const initActions = function () {
    const bookImages = document.querySelectorAll('.books-list  .book__image');
    console.log(bookImages);
    for (let bookImage of bookImages) {
      console.log(bookImage);
      bookImage.addEventListener('dblclick', function (event) {
        event.preventDefault();



        if (!bookImage.classList.contains(classNames.book.favoriteImage)) {
          bookImage.classList.add(classNames.book.favoriteImage);
          favouriteBooks.push(bookImage);
        } else if (bookImage.classList.contains(classNames.book.favoriteImage)) {
          bookImage.classList.remove(classNames.book.favoriteImage);
          favouriteBooks.splice(favouriteBooks.indexOf(bookImage), 1);
        }
        console.log(favouriteBooks);
      });
      const form = document.querySelector(select.form);
      form.addEventListener('click', function (event) {
        //event.preventDefault();
        const checkbox = event.target;
        //console.log(checkbox);
        if (checkbox.tagName === 'INPUT' && checkbox.type === 'checkbox' && checkbox.name === 'filter') {
          // console.log(checkbox.value);
          if (checkbox.checked === true) {
            filters.push(checkbox.value);
          } else if (checkbox.checked === false) {
            filters.splice(filters.indexOf(checkbox.value), 1);
          }
        }
        // console.log(filters);

        filterBooks();
      });
    }
  };



  initActions();
  const filterBooks = function () {

    for (let book of dataSource.books) {

      let shouldBeHidden = false;
      const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
      // console.log(bookImage);

      for (let filter of filters) {
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
  };
  function determineRatingBgc(rating) {

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