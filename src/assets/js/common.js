const indexPage = document.querySelector('.index-page');

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

document.querySelector('.submenu').parentElement.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.submenu').classList.toggle('toggle');
});

// Clients slider

{
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