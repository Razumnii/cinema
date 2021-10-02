// Меню бургера
// const iconMenu = document.querySelector('.burger__menu');
// if (burger__menu) {
// 	const menuBody = document.querySelector('.menu__body');
// 	iconMenu.addEventListener('click', function (e) {
// 		iconMenu.classList.toggle('_active');
// 		menuBody.classList.toggle('_active');
// 	});
// }

const owlCarousel = document.querySelector('.owl-carousel');

getFilmList();
async function getFilmList() {
  try {
    const res = await fetch('/api/film', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await res.json();

    const { message } = json;

    if (res.status > 399) {
      return PopNoty({ type: 'alert', message });
    }

    if (message) {
      PopNoty({ type: 'alert', message });
    }

    initTable(json);
  } catch (e) {
    return PopNoty({ type: 'error', message: e.message });
  }
}

function initTable(filmArr) {
  filmArr.forEach((obj, index) => {
    const { id, name, date, attachment } = obj;

    const item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `
      <a href="/film/${id}" class="movie__gride" >
        <div class="sweep-to-bottom" style="background-image:url(/public/img/${
          attachment || 'notfound.png'
        })" title="${name}">
        </div>
        <div class="text__film">
          <div class="movie__text">
            ${name}
          </div>
          <div class="mid-2 agile_mid_2_home">
            <p>${moment(date).format('YYYY')}</p>
          </div>
        </div>
        <div class="top__new">
          <p>NEW</p>
        </div>
      </a>
    `;
    owlCarousel.insertAdjacentElement('beforeend', item);
  });

  owlCarouselInit();
}

function owlCarouselInit() {
  $('.owl-carousel').owlCarousel({
    dots: false,
    smartSpeed: 1200,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    loop: true,
    margin: 20,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  });
}
