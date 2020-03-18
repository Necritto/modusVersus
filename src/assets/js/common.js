const indexPage = document.querySelector('.index-page');
const aboutPage = document.querySelector('.about-page');
const portfolioPage = document.querySelector('.portfolioPage');
const singlePage = document.querySelector('.singlePortfolioPage');
const blogPage = document.querySelector('.blog-page');
const singleBlogPage = document.querySelector('.singleBlogPage');

if (indexPage || singlePage || blogPage || singleBlogPage) {

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

}

if (indexPage) {

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
if (indexPage || aboutPage || singlePage) {
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

if (portfolioPage) {

  // Portfolio pages

  const postBlock = document.querySelector('.portfolio-post-block');
  const portfolioPages = document.querySelector('.portfolio-pages');
  let currentPage = 1;
  let rows;
  const posts = [];
  const btns = [];
  const filterClasses = ['webDesign', 'logoDesign', 'photography', 'wordpress'];
  let isLoad = false;
  const portfolioPage1col = document.querySelector('.portfolio1-page');
  const portfolioPage2col = document.querySelector('.portfolio2-page');
  const portfolioPage3col = document.querySelector('.portfolio3-page');

  const loader = () => {
    postBlock.innerHTML = `
      <div class="loader-position">
        <div class="loader-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    `;
  };

  if (!isLoad) {
    loader();
  }

  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        const post = document.createElement('div');
        post.classList.add('portfolio-post', `${filterClasses[Math.floor(Math.random() * 4)]}`);

        if (portfolioPage1col) {
          rows = 4;
          post.innerHTML = `
            <div class="portfolio-img">
              <div class="withoutImg"><i class="far fa-image"></i></div>
            </div >
            <div class="portfolio-post-main">
              <h3 class="portfolio-post__item portfolio-post__header">${data[i].title}.</h3>
              <p class="portfolio-post__item portfolio-post__descr">${data[i].body}.</p>
              <div class="portfolio-post-footer">
                <div class="portfolio-post-address">
                  <a class="portfolio-post__link" target="_blank" href="www.project.dom">www.project.dom
                    <div class="chain-bg"><i class="fas fa-link"></i></div>
                  </a>
                </div>
                <a target="_blank" href="../singlePortfolio.html" class="btn portfolio-post-btn">View&nbsp;details</a>
              </div>
            </div>
          `;
          posts.push(post);
        }

        if (portfolioPage2col || portfolioPage3col) {
          if (portfolioPage2col) {
            postBlock.classList.add('portfolio2col-wrapper');
            rows = 8;
          }

          if (portfolioPage3col) {
            postBlock.classList.add('portfolio3col-wrapper');
            rows = 12;
          }

          post.innerHTML = `
            <div class="portfolio-post__front">
              <div class="portfolio-img">
                <div class="withoutImg">
                  <i class="far fa-image"></i>
                </div>
              </div>
            </div>
            <div class="portfolio-post__back">
              <div class="portfolio-post__back-refs">
                <a class="portfolio-post__link" target="_blank" href="../singlePortfolio.html">
                  <div class="chain-bg"><i class="far fa-eye"></i></div>
                </a>
                <a class="portfolio-post__link" target="_blank" href="www.project.dom">
                  <div class="chain-bg"><i class="fas fa-link"></i></div>
                </a>
              </div>
              <p class="portfolio-post__back-descr">Lorem ipsum</p>
            </div>
          `;
          posts.push(post);
        }
      }

      return posts;
    })
    .then(posts => {
      let pageCount = Math.ceil(posts.length / rows);
      let filterClass = '';
      let filtredPosts = [];
      const portfolioBtns = document.querySelector('.portfolio-btns');
      portfolioBtns.children[0].classList.add('activeBtn');

      isLoad = true;

      const filteringPosts = posts => {

        filtredPosts = posts.filter(cls => cls.classList.contains(`${filterClass}`));

        if (!filterClass || filterClass === 'all') {
          filtredPosts = posts;
          return filtredPosts;
        }

        return filtredPosts;
      };

      const displayList = (items, wrapper, rowsPerPage, page) => {
        wrapper.innerHTML = '';
        page--;

        const start = rowsPerPage * page;
        const end = start + rowsPerPage;
        const paginatedItems = items.slice(start, end);

        for (let i = 0; i < paginatedItems.length; i++) {
          postBlock.appendChild(paginatedItems[i]);
        }
      };

      const setupPagination = (items, wrapper) => {
        wrapper.innerHTML = '';

        const from = 5; // design layout 
        const to = pageCount - 3; // design layout 
        const maxQuantityNavBtns = 9; // design layout 
        let countHideBtn = 0;
        const portfolioPostPages = document.querySelector('.portfolio-post-pages');
        let isClicked = false;
        let reverse = false;

        for (let i = 1; i < pageCount + 1; i++) {
          let button = document.createElement('button');
          button.textContent = i;
          button.classList.add('portfolio-pages__item');
          btns.push(button);

          if (currentPage === i) {
            button.classList.add('activeBtn');
          }

          if (i > from && i <= to) {
            button.classList.add('hide');
          }

          button.addEventListener('click', () => {
            currentPage = i;
            isClicked = true;
            reverse = false;

            if (i >= to) {
              reverse = true;
            }

            displayList(items, postBlock, rows, currentPage);

            btns.forEach(item => item.classList.remove('activeBtn'));
            btns[currentPage - 1].classList.add('activeBtn');
          });

          wrapper.appendChild(button);
        }

        btns.length > maxQuantityNavBtns
          ? (btns[btns.length - 3].insertAdjacentHTML('beforebegin',
            '<button class="portfolio-pages__item dotBtn"><i class="fas fa-ellipsis-h"></i></button>'
          ))
          : null;

        portfolioPostPages.addEventListener('click', (e) => {
          if (e.target === portfolioPostPages.firstElementChild
            || e.target === portfolioPostPages.firstElementChild.children[0]) {
            e.stopImmediatePropagation();

            if (currentPage !== 1) {

              currentPage--;

              btns.forEach(item => item.classList.remove('activeBtn'));
              btns[currentPage - 1].classList.add('activeBtn');

              if (btns.length > maxQuantityNavBtns) {
                countHideBtn--;

                if (!isClicked && currentPage < to && currentPage >= from) {
                  btns[currentPage - from].classList.remove('hide');
                  btns[currentPage].classList.add('hide');
                }

                if (currentPage === to - 1) {
                  document.querySelector('.dotBtn').classList.remove('hide');
                  btns[currentPage].classList.add('hide');
                }

                if (currentPage < from) {
                  countHideBtn = 0;
                  reverse = false;
                }

                if (isClicked && btns[currentPage].classList.contains(!'hide')) {
                  btns.forEach(item => item.classList.remove('activeBtn'));
                  btns[currentPage - 1].classList.add('activeBtn');
                }

                if (isClicked && btns[currentPage - 1].classList.contains('hide') && !reverse) {
                  btns[currentPage + from - 1].classList.add('hide');
                  btns[currentPage - 1].classList.remove('hide');
                }

                if (reverse && btns[currentPage - 1].classList.contains('hide')) {
                  btns[currentPage].classList.add('hide');
                  btns[currentPage - 1].classList.remove('hide');
                }
              }
              displayList(items, postBlock, rows, currentPage);
            }
          }

          if (e.target === portfolioPostPages.lastElementChild
            || e.target === portfolioPostPages.lastElementChild.children[0]) {
            e.stopImmediatePropagation();

            if (currentPage !== pageCount) {
              currentPage++;

              btns.forEach(item => item.classList.remove('activeBtn'));
              btns[currentPage - 1].classList.add('activeBtn');

              if (btns.length > maxQuantityNavBtns) {
                if (!isClicked && currentPage > from && currentPage < to) {
                  btns[currentPage - (currentPage - countHideBtn++)].classList.add('hide');
                  btns[currentPage - 1].classList.remove('hide');
                }

                if (currentPage === to - 1) {
                  document.querySelector('.dotBtn').classList.add('hide');
                  btns[currentPage].classList.remove('hide');
                }

                if (isClicked && btns[currentPage].classList.contains(!'hide')) {
                  btns.forEach(item => item.classList.remove('activeBtn'));
                  btns[currentPage - 1].classList.add('activeBtn');
                }

                if (isClicked && btns[currentPage - 1].classList.contains('hide')) {
                  btns[currentPage - (currentPage - countHideBtn++)].classList.add('hide');
                  btns[currentPage - 1].classList.remove('hide');
                }
              }
              displayList(items, postBlock, rows, currentPage);
            }
          }
        });
      };

      if (!filtredPosts.length) {
        setupPagination(posts, portfolioPages, rows);
        displayList(posts, postBlock, rows, currentPage);
      }

      portfolioBtns.addEventListener('click', e => {
        if (e.target.classList.contains('portfolio-btn__item')) {
          [...portfolioBtns.children].forEach(item => item.classList.remove('activeBtn'));
          e.target.classList.add('activeBtn');
          filterClass = e.target.classList[1];
          filteringPosts(posts);
          btns.length = 0;
          currentPage = 1;
          pageCount = Math.ceil(filtredPosts.length / rows);
          setupPagination(filtredPosts, portfolioPages, rows);
          displayList(filtredPosts, postBlock, rows, currentPage);
        }
      });
    })
    .catch((err) => {
      postBlock.innerHTML = '<h2 class="wrong">Something went wrong!</h2>';
      console.log(err);
    });
}

if (blogPage) {

  // Controls

  const togglePlay = (playBtn, mediaElem) => {
    (playBtn.classList.contains('paused')) ? mediaElem.play() : mediaElem.pause();
  };

  const playMedia = (playBtn) => {
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    playBtn.classList.toggle('paused');
  };

  const pauseMedia = (playBtn) => {
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    playBtn.classList.toggle('paused');
  };

  const endedMedia = (playBtn, mediaElem) => {
    mediaElem.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  };

  const timeupdateMedia = (mediaElem, progressElem, currentTimestamp) => {
    let duration = mediaElem.duration;
    let currentTime = mediaElem.currentTime;

    progressElem.value = currentTime / duration * 100;

    currentTimestamp.textContent = formatTime(currentTime);
  };

  const progressMedia = (event, progressElem, mediaElem) => {
    let progressWidth = progressElem.offsetWidth;
    let currentWidth = event.offsetX;

    progressElem.value = currentWidth / progressWidth * 100;
    mediaElem.pause();
    mediaElem.currentTime = mediaElem.duration * (currentWidth / progressWidth);
    mediaElem.play();
  };

  const timestampMedia = (entireDuration, currentTimestamp, mediaElem) => {
    entireDuration.innerHTML = formatTime(mediaElem.duration);
    currentTimestamp.innerHTML = formatTime(0);
  };

  // Video player

  const videoPlayBtn = blogPage.querySelector('.video .togglePlay');
  const video = blogPage.querySelector('#video-player');
  const videoProgress = blogPage.querySelector('.video progress');
  const expand = blogPage.querySelector('.expand');
  const videoCurrentTimestamp = blogPage.querySelector('.video .currentTimestamp');
  const videoEntireDuration = blogPage.querySelector('.video .entireDuration');

  document.addEventListener('DOMContentLoaded', () => {
    timestampMedia(videoEntireDuration, videoCurrentTimestamp, video);
  });

  videoPlayBtn.addEventListener('click', () => togglePlay(videoPlayBtn, video));
  video.addEventListener('click', () => togglePlay(videoPlayBtn, video));
  video.addEventListener('dblclick', () => fullscreen(video));
  video.addEventListener('ended', () => endedMedia(videoPlayBtn, video));
  video.addEventListener('play', () => playMedia(videoPlayBtn));
  video.addEventListener('pause', () => pauseMedia(videoPlayBtn));
  video.addEventListener('timeupdate', () => timeupdateMedia(video, videoProgress, videoCurrentTimestamp));
  videoProgress.addEventListener('click', (e) => progressMedia(e, videoProgress, video));
  expand.addEventListener('click', () => fullscreen(video));

  // Audio player

  const audioPlayBtn = blogPage.querySelector('.audio .togglePlay');
  const audio = blogPage.querySelector('#audio-player');
  const audioProgress = blogPage.querySelector('.audio progress');
  const volume = blogPage.querySelector('.volume');
  const audioCurrentTimestamp = blogPage.querySelector('.audio .currentTimestamp');
  const audioEntireDuration = blogPage.querySelector('.audio .entireDuration');

  document.addEventListener('DOMContentLoaded', () => {
    timestampMedia(audioEntireDuration, audioCurrentTimestamp, audio);
  });

  audioPlayBtn.addEventListener('click', () => togglePlay(audioPlayBtn, audio));
  audio.addEventListener('click', () => togglePlay(audioPlayBtn, audio));
  audio.addEventListener('ended', () => endedMedia(audioPlayBtn, audio));
  audio.addEventListener('play', () => playMedia(audioPlayBtn));
  audio.addEventListener('pause', () => pauseMedia(audioPlayBtn));
  audio.addEventListener('timeupdate', () => timeupdateMedia(audio, audioProgress, audioCurrentTimestamp));
  audioProgress.addEventListener('click', (e) => progressMedia(e, audioProgress, audio));
  volume.addEventListener('click', () => {
    if (volume.classList.contains('muted')) {
      audio.volume = 0;
      volume.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
      audio.volume = 1;
      volume.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
    volume.classList.toggle('muted');
  });
}

if (singleBlogPage) {
  let comments = [];
  loadComments(comments);

  const sendBtn = document.querySelector('button[type="submit"]');

  sendBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const commentName = document.querySelector('#comment-name');
    const commentBody = document.querySelector('.comment-form textarea');

    let comment = {
      name: commentName.value,
      body: commentBody.value,
      time: Math.floor(Date.now() / 1000)
    };

    commentName.value = '';
    commentBody.value = '';

    comments.push(comment);

    saveComments(comments);
    showComments(comments);
  });
}

function saveComments(items) {
  localStorage.setItem('comments', JSON.stringify(items));
}

function loadComments(items) {
  if (localStorage.getItem('comments')) {
    items = JSON.parse(localStorage.getItem('comments'));
  }

  showComments(items);
}

function showComments(items) {
  const commentField = document.querySelector('#comment-field');
  let out = '';

  items.forEach(item => {
    out += `
      <div class="comment-body">
        <div class="comment__avatar">
          <i class="fas fa-user"></i>
        </div>
        <div class="comment__item">
          <h3>${item.name} <span>${timeConverter(item.time)}</span></h3>
          <div class="comment-wrap">
            <p>${item.body}</p>
          </div>
        </div>
      </div>
    `;
  });

  commentField.innerHTML = out;
}

function timeConverter(timestamp) {
  let time = new Date(timestamp * 1000);
  let months = [
    'January', 'February', 'March',
    'April', 'May', 'June',
    'July', 'August', 'September',
    'October', 'November', 'December'
  ];
  let year = time.getFullYear();
  let month = months[time.getMonth()];
  let date = time.getDate();
  let hour = time.getHours();
  let min = time.getMinutes();

  return `${date} ${month} ${year},${hour}:${min}`;
}

function fullscreen(elem) {
  if (!document.fullscreenElement) {
    elem.requestFullscreen()
      .catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
  } else {
    document.exitFullscreen();
  }
}

function formatTime(time) {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);

  return `${min.lead0(2)}:${sec.lead0(2)}`;
}

Number.prototype.lead0 = function (n) {
  let nz = '' + this;
  while (nz.length < n) {
    nz = '0' + nz;
  }
  return nz;
};
