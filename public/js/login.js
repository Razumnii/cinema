document.querySelector('[name=email]').addEventListener('focus', function () {
  this.setAttribute('placeholder', 'test@example.com');
});

document.querySelector('[name=email]').addEventListener('blur', function () {
  this.removeAttribute('placeholder');
});

document.querySelector('[type=submit]').addEventListener('click', function (e) {
  // e.preventDefault();
});
