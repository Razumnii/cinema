function burgerMenu() {
  const menu = document.querySelector('.header');
  const button = menu.querySelector('.burger-menu__button');
  const overlay = menu.querySelector('.burger-menu__overlay');

  button.addEventListener('click', e => {
    e.preventDefault();
    toggleMenu();
  });

  overlay.addEventListener('click', () => toggleMenu());

  function toggleMenu() {
    menu.classList.toggle('burger-menu_active');
    if (menu.classList.contains('burger-menu_active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }
}
burgerMenu();

/**
 * @param {string} message - Just message
 * @param {string} type - info*|success|warning|error
 * @param {string} layout - topRight*|..
 */

function PopNoty({ message = 'Помилка', type = 'info', layout = 'topRight', timeout = 5000 } = {}) {
  new Noty({
    type,
    text: `<span style="font-size: 18px;">${message}</span>`,
    theme: 'sunset',
    timeout,
    progressBar: true,
    closeWith: ['button'],
    layout,
  }).show();
}

moment.updateLocale('en', {
  weekdaysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Су'],
  months: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
});

document.querySelector('#exit')?.addEventListener('click', function () {
  document.cookie = 'token=""; path=/;';
  document.location = '/';
});
