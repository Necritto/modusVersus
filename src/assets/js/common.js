// Portfolio link
document.querySelector('.submenu').parentElement.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.submenu').classList.toggle('toggle');
});

// Slider

{
  const slider = document.querySelector('.header__slider');
  const content = slider.querySelector('.slider__content');
  const border = slider.querySelector('.header__border');

  slider.addEventListener('click', (e) => {
    let showElement = [...content.children].filter(item => item.classList.contains('show'))[0];
    let borderActive = [...border.children].filter(item => item.classList.contains('border-active'))[0];

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


// Clients slider

{
  let slides = document.querySelectorAll('.slide');
  let slidesImg = document.querySelectorAll('.slide-single');
  let slidesSrc = [];
  const btnLeft = document.querySelector('.btn-left');
  const btnRight = document.querySelector('.btn-right');
  const callCount = slides.length;

  for (let i = 0; i < slidesImg.length; i++) {
    slidesSrc[i] = slidesImg[i].src;
    slides[i].remove();
  }

  let step = 0;
  let offset = 0;

  function draw() {
    let img = document.createElement('img');
    let div = document.createElement('div');
    img.src = slidesSrc[step];
    div.classList.add('slide');
    div.appendChild(img);
    div.style.left = offset * 190 + 'px';
    document.querySelector('.clients-slider').appendChild(div);

    (step + 1 === slidesSrc.length) ? step = 0 : step++;
    (offset + 1 === slidesSrc.length) ? offset = 0 : offset++;
  }

  function toLeft() { // need to fix
    btnLeft.onclick = null;

    let slidesVisible = document.querySelectorAll('.slide');
    let offsetLeft = 0;

    for (let i = 0; i < slidesVisible.length; i++) {
      slidesVisible[i].style.left = offsetLeft * 190 - 190 + 'px';
      slidesVisible[0].style.left = (slidesVisible.length - 1) * 190 + 'px';
      offsetLeft++;
    }

    setTimeout(() => {
      slidesVisible[0].remove();
      draw();
      btnLeft.onclick = toLeft;
    }, 1000);
  }

  function toRight() {  // need to fix
    btnRight.onclick = null;

    let slidesVisible = document.querySelectorAll('.slide');
    let offsetRight = 0;

    for (let i = slidesVisible.length; i !== 0; i--) {
      slidesVisible[offsetRight].style.left = offsetRight * 190 + 190 + 'px';
      offsetRight++;
    }

    setTimeout(() => {
      slidesVisible[0].remove();
      draw();
      btnRight.onclick = toRight;
    }, 1000);
  }

  for (let i = 0; i < callCount; i++) {
    draw();
  }

  btnLeft.onclick = toLeft;
  btnRight.onclick = toRight;
}