const indexPage = document.querySelector('.index-page');
const aboutPage = document.querySelector('.about-page');
const portfolioPage = document.querySelector('.portfolioPage');

if (indexPage) {

  // Slider

  {
    const slider = document.querySelector('.header__slider');
    const content = slider.querySelector('.slider__content');
    const border = slider.querySelector('.header__border');

    slider.addEventListener('click', (e) => {
      const showElement = [...content.children].filter(item => item.classList.contains('show'))[0];
      const borderActive = [...border.children].filter(item => item.classList.contains('border-active'))[0];

      if (e.target.classList.contains('slider__arrow') || e.target.nodeName === 'I') {
        if (e.target.classList.contains('angle-left') || e.target.classList.contains('fa-angle-double-left')) {
          if (showElement.previousElementSibling) {
            showElement.classList.remove('show');
            showElement.classList.add('hide');
            borderActive.classList.remove('border-active');
            borderActive.previousElementSibling.classList.add('border-active');
            showElement.previousElementSibling.classList.remove('hide');
            showElement.previousElementSibling.classList.add('show');
          }
        }

        if (e.target.classList.contains('angle-right') || e.target.classList.contains('fa-angle-double-right')) {
          if (showElement.nextElementSibling) {
            showElement.classList.remove('show');
            showElement.classList.add('hide');
            borderActive.classList.remove('border-active');
            borderActive.nextElementSibling.classList.add('border-active');
            showElement.nextElementSibling.classList.remove('hide');
            showElement.nextElementSibling.classList.add('show');
          }
        }
      }
    });
  }

  // Why-slider

  {
    const slider = document.querySelector('.why-slider');
    slider.children[1].classList.add('main');

    const slides = slider.querySelectorAll('.why-img__item');

    for (let item of slides) {
      if (item.src !== 'http://localhost:8085/#') {
        item.style.paddingTop = 0;
      }
    }
  }
}

// Portfolio link

document.querySelector('.submenu').parentElement.addEventListener('click', () => {
  document.querySelector('.submenu').classList.toggle('toggle');
});

// Clients slider
if (indexPage || aboutPage) {
  const slider = document.querySelector('.clients-slider');
  const prev = document.querySelector('.btn-left');
  const next = document.querySelector('.btn-right');
  let direction;

  prev.addEventListener('click', () => {
    slider.style.transform = 'translate(20%)';
    direction = 1;
  });

  next.addEventListener('click', () => {
    slider.style.transform = 'translate(-20%)';
    direction = -1;
  });

  slider.addEventListener('transitionend', () => {
    if (direction === -1) {
      slider.appendChild(slider.firstElementChild);
    } else if (direction === 1) {
      slider.prepend(slider.lastElementChild);
    }

    slider.style.transition = 'none';
    slider.style.transform = 'translate(0)';
    setTimeout(() => {
      slider.style.transition = 'all ease 1s';
    });
  });
}

// if (portfolioPage) {

// Portfolio pages

const postBlock = document.querySelector('.portfolio-post-block');
const portfolioPages = document.querySelector('.portfolio-pages');
// const portfolioPagesItem = document.querySelectorAll('.portfolio-pages__item');
// let count = 0;
let currentPage = 1;
let rows = 4;
let posts = [];

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < 12; i++) {
      const post = document.createElement('div');
      post.classList.add('portfolio-post');
      post.innerHTML = `
          <div class="portfolio-img">
            <div class="withoutImg"><i class="far fa-image"></i></div>
            </div >
          <div class="portfolio-post-main">
            <h3 class="portfolio-post__item portfolio-post__header">${data[i].title}.</h3>
            <p class="portfolio-post__item portfolio-post__descr">${data[i].body}.</p>
            <div class="portfolio-post-footer">
              <div class="portfolio-post-address">
                <a class="portfolio-post__link" target="_blank">www.project.dom
                    <div class="chain-bg"><i class="fas fa-link"></i></div>
                </a>
              </div>
              <button class="btn portfolio-post-btn">View&nbsp;details</button>
            </div>
          </div>
        `;
      posts.push(post);
    }

    let displayList = (items, wrapper, rowsPerPage, page) => {
      wrapper.innerHTML = '';
      page--;

      let start = rowsPerPage * page;
      let end = start + rowsPerPage;
      let paginatedItems = items.slice(start, end);

      for (let i = 0; i < paginatedItems.length; i++) {
        postBlock.appendChild(paginatedItems[i]);
      }
    };

    let paginationBtn = page => {
      let button = document.createElement('button');
      button.textContent = page;
      button.classList.add('portfolio-pages__item');

      if (currentPage === page) {
        button.style.backgroundColor = '#639792';
      }
    };

    let setupPagination = (items, wrapper, rowsPerPage) => {
      wrapper.innerHTML = '';

      let pageCount = Math.ceil(items.length / rowsPerPage);

      for (let i = 1; i < pageCount + 1; i++) {
        let btn = paginationBtn(i);
        wrapper.appendChild(btn);
      }
    };

    displayList(posts, postBlock, rows, currentPage);
    setupPagination(posts, portfolioPages, rows);
  })
  .catch((err) => {
    postBlock.innerHTML = '<h2 class="wrong">Something went wrong!</h2>';
    console.log(err);
  });


// portfolioPagesItem[0].style.backgroundColor = '#639792';

// portfolioPostPages.addEventListener('click', (e) => {
//   if (e.target.className === 'prev-btn' || e.target.className === 'fas fa-angle-left') {
//     if (count === 0) {
//       return;
//     }
//     portfolioPagesItem[count].style.backgroundColor = '';
//     count--;
//     portfolioPagesItem[count].style.backgroundColor = '#639792';
//   }

//   if (e.target.className === 'next-btn' || e.target.className === 'fas fa-angle-right') {
//     if (count === portfolioPagesItem.length - 1) {
//       return;
//     }
//     portfolioPagesItem[count].style.backgroundColor = '';
//     count++;
//     portfolioPagesItem[count].style.backgroundColor = '#639792';
//   }
// });



